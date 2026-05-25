import { useState } from 'react';
import { socialLinks, getProfile } from '../../data/portfolioData';
import { useLang } from '../../i18n/LanguageContext';

const HOME = 'about:home';

/** URLs that we know can be safely iframed (no X-Frame-Options / frame-ancestors). */
const EMBEDDABLE_PREFIXES = [
  'https://ergulferik.github.io/',
];

function canEmbed(url: string): boolean {
  return EMBEDDABLE_PREFIXES.some((p) => url.startsWith(p));
}

export default function IEWindow() {
  const { lang, t } = useLang();
  const profile = getProfile(lang);
  const [history, setHistory] = useState<string[]>([HOME]);
  const [idx, setIdx] = useState(0);
  const url = history[idx];

  const go = (next: string) => {
    const cut = history.slice(0, idx + 1);
    setHistory([...cut, next]);
    setIdx(cut.length);
  };
  const back = () => idx > 0 && setIdx(idx - 1);
  const forward = () => idx < history.length - 1 && setIdx(idx + 1);

  return (
    <>
      <div className="window-menubar">
        <span>{t('menu.file')}</span>
        <span>{t('menu.edit')}</span>
        <span>{t('menu.view')}</span>
        <span>{t('menu.favorites')}</span>
        <span>{t('menu.tools')}</span>
        <span>{t('menu.help')}</span>
      </div>
      <div className="ie-toolbar">
        <button className="ie-nav-btn" onClick={back} disabled={idx === 0}>
          {t('toolbar.back')}
        </button>
        <button
          className="ie-nav-btn"
          onClick={forward}
          disabled={idx === history.length - 1}
        >
          {t('toolbar.forward')} →
        </button>
        <button className="ie-nav-btn" onClick={() => go(HOME)}>
          {t('toolbar.home')}
        </button>
      </div>
      <div className="address-bar">
        <span>{t('ie.address')}</span>
        <input value={url} readOnly />
        <button>{t('ie.go')}</button>
      </div>
      <div className={`ie-page${canEmbed(url) ? ' ie-page-embed' : ''}`}>
        {url === HOME ? (
          <Home onNavigate={go} name={profile.name} />
        ) : canEmbed(url) ? (
          <EmbeddedSite url={url} />
        ) : (
          <FakeSite url={url} onBack={back} />
        )}
      </div>
      <div className="status-bar">
        <p className="status-bar-field">{t('ie.done')}</p>
        <p className="status-bar-field">Internet</p>
      </div>
    </>
  );
}

function Home({
  onNavigate,
  name,
}: {
  onNavigate: (u: string) => void;
  name: string;
}) {
  const { t } = useLang();
  return (
    <div>
      <h2 style={{ color: '#00248d', margin: 0 }}>
        {t('ie.welcome', { name })}
      </h2>
      <p style={{ fontSize: 12, color: '#444' }}>{t('ie.intro')}</p>
      <hr className="xp-rule" />
      <h3 style={{ color: '#00248d', fontSize: 14, margin: '0 0 8px' }}>
        {t('ie.socialHeading')}
      </h3>
      <ul style={{ paddingLeft: 18, lineHeight: 1.8 }}>
        {socialLinks.map((l) => (
          <li key={l.label}>
            <a
              href="#"
              className="text-link"
              onClick={(e) => {
                e.preventDefault();
                onNavigate(l.url);
              }}
            >
              {l.label}
            </a>{' '}
            <span style={{ color: '#888', fontSize: 11 }}>— {l.url}</span>
            {canEmbed(l.url) && (
              <span
                className="ie-embed-badge"
                title={t('ie.embedBadgeHint')}
              >
                {t('ie.embedBadge')}
              </span>
            )}
          </li>
        ))}
      </ul>
      <hr className="xp-rule" />
      <p style={{ fontSize: 11, color: '#888' }}>
        {t('ie.bestViewed', { year: new Date().getFullYear(), name })}
      </p>
    </div>
  );
}

function EmbeddedSite({ url }: { url: string }) {
  const { t } = useLang();
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="ie-embed">
      {!loaded && <div className="ie-embed-loading">{t('ie.loading')}</div>}
      <iframe
        className="ie-embed-frame"
        src={url}
        title={url}
        onLoad={() => setLoaded(true)}
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

function FakeSite({ url, onBack }: { url: string; onBack: () => void }) {
  const { t } = useLang();
  return (
    <div>
      <h2 style={{ color: '#00248d', margin: 0 }}>{t('ie.loading')}</h2>
      <p style={{ fontSize: 12 }}>{t('ie.askOpen')}</p>
      <p>
        <a href={url} target="_blank" rel="noreferrer" className="text-link">
          {url} →
        </a>
      </p>
      <button onClick={onBack}>{t('ie.goBack')}</button>
    </div>
  );
}
