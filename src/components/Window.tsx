import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import type { WindowState } from '../types';
import { useLang } from '../i18n/LanguageContext';

const EDGE_THRESHOLD = 8;
const TASKBAR_HEIGHT = 30;
const OPEN_ANIM_MS = 160;

type SnapZone = 'top' | 'left' | 'right' | null;
type AnimState = 'idle' | 'minimizing' | 'restoring';

interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

function snapBounds(zone: Exclude<SnapZone, null>): Bounds {
  const W = window.innerWidth;
  const H = window.innerHeight - TASKBAR_HEIGHT;
  if (zone === 'top') return { x: 0, y: 0, width: W, height: H };
  if (zone === 'left')
    return { x: 0, y: 0, width: Math.floor(W / 2), height: H };
  const half = Math.floor(W / 2);
  return { x: half, y: 0, width: W - half, height: H };
}

function detectZone(cx: number, cy: number): SnapZone {
  if (cy <= EDGE_THRESHOLD) return 'top';
  if (cx <= EDGE_THRESHOLD) return 'left';
  if (cx >= window.innerWidth - EDGE_THRESHOLD) return 'right';
  return null;
}

interface Props {
  win: WindowState;
  active: boolean;
  onFocus: () => void;
  onClose: () => void;
  onAnimationEnd: () => void;
  onMinimize: () => void;
  onToggleMax: () => void;
  onMove: (x: number, y: number) => void;
  onSetBounds: (
    bounds: Bounds,
    opts?: { savePrev?: boolean; maximized?: boolean },
  ) => void;
  children: ReactNode;
}

export default function Window({
  win,
  active,
  onFocus,
  onClose,
  onAnimationEnd,
  onMinimize,
  onToggleMax,
  onMove,
  onSetBounds,
  children,
}: Props) {
  const { t } = useLang();
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [snapZone, setSnapZone] = useState<SnapZone>(null);
  const restoredRef = useRef(false);

  const [animState, setAnimState] = useState<AnimState>('idle');
  const [minVars, setMinVars] = useState<{ tx: number; ty: number } | null>(
    null,
  );
  const prevMinimizedRef = useRef(win.minimized);
  const [hasOpened, setHasOpened] = useState(false);

  // After the initial open animation finishes, drop the 'opening' class so it
  // doesn't re-trigger when later state changes (e.g. after restore).
  useEffect(() => {
    const id = setTimeout(() => setHasOpened(true), OPEN_ANIM_MS + 40);
    return () => clearTimeout(id);
  }, []);

  // Detect minimize / restore transitions and compute the per-window taskbar
  // target so the animation lands on its own taskbar button.
  useEffect(() => {
    const wasMin = prevMinimizedRef.current;
    const isMin = win.minimized;
    if (wasMin === isMin) return;
    prevMinimizedRef.current = isMin;

    const btn = document.querySelector<HTMLElement>(
      `[data-taskbar-id="${win.id}"]`,
    );
    if (!btn) {
      // No button found — skip animation
      setAnimState('idle');
      setMinVars(null);
      return;
    }
    const r = btn.getBoundingClientRect();
    const tx = r.left + r.width / 2 - (win.x + win.width / 2);
    const ty = r.top + r.height / 2 - (win.y + win.height / 2);
    setMinVars({ tx, ty });
    setAnimState(isMin ? 'minimizing' : 'restoring');
  }, [win.minimized, win.id, win.x, win.y, win.width, win.height]);

  // Drag + snap (unchanged behavior, untouched logic)
  useEffect(() => {
    if (!dragOffset) return;
    const onMouseMove = (e: MouseEvent) => {
      if (!restoredRef.current && win.prevBounds && win.maximized) {
        restoredRef.current = true;
        const pb = win.prevBounds;
        const newX = e.clientX - pb.width / 2;
        const newY = e.clientY - 14;
        onSetBounds(
          { x: newX, y: newY, width: pb.width, height: pb.height },
          { maximized: false },
        );
        setDragOffset({ x: pb.width / 2, y: 14 });
        return;
      }
      const newX = Math.max(
        -win.width + 40,
        Math.min(window.innerWidth - 40, e.clientX - dragOffset.x),
      );
      const maxY = window.innerHeight - TASKBAR_HEIGHT - 28;
      const newY = Math.max(0, Math.min(maxY, e.clientY - dragOffset.y));
      onMove(newX, newY);
      setSnapZone(detectZone(e.clientX, e.clientY));
    };
    const onMouseUp = () => {
      if (snapZone) {
        const bounds = snapBounds(snapZone);
        onSetBounds(bounds, {
          savePrev: true,
          maximized: snapZone === 'top',
        });
      }
      setDragOffset(null);
      setSnapZone(null);
      restoredRef.current = false;
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [
    dragOffset,
    onMove,
    onSetBounds,
    snapZone,
    win.prevBounds,
    win.maximized,
    win.width,
  ]);

  const startDrag = (e: React.MouseEvent) => {
    onFocus();
    setDragOffset({ x: e.clientX - win.x, y: e.clientY - win.y });
  };

  const handleAnimEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.animationName === 'win-close') {
      onAnimationEnd();
      return;
    }
    if (
      e.animationName === 'win-minimize' ||
      e.animationName === 'win-restore'
    ) {
      setAnimState('idle');
      setMinVars(null);
    }
  };

  // Build the mutually exclusive phase class.
  let phaseClass = '';
  if (win.closing) phaseClass = 'closing';
  else if (animState === 'minimizing') phaseClass = 'minimizing';
  else if (animState === 'restoring') phaseClass = 'restoring';
  else if (!hasOpened) phaseClass = 'opening';

  const showHidden = win.minimized && animState !== 'minimizing';

  const inlineStyle: CSSProperties = {
    left: win.x,
    top: win.y,
    width: win.width,
    height: win.height,
    zIndex: win.zIndex,
    display: showHidden ? 'none' : 'flex',
  };
  if (minVars) {
    (inlineStyle as Record<string, string | number>)['--min-tx'] =
      `${minVars.tx}px`;
    (inlineStyle as Record<string, string | number>)['--min-ty'] =
      `${minVars.ty}px`;
  }

  const title = t(win.titleKey);

  return (
    <>
      <div
        className={`window${dragOffset ? ' dragging' : ''}${
          phaseClass ? ` ${phaseClass}` : ''
        }`}
        style={inlineStyle}
        onMouseDown={onFocus}
        onAnimationEnd={handleAnimEnd}
      >
        <div
          className={`title-bar${active ? '' : ' inactive'}`}
          onMouseDown={startDrag}
          onDoubleClick={onToggleMax}
        >
          <div className="title-bar-text">
            <img className="window-title-icon" src={win.icon} alt="" />
            <span className="label">{title}</span>
          </div>
          <div className="title-bar-controls">
            <button
              aria-label="Minimize"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={onMinimize}
            />
            <button
              aria-label={win.maximized ? 'Restore' : 'Maximize'}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={onToggleMax}
            />
            <button
              aria-label="Close"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={onClose}
            />
          </div>
        </div>
        {children}
      </div>
      {snapZone && <SnapPreview zone={snapZone} />}
    </>
  );
}

function SnapPreview({ zone }: { zone: Exclude<SnapZone, null> }) {
  const b = snapBounds(zone);
  return (
    <div
      className="snap-preview"
      style={{ left: b.x, top: b.y, width: b.width, height: b.height }}
    />
  );
}
