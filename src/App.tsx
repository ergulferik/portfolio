import { useState } from 'react';
import Desktop from './components/Desktop';
import LanguageSelectModal from './components/LanguageSelectModal';
import LogOffDialog from './components/LogOffDialog';
import StartMenu from './components/StartMenu';
import Taskbar from './components/Taskbar';
import Window from './components/Window';
import { useWindowManager } from './state/useWindowManager';
import { WINDOW_DEFS, renderWindowContent } from './windowsRegistry';
import type { WindowId } from './types';
import { LauncherProvider } from './launcherContext';

export default function App() {
  const wm = useWindowManager();
  const [startOpen, setStartOpen] = useState(false);
  const [logOffOpen, setLogOffOpen] = useState(false);

  const launch = (id: WindowId) => {
    const def = WINDOW_DEFS.find((d) => d.id === id);
    if (def) wm.open(def);
  };

  const taskClick = (id: WindowId) => {
    const w = wm.state.windows[id];
    if (!w) return;
    if (w.minimized) wm.restore(id);
    else if (wm.state.activeId === id) wm.minimize(id);
    else wm.focus(id);
  };

  return (
    <LauncherProvider launch={launch}>
    <Desktop
      defs={WINDOW_DEFS}
      onLaunch={launch}
      onDesktopClick={() => setStartOpen(false)}
    >
      {Object.values(wm.state.windows).map((w) => (
        <Window
          key={w.id}
          win={w}
          active={wm.state.activeId === w.id && !w.minimized}
          onFocus={() => wm.focus(w.id)}
          onClose={() => wm.close(w.id)}
          onAnimationEnd={() => wm.finalizeClose(w.id)}
          onMinimize={() => wm.minimize(w.id)}
          onToggleMax={() => wm.toggleMax(w.id)}
          onMove={(x, y) => wm.move(w.id, x, y)}
          onSetBounds={(bounds, opts) => wm.setBounds(w.id, bounds, opts)}
        >
          {renderWindowContent(w.id)}
        </Window>
      ))}
      {startOpen && (
        <StartMenu
          defs={WINDOW_DEFS}
          onLaunch={launch}
          onClose={() => setStartOpen(false)}
          onLogOff={() => setLogOffOpen(true)}
        />
      )}
      {logOffOpen && <LogOffDialog onClose={() => setLogOffOpen(false)} />}
      <Taskbar
        windows={Object.values(wm.state.windows)}
        activeId={wm.state.activeId}
        startOpen={startOpen}
        onToggleStart={() => setStartOpen((s) => !s)}
        onTaskClick={taskClick}
      />
      <LanguageSelectModal />
    </Desktop>
    </LauncherProvider>
  );
}
