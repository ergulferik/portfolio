import { useEffect, useRef } from 'react';
import { ICONS } from '../icons';
import { useLang } from '../i18n/LanguageContext';

const OTHER_PORTFOLIO_URL = 'https://ergulferik.github.io/Portfolio-Website/';

interface Props {
  onClose: () => void;
}

/**
 * XP-style "Log Off" dialog. Presents the user with two portfolio sessions
 * to choose from: the current XP-themed one (keeps them here) and the
 * classic portfolio page (opens in a new tab).
 */
export default function LogOffDialog({ onClose }: Props) {
  const { t } = useLang();
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    cancelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const stayHere = () => onClose();
  const goOther = () => {
    window.open(OTHER_PORTFOLIO_URL, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div
      className="logoff-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={t('logOff.title')}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="logoff-window">
        <div className="logoff-banner">{t('logOff.title')}</div>
        <div className="logoff-body">
          <p className="logoff-prompt">{t('logOff.prompt')}</p>
          <div className="logoff-tiles">
            <button
              type="button"
              className="logoff-tile"
              onClick={stayHere}
              title={t('logOff.thisTitle')}
            >
              <img
                className="logoff-tile-icon"
                src={ICONS.myComputer}
                alt=""
              />
              <div className="logoff-tile-text">
                <div className="logoff-tile-title">
                  {t('logOff.thisTitle')}
                </div>
                <div className="logoff-tile-desc">
                  {t('logOff.thisDesc')}
                </div>
              </div>
            </button>
            <button
              type="button"
              className="logoff-tile"
              onClick={goOther}
              title={t('logOff.otherTitle')}
            >
              <img className="logoff-tile-icon" src={ICONS.ie} alt="" />
              <div className="logoff-tile-text">
                <div className="logoff-tile-title">
                  {t('logOff.otherTitle')}
                </div>
                <div className="logoff-tile-desc">
                  {t('logOff.otherDesc')}
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className="logoff-footer">
          <button
            ref={cancelRef}
            type="button"
            className="logoff-cancel"
            onClick={onClose}
          >
            {t('logOff.cancel')}
          </button>
        </div>
      </div>
    </div>
  );
}
