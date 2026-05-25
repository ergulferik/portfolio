import { useMemo } from 'react';
import { cvTR } from '../../data/cvTr';
import { cvEN } from '../../data/cvEn';
import { getProfile } from '../../data/portfolioData';
import { ICONS } from '../../icons';
import { useLang } from '../../i18n/LanguageContext';
import type { TKey } from '../../i18n/strings';
import { useLauncher } from '../../launcherContext';

function base64ToBlob(b64: string, type = 'application/pdf'): Blob {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type });
}

interface DocFile {
  id: string;
  fileName: string;
  url: string;
  /** Emoji overlay on the file thumb (flag for CVs, mortar-board for transcript). */
  badge: string;
  /** i18n key for the human label of this doc — e.g. "Turkish CV" / "Transcript". */
  labelKey: TKey;
  /** When set, the card is highlighted while the UI runs in that language. */
  highlightForLang?: 'tr' | 'en';
}

export default function CVWindow() {
  const { lang, t } = useLang();
  const { launch } = useLauncher();
  const profile = getProfile(lang);

  const files = useMemo<DocFile[]>(
    () => [
      {
        id: 'cv-tr',
        fileName: 'ErgulFerik_CV_TR.pdf',
        url: URL.createObjectURL(base64ToBlob(cvTR)),
        badge: '🇹🇷',
        labelKey: 'cv.file.cvTr',
        highlightForLang: 'tr',
      },
      {
        id: 'cv-en',
        fileName: 'ErgulFerik_CV_EN.pdf',
        url: URL.createObjectURL(base64ToBlob(cvEN)),
        badge: '🇬🇧',
        labelKey: 'cv.file.cvEn',
        highlightForLang: 'en',
      },
    ],
    [],
  );

  const nav = (e: React.MouseEvent, target: 'projects' | 'about' | 'contact') => {
    e.preventDefault();
    launch(target);
  };

  const openInNewTab = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="explorer">
      <aside className="explorer-sidebar">
        <div className="sidebar-panel">
          <div className="sidebar-panel-header">{t('cv.fileTasks')}</div>
          <div className="sidebar-panel-body">
            {files.map((f) => (
              <a key={f.id} href={f.url} download={f.fileName}>
                {f.badge}{' '}
                {t('cv.fileTask.downloadDoc', { doc: t(f.labelKey) })}
              </a>
            ))}
            <a href="#" onClick={(e) => nav(e, 'contact')}>
              {t('cv.fileTask.email')}
            </a>
          </div>
        </div>
        <div className="sidebar-panel">
          <div className="sidebar-panel-header">
            {t('about.sidebar.otherPlaces')}
          </div>
          <div className="sidebar-panel-body">
            <a href="#" onClick={(e) => nav(e, 'projects')}>
              {t('about.link.myComputer')}
            </a>
            <a href="#" onClick={(e) => nav(e, 'about')}>
              {t('window.about')}
            </a>
          </div>
        </div>
        <div className="sidebar-panel">
          <div className="sidebar-panel-header">{t('cv.details')}</div>
          <div className="sidebar-panel-body">
            {files.map((f) => (
              <div key={f.id} style={{ marginBottom: 4 }}>
                <strong>{f.fileName}</strong>
                <div style={{ fontSize: 10, color: '#3a4a6a' }}>
                  {t('cv.docType')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
      <main className="explorer-main">
        <div className="page-title">{t('cv.title')}</div>
        <div className="page-subtitle">
          {t('cv.subtitle', { name: profile.name })}
        </div>
        <hr className="xp-rule" />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: 16,
          }}
        >
          {files.map((f) => (
            <a
              key={f.id}
              href={f.url}
              download={f.fileName}
              className={`photo-card${
                f.highlightForLang === lang ? ' cv-card-active' : ''
              }`}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer',
                position: 'relative',
              }}
              title={t('cv.fileTask.downloadDoc', { doc: t(f.labelKey) })}
              onAuxClick={(e) => {
                if (e.button === 1) openInNewTab(e, f.url);
              }}
            >
              <div
                className="photo-thumb"
                style={{
                  background: '#fff',
                  border: '1px solid #d4d0c8',
                  position: 'relative',
                }}
              >
                <img
                  src={ICONS.document}
                  alt=""
                  style={{ width: 44, height: 44 }}
                />
                <span
                  style={{
                    position: 'absolute',
                    bottom: 4,
                    right: 4,
                    fontSize: 16,
                    lineHeight: 1,
                    filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.35))',
                  }}
                  aria-hidden
                >
                  {f.badge}
                </span>
              </div>
              <div className="photo-label">{f.fileName}</div>
            </a>
          ))}
        </div>
        <hr className="xp-rule" />
        <div
          style={{
            background: '#fffbcc',
            border: '1px solid #d8c800',
            padding: 10,
            fontSize: 12,
          }}
        >
          {t('cv.note')}
        </div>
      </main>
    </div>
  );
}
