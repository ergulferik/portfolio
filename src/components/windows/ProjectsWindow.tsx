import { getProjects } from '../../data/portfolioData';
import { ICONS } from '../../icons';
import { useLang } from '../../i18n/LanguageContext';

export default function ProjectsWindow() {
  const { lang, t } = useLang();
  const projects = getProjects(lang);
  return (
    <>
      <div className="window-menubar">
        <span>{t('menu.file')}</span>
        <span>{t('menu.edit')}</span>
        <span>{t('menu.view')}</span>
        <span>{t('menu.favorites')}</span>
        <span>{t('menu.help')}</span>
      </div>
      <div className="window-toolbar">
        <button className="tb-btn" disabled>{t('toolbar.back')}</button>
        <button className="tb-btn" disabled>
          {t('toolbar.forward')}
        </button>
        <button className="tb-btn" disabled>{t('toolbar.up')}</button>
        <button className="tb-btn" onClick={() => window.location.reload()}>
          {t('toolbar.refresh')}
        </button>
      </div>
      <div className="window-body padded">
        <div className="page-title">{t('projects.title')}</div>
        <div className="page-subtitle">{t('projects.subtitle')}</div>
        <hr className="xp-rule" />
        {projects.map((p) => (
          <div className="project-item" key={p.name}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <img
                src={ICONS.folder}
                alt=""
                style={{ width: 36, height: 36, flexShrink: 0 }}
              />
              <div style={{ flex: 1 }}>
                <div className="exp-role">{p.name}</div>
                <div className="exp-meta">{p.tagline}</div>
                <div className="exp-desc">{p.description}</div>
                <div className="tag-row">
                  {p.stack.map((s) => (
                    <span key={s} className="tag">
                      {s}
                    </span>
                  ))}
                </div>
                {p.url && (
                  <div style={{ marginTop: 6 }}>
                    <a
                      className="text-link"
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t('projects.open')}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
