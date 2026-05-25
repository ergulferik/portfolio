import { useEffect, useRef } from 'react';
import { getProfile, PROFILE_PHOTO } from '../data/portfolioData';
import type { WindowDefinition, WindowId } from '../types';
import { ICONS } from '../icons';
import { useLang } from '../i18n/LanguageContext';

interface Props {
  defs: WindowDefinition[];
  onLaunch: (id: WindowId) => void;
  onClose: () => void;
  onLogOff: () => void;
}

export default function StartMenu({ defs, onLaunch, onClose, onLogOff }: Props) {
  const { lang, t } = useLang();
  const profile = getProfile(lang);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [onClose]);

  const programs = defs.filter((d) => d.inStartMenu !== false);

  const handleLaunch = (id: WindowId) => {
    onLaunch(id);
    onClose();
  };

  return (
    <div className="start-menu" ref={ref} onMouseDown={(e) => e.stopPropagation()}>
      <div className="start-menu-header">
        <div className="start-menu-avatar">
          <img src={PROFILE_PHOTO} alt={profile.name} />
        </div>
        <div className="start-menu-name">{profile.name}</div>
      </div>
      <div className="start-menu-body">
        <div className="start-col left">
          {programs.map((p) => (
            <div
              key={p.id}
              className="start-item"
              onClick={() => handleLaunch(p.id)}
            >
              <div className="start-item-icon">
                <img src={p.icon} alt="" />
              </div>
              <div className="start-item-text">
                <div className="start-item-title">{t(p.titleKey)}</div>
              </div>
            </div>
          ))}
          <div className="start-col-divider" />
          <div className="start-item" onClick={() => handleLaunch('ie')}>
            <div className="start-item-icon">
              <img src={ICONS.ie} alt="" />
            </div>
            <div className="start-item-text">
              <div className="start-item-title">{t('start.internetTitle')}</div>
              <div className="start-item-sub">{t('start.internetSub')}</div>
            </div>
          </div>
          <div className="start-item" onClick={() => handleLaunch('contact')}>
            <div className="start-item-icon">
              <img src={ICONS.mail} alt="" />
            </div>
            <div className="start-item-text">
              <div className="start-item-title">{t('start.emailTitle')}</div>
              <div className="start-item-sub">{t('start.emailSub')}</div>
            </div>
          </div>
        </div>
        <div className="start-col right">
          <div className="start-item" onClick={() => handleLaunch('cv')}>
            <div className="start-item-icon">
              <img src={ICONS.documents} alt="" />
            </div>
            <div className="start-item-text">
              <div className="start-item-title">{t('window.cv')}</div>
            </div>
          </div>
          <div className="start-item" onClick={() => handleLaunch('projects')}>
            <div className="start-item-icon">
              <img src={ICONS.folder} alt="" />
            </div>
            <div className="start-item-text">
              <div className="start-item-title">{t('window.projects')}</div>
            </div>
          </div>
          <div className="start-col-divider" />
          <div className="start-item" onClick={() => handleLaunch('about')}>
            <div className="start-item-icon">
              <img src={ICONS.help} alt="" />
            </div>
            <div className="start-item-text">
              <div className="start-item-title">{t('window.about')}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="start-menu-footer">
        <div
          className="footer-btn"
          onClick={() => {
            onClose();
            onLogOff();
          }}
        >
          <span>{t('start.switchUser')}</span>
        </div>
      </div>
    </div>
  );
}
