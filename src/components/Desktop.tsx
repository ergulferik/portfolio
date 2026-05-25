import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { WindowDefinition, WindowId } from '../types';
import DesktopIcon from './DesktopIcon';
import ContextMenu, { type ContextMenuItem } from './ContextMenu';
import { useLang } from '../i18n/LanguageContext';

interface Props {
  defs: WindowDefinition[];
  onLaunch: (id: WindowId) => void;
  onDesktopClick: () => void;
  children: ReactNode;
}

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MenuState {
  x: number;
  y: number;
  items: ContextMenuItem[];
}

const ICON_W = 76;
const ICON_H = 86;
const ICON_GAP_X = 12;
const ICON_GAP_Y = 4;
const COL_STRIDE = ICON_W + ICON_GAP_X;
const ROW_STRIDE = ICON_H + ICON_GAP_Y;
const ROWS_PER_COL = 7;
const ORIGIN_X = 12;
const ORIGIN_Y = 12;

/* Bumped from v1 → v2 when the Photos icon was removed, so users with a
   saved layout that includes the now-gone icon don't see a blank row. */
const POSITIONS_STORAGE_KEY = 'ferik-portfolio-icon-positions-v2';
const SNAP_STORAGE_KEY = 'ferik-portfolio-snap-to-grid';

interface Pos {
  x: number;
  y: number;
}

function defaultPositions(defs: WindowDefinition[]): Record<string, Pos> {
  const out: Record<string, Pos> = {};
  defs.forEach((d, idx) => {
    const col = Math.floor(idx / ROWS_PER_COL);
    const row = idx % ROWS_PER_COL;
    out[d.id] = {
      x: ORIGIN_X + col * COL_STRIDE,
      y: ORIGIN_Y + row * ROW_STRIDE,
    };
  });
  return out;
}

function snapPos(p: Pos): Pos {
  const col = Math.max(0, Math.round((p.x - ORIGIN_X) / COL_STRIDE));
  const row = Math.max(0, Math.round((p.y - ORIGIN_Y) / ROW_STRIDE));
  return {
    x: ORIGIN_X + col * COL_STRIDE,
    y: ORIGIN_Y + row * ROW_STRIDE,
  };
}

/** Find a free grid cell starting from `target`, spiraling outward. */
function findFreeCell(
  target: Pos,
  taken: Set<string>,
): Pos {
  const baseCol = Math.round((target.x - ORIGIN_X) / COL_STRIDE);
  const baseRow = Math.round((target.y - ORIGIN_Y) / ROW_STRIDE);
  const cellKey = (c: number, r: number) => `${c},${r}`;
  if (!taken.has(cellKey(baseCol, baseRow))) {
    return {
      x: ORIGIN_X + baseCol * COL_STRIDE,
      y: ORIGIN_Y + baseRow * ROW_STRIDE,
    };
  }
  // Spiral outward up to a generous radius
  for (let radius = 1; radius < 20; radius++) {
    for (let dr = -radius; dr <= radius; dr++) {
      for (let dc = -radius; dc <= radius; dc++) {
        if (Math.max(Math.abs(dr), Math.abs(dc)) !== radius) continue;
        const c = baseCol + dc;
        const r = baseRow + dr;
        if (c < 0 || r < 0) continue;
        if (!taken.has(cellKey(c, r))) {
          return {
            x: ORIGIN_X + c * COL_STRIDE,
            y: ORIGIN_Y + r * ROW_STRIDE,
          };
        }
      }
    }
  }
  return {
    x: ORIGIN_X + baseCol * COL_STRIDE,
    y: ORIGIN_Y + baseRow * ROW_STRIDE,
  };
}

function loadPositions(defs: WindowDefinition[]): Record<string, Pos> {
  const defaults = defaultPositions(defs);
  if (typeof window === 'undefined') return defaults;
  try {
    const raw = window.localStorage.getItem(POSITIONS_STORAGE_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw) as Record<string, Pos>;
    return { ...defaults, ...parsed };
  } catch {
    return defaults;
  }
}

function loadSnap(): boolean {
  if (typeof window === 'undefined') return true;
  const raw = window.localStorage.getItem(SNAP_STORAGE_KEY);
  if (raw === null) return true;
  return raw === '1';
}

function rectsIntersect(a: Rect, b: DOMRect) {
  return (
    a.x < b.right &&
    a.x + a.w > b.left &&
    a.y < b.bottom &&
    a.y + a.h > b.top
  );
}

export default function Desktop({
  defs,
  onLaunch,
  onDesktopClick,
  children,
}: Props) {
  const { t } = useLang();
  const desktopDefs = useMemo(
    () => defs.filter((d) => d.onDesktop),
    [defs],
  );

  const rootRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);

  const [positions, setPositions] = useState<Record<string, Pos>>(() =>
    loadPositions(desktopDefs),
  );
  const [snapToGrid, setSnapToGrid] = useState<boolean>(() => loadSnap());
  const [selection, setSelection] = useState<Rect | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [menu, setMenu] = useState<MenuState | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        POSITIONS_STORAGE_KEY,
        JSON.stringify(positions),
      );
    } catch {
      // ignore quota errors
    }
  }, [positions]);

  useEffect(() => {
    window.localStorage.setItem(SNAP_STORAGE_KEY, snapToGrid ? '1' : '0');
  }, [snapToGrid]);

  const closeMenu = () => setMenu(null);

  const resetPositions = () => {
    setPositions(defaultPositions(desktopDefs));
  };

  /** Snap an icon and bump it to a free cell if the target is occupied. */
  const snapAndPlace = (id: string, pos: Pos) => {
    const snapped = snapPos(pos);
    const takenCells = new Set<string>();
    Object.entries(positions).forEach(([oid, p]) => {
      if (oid === id) return;
      const c = Math.round((p.x - ORIGIN_X) / COL_STRIDE);
      const r = Math.round((p.y - ORIGIN_Y) / ROW_STRIDE);
      takenCells.add(`${c},${r}`);
    });
    return findFreeCell(snapped, takenCells);
  };

  const handleDragEnd = (id: string) => {
    if (!snapToGrid) return;
    setPositions((p) => {
      const current = p[id];
      if (!current) return p;
      const placed = snapAndPlace(id, current);
      if (placed.x === current.x && placed.y === current.y) return p;
      return { ...p, [id]: placed };
    });
  };

  const toggleSnap = () => setSnapToGrid((s) => !s);

  const desktopMenuItems = (): ContextMenuItem[] => [
    {
      key: 'view',
      label: t('ctx.view'),
      children: [
        { key: 'view-large', label: t('ctx.view.large'), disabled: true },
        { key: 'view-small', label: t('ctx.view.small'), disabled: true },
      ],
    },
    {
      key: 'arrange',
      label: t('ctx.arrange'),
      children: [
        {
          key: 'arr-name',
          label: t('ctx.arrange.name'),
          onSelect: resetPositions,
        },
        {
          key: 'arr-type',
          label: t('ctx.arrange.type'),
          onSelect: resetPositions,
        },
        { key: 'arr-sep', separator: true },
        {
          key: 'arr-align',
          label: t('ctx.arrange.alignGrid'),
          checked: snapToGrid,
          onSelect: toggleSnap,
        },
        {
          key: 'arr-auto',
          label: t('ctx.arrange.autoArrange'),
          checked: false,
          disabled: true,
        },
      ],
    },
    {
      key: 'refresh',
      label: t('ctx.refresh'),
      onSelect: () => window.location.reload(),
    },
    { key: 'sep1', separator: true },
    { key: 'paste', label: t('ctx.paste'), disabled: true },
    { key: 'paste-shortcut', label: t('ctx.pasteShortcut'), disabled: true },
    { key: 'sep2', separator: true },
    {
      key: 'new',
      label: t('ctx.new'),
      children: [
        { key: 'new-folder', label: t('ctx.new.folder'), disabled: true },
        {
          key: 'new-shortcut',
          label: t('ctx.new.shortcut'),
          disabled: true,
        },
        { key: 'new-text', label: t('ctx.new.textDoc'), disabled: true },
      ],
    },
    { key: 'sep3', separator: true },
    { key: 'props', label: t('ctx.properties'), disabled: true },
  ];

  const iconMenuItems = (id: WindowId): ContextMenuItem[] => [
    {
      key: 'open',
      label: t('ctx.open'),
      onSelect: () => onLaunch(id),
    },
    { key: 'sep1', separator: true },
    { key: 'cut', label: t('ctx.cut'), disabled: true },
    { key: 'copy', label: t('ctx.copy'), disabled: true },
    {
      key: 'createShortcut',
      label: t('ctx.createShortcut'),
      disabled: true,
    },
    { key: 'delete', label: t('ctx.delete'), shortcut: 'Del', disabled: true },
    {
      key: 'rename',
      label: t('ctx.rename'),
      shortcut: 'F2',
      disabled: true,
    },
    { key: 'sep2', separator: true },
    { key: 'props', label: t('ctx.properties'), disabled: true },
  ];

  const handleIconSelect = (id: string, multi: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(multi ? prev : []);
      if (multi && prev.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleIconContextMenu = (id: string, x: number, y: number) => {
    setMenu({ x, y, items: iconMenuItems(id as WindowId) });
  };

  const handleIconDragMove = (id: string, x: number, y: number) => {
    setPositions((p) => ({ ...p, [id]: { x, y } }));
  };

  const handleBgMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    if (e.target !== rootRef.current) return;
    closeMenu();
    onDesktopClick();
    if (!(e.ctrlKey || e.metaKey)) {
      setSelectedIds(new Set());
    }
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    setSelection({ x: e.clientX, y: e.clientY, w: 0, h: 0 });
  };

  const handleBgContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== rootRef.current) return;
    e.preventDefault();
    setSelectedIds(new Set());
    setMenu({ x: e.clientX, y: e.clientY, items: desktopMenuItems() });
  };

  useEffect(() => {
    if (!selection || !dragStartRef.current) return;
    const onMove = (e: MouseEvent) => {
      const start = dragStartRef.current!;
      const x = Math.min(start.x, e.clientX);
      const y = Math.min(start.y, e.clientY);
      const w = Math.abs(start.x - e.clientX);
      const h = Math.abs(start.y - e.clientY);
      const rect: Rect = { x, y, w, h };
      setSelection(rect);
      const nodes = document.querySelectorAll<HTMLElement>('[data-icon-id]');
      const next = new Set<string>();
      nodes.forEach((n) => {
        const id = n.dataset.iconId;
        if (!id) return;
        if (rectsIntersect(rect, n.getBoundingClientRect())) {
          next.add(id);
        }
      });
      setSelectedIds(next);
    };
    const onUp = () => {
      dragStartRef.current = null;
      setSelection(null);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [selection]);

  return (
    <div
      className="desktop"
      ref={rootRef}
      onMouseDown={handleBgMouseDown}
      onContextMenu={handleBgContextMenu}
    >
      {desktopDefs.map((d) => {
        const pos = positions[d.id] ?? { x: 12, y: 12 };
        return (
          <DesktopIcon
            key={d.id}
            id={d.id}
            icon={d.icon}
            label={t(d.titleKey)}
            x={pos.x}
            y={pos.y}
            selected={selectedIds.has(d.id)}
            onSelect={handleIconSelect}
            onOpen={() => onLaunch(d.id)}
            onContextMenu={handleIconContextMenu}
            onDragStart={() => {}}
            onDragMove={handleIconDragMove}
            onDragEnd={handleDragEnd}
          />
        );
      })}
      {selection && (
        <div
          className="desktop-selection"
          style={{
            left: selection.x,
            top: selection.y,
            width: selection.w,
            height: selection.h,
          }}
        />
      )}
      {children}
      {menu && (
        <ContextMenu
          x={menu.x}
          y={menu.y}
          items={menu.items}
          onClose={closeMenu}
        />
      )}
    </div>
  );
}
