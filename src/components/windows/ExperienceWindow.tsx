import { getExperiences } from '../../data/portfolioData';
import { useLang } from '../../i18n/LanguageContext';

export default function ExperienceWindow() {
  const { lang, t } = useLang();
  const experiences = getExperiences(lang);
  return (
    <>
      <div className="window-menubar">
        <span>{t('menu.file')}</span>
        <span>{t('menu.edit')}</span>
        <span>{t('menu.view')}</span>
        <span>{t('menu.help')}</span>
      </div>
      <div className="window-toolbar">
        <button className="tb-btn" disabled>{t('toolbar.back')}</button>
        <button className="tb-btn" disabled>
          {t('toolbar.forward')}
        </button>
        <button className="tb-btn" disabled>{t('toolbar.up')}</button>
        <span style={{ marginLeft: 'auto' }}>{t('toolbar.viewDetail')}</span>
      </div>
      <div className="window-body padded">
        <div className="page-title">{t('experience.title')}</div>
        <div className="page-subtitle">{t('experience.subtitle')}</div>
        <hr className="xp-rule" />
        {experiences.map((e, i) => (
          <div className="experience-item" key={i}>
            <div className="exp-role">
              {e.role} • {e.company}
            </div>
            <div className="exp-meta">
              {e.start} – {e.end} · {e.location}
            </div>
            <div className="exp-desc">{e.description}</div>
            <div className="tag-row">
              {e.stack.map((s) => (
                <span key={s} className="tag">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="status-bar">
        <p className="status-bar-field">
          {experiences.length} {t('experience.statusRecord')}
        </p>
        <p className="status-bar-field">{t('experience.statusComputer')}</p>
      </div>
    </>
  );
}
