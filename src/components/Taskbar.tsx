import { useEffect, useState } from 'react';
import type { WindowState, WindowId } from '../types';
import { ICONS } from '../icons';
import { useLang } from '../i18n/LanguageContext';

interface Props {
  windows: WindowState[];
  activeId: WindowId | null;
  startOpen: boolean;
  onToggleStart: () => void;
  onTaskClick: (id: WindowId) => void;
}

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const msToNextMinute = 60000 - (Date.now() % 60000);
    let interval: ReturnType<typeof setInterval> | null = null;
    const timeout = setTimeout(() => {
      setNow(new Date());
      interval = setInterval(() => setNow(new Date()), 60000);
    }, msToNextMinute);
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, []);
  return now;
}

export default function Taskbar({
  windows,
  activeId,
  startOpen,
  onToggleStart,
  onTaskClick,
}: Props) {
  const { lang, setLang, t } = useLang();
  const now = useClock();
  const locale = lang === 'tr' ? 'tr-TR' : 'en-US';
  const time = now.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  });
  const fullDate = now.toLocaleDateString(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="taskbar">
      <button
        className={`start-button${startOpen ? ' active' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          onToggleStart();
        }}
      >
        <img src={ICONS.startFlag} alt="" draggable={false} />
        <span>{t('start.label')}</span>
      </button>
      <div className="taskbar-windows">
        {windows.map((w) => (
          <button
            key={w.id}
            data-taskbar-id={w.id}
            className={`taskbar-btn${
              !w.minimized && activeId === w.id ? ' active' : ''
            }`}
            onClick={() => onTaskClick(w.id)}
            title={t(w.titleKey)}
          >
            <img src={w.icon} alt="" draggable={false} />
            <span className="label">{t(w.titleKey)}</span>
          </button>
        ))}
      </div>
      <div
        className="lang-switch"
        role="group"
        aria-label={lang === 'tr' ? 'Dil seçimi' : 'Language'}
      >
        <button
          className={`lang-switch-btn${lang === 'tr' ? ' active' : ''}`}
          onClick={() => setLang('tr')}
          title="Türkçe"
          aria-pressed={lang === 'tr'}
        >
          <span className="lang-switch-flag" aria-hidden>
            🇹🇷
          </span>
          <span className="lang-switch-code">TR</span>
        </button>
        <button
          className={`lang-switch-btn${lang === 'en' ? ' active' : ''}`}
          onClick={() => setLang('en')}
          title="English"
          aria-pressed={lang === 'en'}
        >
          <span className="lang-switch-flag" aria-hidden>
            🇬🇧
          </span>
          <span className="lang-switch-code">EN</span>
        </button>
      </div>
      <div className="system-tray" title={fullDate}>
        <img
          className="tray-icon"
          src={ICONS.trayNetwork}
          alt=""
          draggable={false}
        />
        <img
          className="tray-icon"
          src={ICONS.trayVolume}
          alt=""
          draggable={false}
        />
        <span className="tray-clock">{time}</span>
      </div>
    </div>
  );
}
