import { useEffect, useRef } from 'react';

export interface ContextMenuItem {
  /** Stable key for React. */
  key: string;
  /** Label or 'separator' to render a divider. */
  label?: string;
  /** Optional shortcut hint shown on the right (e.g. 'F2'). */
  shortcut?: string;
  /** Submenu items; if present, hovers expand them. */
  children?: ContextMenuItem[];
  /** Action when clicked (leaf items only). */
  onSelect?: () => void;
  /** Disabled appearance, ignores clicks. */
  disabled?: boolean;
  /** True for a separator row. */
  separator?: boolean;
  /** True to show a leading checkmark (toggle item). */
  checked?: boolean;
}

interface Props {
  x: number;
  y: number;
  items: ContextMenuItem[];
  onClose: () => void;
}

export default function ContextMenu({ x, y, items, onClose }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', onDocDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  // Clamp menu position so it stays in viewport
  const adjustedX = Math.min(x, window.innerWidth - 200);
  const adjustedY = Math.min(y, window.innerHeight - 30 - 280);

  return (
    <div
      ref={rootRef}
      className="ctx-menu"
      style={{ left: adjustedX, top: adjustedY }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <MenuList items={items} onClose={onClose} />
    </div>
  );
}

function MenuList({
  items,
  onClose,
}: {
  items: ContextMenuItem[];
  onClose: () => void;
}) {
  return (
    <ul className="ctx-list">
      {items.map((item) => {
        if (item.separator) {
          return <li key={item.key} className="ctx-sep" />;
        }
        const hasChildren = !!item.children?.length;
        return (
          <li
            key={item.key}
            className={`ctx-item${item.disabled ? ' disabled' : ''}${
              hasChildren ? ' has-children' : ''
            }`}
            onClick={(e) => {
              e.stopPropagation();
              if (item.disabled) return;
              if (hasChildren) return;
              item.onSelect?.();
              onClose();
            }}
          >
            <span className="ctx-check">{item.checked ? '✓' : ''}</span>
            <span className="ctx-label">{item.label}</span>
            {item.shortcut && (
              <span className="ctx-shortcut">{item.shortcut}</span>
            )}
            {hasChildren && <span className="ctx-arrow">▶</span>}
            {hasChildren && (
              <div className="ctx-submenu">
                <MenuList items={item.children!} onClose={onClose} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
