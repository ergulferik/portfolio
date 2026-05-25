import { useState } from 'react';
import { getProfile } from '../../data/portfolioData';
import { useLang } from '../../i18n/LanguageContext';

export default function ContactWindow() {
  const { lang, t } = useLang();
  const profile = getProfile(lang);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="window-body padded">
        <div className="page-title">{t('contact.queued.title')}</div>
        <div className="page-subtitle">
          {t('contact.queued.body', { email: profile.email })}
        </div>
        <hr className="xp-rule" />
        <button onClick={() => setSubmitted(false)}>
          {t('contact.newMessage')}
        </button>
      </div>
    );
  }

  return (
    <div className="window-body padded">
      <div className="page-title">{t('contact.title')}</div>
      <div className="page-subtitle">{t('contact.subtitle')}</div>
      <hr className="xp-rule" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <div className="contact-row">
          <label htmlFor="from">{t('contact.from')}</label>
          <input id="from" placeholder="ad@example.com" required />
        </div>
        <div className="contact-row">
          <label htmlFor="to">{t('contact.to')}</label>
          <input id="to" value={profile.email} readOnly />
        </div>
        <div className="contact-row">
          <label htmlFor="subj">{t('contact.subject')}</label>
          <input
            id="subj"
            placeholder={t('contact.placeholder.subject')}
            required
          />
        </div>
        <div className="contact-row">
          <label htmlFor="msg" style={{ alignSelf: 'flex-start' }}>
            {t('contact.message')}
          </label>
          <textarea
            id="msg"
            placeholder={t('contact.placeholder.message')}
            required
            style={{ minHeight: 90, fontFamily: 'inherit', fontSize: 12 }}
          />
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button type="reset">{t('contact.cancel')}</button>
          <button type="submit">{t('contact.send')}</button>
        </div>
      </form>
    </div>
  );
}
