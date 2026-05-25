import type { TKey } from './i18n/strings';

export type WindowId =
  | 'about'
  | 'experience'
  | 'projects'
  | 'cv'
  | 'contact'
  | 'ie'
  | 'recycle';

export interface WindowState {
  id: WindowId;
  /** Translation key resolved at render time, so language switches update title. */
  titleKey: TKey;
  /** Path to an SVG/PNG icon (served from /public). */
  icon: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
  /** True while the close animation is running; the actual removal fires on animation end. */
  closing: boolean;
  /** Saved bounds while maximized, used to restore. */
  prevBounds?: { x: number; y: number; width: number; height: number };
}

export interface WindowDefinition {
  id: WindowId;
  titleKey: TKey;
  icon: string;
  /** Optional larger desktop icon. Falls back to `icon`. */
  desktopIcon?: string;
  defaultSize: { width: number; height: number };
  /** If true, the icon shows on the desktop. */
  onDesktop?: boolean;
  /** If true, the icon shows in start menu. */
  inStartMenu?: boolean;
}
