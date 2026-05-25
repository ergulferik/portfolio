import { createContext, useContext, type ReactNode } from 'react';
import type { WindowId } from './types';

interface LauncherContextValue {
  launch: (id: WindowId) => void;
}

const LauncherContext = createContext<LauncherContextValue | null>(null);

export function LauncherProvider({
  launch,
  children,
}: {
  launch: (id: WindowId) => void;
  children: ReactNode;
}) {
  return (
    <LauncherContext.Provider value={{ launch }}>
      {children}
    </LauncherContext.Provider>
  );
}

export function useLauncher(): LauncherContextValue {
  const ctx = useContext(LauncherContext);
  if (!ctx) throw new Error('useLauncher must be used inside LauncherProvider');
  return ctx;
}
