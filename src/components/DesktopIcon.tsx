import { useEffect, useRef, useState } from 'react';

const DRAG_THRESHOLD = 4;

interface Props {
  id: string;
  icon: string;
  label: string;
  x: number;
  y: number;
  selected: boolean;
  onSelect: (id: string, multi: boolean) => void;
  onOpen: () => void;
  onContextMenu: (id: string, x: number, y: number) => void;
  onDragStart: (id: string) => void;
  onDragMove: (id: string, x: number, y: number) => void;
  onDragEnd: (id: string) => void;
}

export default function DesktopIcon({
  id,
  icon,
  label,
  x,
  y,
  selected,
  onSelect,
  onOpen,
  onContextMenu,
  onDragStart,
  onDragMove,
  onDragEnd,
}: Props) {
  const [dragging, setDragging] = useState(false);
  const startRef = useRef<{
    mx: number;
    my: number;
    ix: number;
    iy: number;
    moved: boolean;
    pointerType: string;
    startedAt: number;
  } | null>(null);
  const lastTapRef = useRef<number>(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType !== 'touch') return;
    e.stopPropagation();
    onSelect(id, e.ctrlKey || e.metaKey);
    startRef.current = {
      mx: e.clientX,
      my: e.clientY,
      ix: x,
      iy: y,
      moved: false,
      pointerType: e.pointerType,
      startedAt: Date.now(),
    };
  };

  useEffect(() => {
    if (!startRef.current) return;
    const onMove = (e: PointerEvent) => {
      const s = startRef.current;
      if (!s) return;
      const dx = e.clientX - s.mx;
      const dy = e.clientY - s.my;
      if (!s.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
      // On touch we suppress drag entirely so taps don't accidentally
      // move icons around — XP-style drag isn't really a thing on phones.
      if (s.pointerType === 'touch') return;
      if (!s.moved) {
        s.moved = true;
        setDragging(true);
        onDragStart(id);
      }
      const maxX = window.innerWidth - 76;
      const maxY = window.innerHeight - 30 - 86;
      onDragMove(
        id,
        Math.max(0, Math.min(maxX, s.ix + dx)),
        Math.max(0, Math.min(maxY, s.iy + dy)),
      );
    };
    const onUp = (e: PointerEvent) => {
      const s = startRef.current;
      startRef.current = null;
      if (!s) return;
      if (s.moved) {
        setDragging(false);
        onDragEnd(id);
        return;
      }
      // Touch: any quick tap on the icon opens it (mobile users don't
      // double-tap — that's the zoom gesture).
      if (e.pointerType === 'touch' && Date.now() - s.startedAt < 500) {
        lastTapRef.current = Date.now();
        onOpen();
      }
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [id, onDragMove, onDragStart, onDragEnd, onOpen]);

  return (
    <div
      className={`desktop-icon${selected ? ' selected' : ''}${
        dragging ? ' dragging' : ''
      }`}
      data-icon-id={id}
      style={{ left: x, top: y }}
      onPointerDown={handlePointerDown}
      onDoubleClick={onOpen}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onSelect(id, false);
        onContextMenu(id, e.clientX, e.clientY);
      }}
      tabIndex={0}
    >
      <div className="desktop-icon-img">
        <img src={icon} alt="" draggable={false} />
      </div>
      <div className="desktop-icon-label">{label}</div>
    </div>
  );
}
