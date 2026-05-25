import { ICONS } from '../../icons';
import { useLang } from '../../i18n/LanguageContext';

export default function RecycleBinWindow() {
  const { t } = useLang();
  return (
    <>
      <div className="window-menubar">
        <span>{t('menu.file')}</span>
        <span>{t('menu.edit')}</span>
        <span>{t('menu.view')}</span>
        <span>{t('menu.help')}</span>
      </div>
      <div className="window-body padded">
        <div className="page-title">{t('recycle.title')}</div>
        <div className="page-subtitle">{t('recycle.subtitle')}</div>
        <hr className="xp-rule" />
        <div style={{ textAlign: 'center', padding: 40, color: '#555' }}>
          <img src={ICONS.recycle} alt="" style={{ width: 96, height: 96 }} />
          <div style={{ marginTop: 8 }}>{t('recycle.empty')}</div>
        </div>
      </div>
    </>
  );
}
