import { getAboutLong, getProfile, PROFILE_PHOTO } from '../../data/portfolioData';
import { useLang } from '../../i18n/LanguageContext';
import { useLauncher } from '../../launcherContext';

export default function AboutWindow() {
  const { lang, t } = useLang();
  const { launch } = useLauncher();
  const profile = getProfile(lang);
  const aboutLong = getAboutLong(lang);

  const navLink = (e: React.MouseEvent, target: 'cv' | 'projects') => {
    e.preventDefault();
    launch(target);
  };
  return (
    <div className="explorer">
      <aside className="explorer-sidebar">
        <div className="sidebar-panel">
          <div className="sidebar-panel-header">{t('about.sidebar.info')}</div>
          <div className="sidebar-panel-body">
            <div>
              <strong>{t('about.fields.name')}:</strong> {profile.name}
            </div>
            <div>
              <strong>{t('about.fields.title')}:</strong> {profile.title}
            </div>
            <div>
              <strong>{t('about.fields.location')}:</strong> {profile.location}
            </div>
            <div>
              <strong>{t('about.fields.email')}:</strong> {profile.email}
            </div>
          </div>
        </div>
        <div className="sidebar-panel">
          <div className="sidebar-panel-header">
            {t('about.sidebar.otherPlaces')}
          </div>
          <div className="sidebar-panel-body">
            <a href="#" onClick={(e) => navLink(e, 'cv')}>
              {t('about.link.myDocs')}
            </a>
            <a href="#" onClick={(e) => navLink(e, 'projects')}>
              {t('about.link.myComputer')}
            </a>
          </div>
        </div>
      </aside>
      <main className="explorer-main">
        <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
          <div
            style={{
              width: 84,
              height: 84,
              background: '#e0eaf9',
              border: '1px solid #91a7b4',
              borderRadius: 4,
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <img
              src={PROFILE_PHOTO}
              alt={profile.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 20%',
                display: 'block',
              }}
            />
          </div>
          <div>
            <div className="page-title">{profile.name}</div>
            <div className="page-subtitle">{profile.title}</div>
          </div>
        </div>
        <hr className="xp-rule" />
        <p
          style={{ lineHeight: 1.6, fontSize: 12 }}
          dangerouslySetInnerHTML={{ __html: aboutLong.trim() }}
        />
      </main>
    </div>
  );
}
