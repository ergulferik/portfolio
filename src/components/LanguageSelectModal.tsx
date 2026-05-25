import { useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n/LanguageContext';
import type { Lang } from '../i18n/types';
import { ICONS } from '../icons';

/**
 * First-visit welcome dialog. Asks the user to pick a language; the auto-
 * detected option is preselected. Selection persists to localStorage via
 * the context, after which the modal never reappears for this browser.
 */
export default function LanguageSelectModal() {
  const { hasChosen, browserLang, setLang } = useLang();
  const [picked, setPicked] = useState<Lang>(browserLang);
  const okRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    okRef.current?.focus();
  }, []);

  if (hasChosen) return null;

  const confirm = () => setLang(picked);

  return (
    <div className="lang-modal-backdrop" role="dialog" aria-modal="true">
      <div className="window lang-modal-window">
        <div className="title-bar">
          <div className="title-bar-text">
            <img className="window-title-icon" src={ICONS.help} alt="" />
            <span className="label">Welcome / Hoş Geldiniz</span>
          </div>
          <div className="title-bar-controls">
            {/* No minimize/close — the user must pick a language to continue. */}
          </div>
        </div>
        <div className="window-body padded lang-modal-body">
          <p className="lang-modal-line">
            <strong>Hoş geldiniz!</strong> Lütfen tercih ettiğiniz dili seçin.
            Seçiminiz tarayıcınızda hatırlanacaktır.
          </p>
          <p className="lang-modal-line">
            <strong>Welcome!</strong> Please choose your preferred language.
            Your choice will be remembered in this browser.
          </p>

          <div className="lang-modal-options">
            <label className={`lang-option${picked === 'tr' ? ' selected' : ''}`}>
              <input
                type="radio"
                name="lang"
                value="tr"
                checked={picked === 'tr'}
                onChange={() => setPicked('tr')}
              />
              <span className="lang-flag" aria-hidden>
                🇹🇷
              </span>
              <span className="lang-name">
                Türkçe
                {browserLang === 'tr' && (
                  <span className="lang-suggest"> (önerilen)</span>
                )}
              </span>
            </label>
            <label className={`lang-option${picked === 'en' ? ' selected' : ''}`}>
              <input
                type="radio"
                name="lang"
                value="en"
                checked={picked === 'en'}
                onChange={() => setPicked('en')}
              />
              <span className="lang-flag" aria-hidden>
                🇬🇧
              </span>
              <span className="lang-name">
                English
                {browserLang === 'en' && (
                  <span className="lang-suggest"> (suggested)</span>
                )}
              </span>
            </label>
          </div>
        </div>
        <div className="lang-modal-footer">
          <button
            ref={okRef}
            className="lang-modal-ok"
            type="button"
            onClick={confirm}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
