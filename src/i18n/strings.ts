import type { Lang } from './types';

/**
 * Flat keyed translation dictionary. Values are strings or string templates.
 * Add new keys here; both `tr` and `en` must have the same keys.
 */
const TRANSLATIONS = {
  // Window titles
  'window.about': { tr: 'Hakkımda', en: 'About Me' },
  'window.experience': { tr: 'Çalışma Geçmişi', en: 'Work Experience' },
  'window.projects': { tr: 'Projeler', en: 'Projects' },
  'window.cv': { tr: 'Belgelerim', en: 'My Documents' },
  'window.contact': { tr: 'İletişim', en: 'Contact' },
  'window.ie': { tr: 'Internet Explorer', en: 'Internet Explorer' },
  'window.recycle': { tr: 'Geri Dönüşüm Kutusu', en: 'Recycle Bin' },

  // Menubar
  'menu.file': { tr: 'Dosya', en: 'File' },
  'menu.edit': { tr: 'Düzen', en: 'Edit' },
  'menu.view': { tr: 'Görünüm', en: 'View' },
  'menu.favorites': { tr: 'Sık Kullanılanlar', en: 'Favorites' },
  'menu.tools': { tr: 'Araçlar', en: 'Tools' },
  'menu.help': { tr: 'Yardım', en: 'Help' },

  // Toolbar
  'toolbar.back': { tr: '← Geri', en: '← Back' },
  'toolbar.forward': { tr: 'İleri', en: 'Forward' },
  'toolbar.up': { tr: '↑ Üst', en: '↑ Up' },
  'toolbar.refresh': { tr: 'Yenile', en: 'Refresh' },
  'toolbar.home': { tr: 'Ana Sayfa', en: 'Home' },
  'toolbar.viewDetail': { tr: 'Görünüm: Detaylı', en: 'View: Details' },

  // About
  'about.fields.name': { tr: 'Ad', en: 'Name' },
  'about.fields.title': { tr: 'Ünvan', en: 'Title' },
  'about.fields.location': { tr: 'Konum', en: 'Location' },
  'about.fields.email': { tr: 'E-posta', en: 'Email' },
  'about.sidebar.info': { tr: 'Bilgiler', en: 'Information' },
  'about.sidebar.otherPlaces': { tr: 'Diğer Yerler', en: 'Other Places' },
  'about.link.myDocs': { tr: 'Belgelerim', en: 'My Documents' },
  'about.link.myComputer': { tr: 'Projelerim', en: 'My Projects' },

  // Experience
  'experience.title': { tr: 'Çalışma Geçmişi', en: 'Work Experience' },
  'experience.subtitle': {
    tr: 'Profesyonel deneyimlerim ve görev aldığım pozisyonlar.',
    en: 'My professional experience and the roles I have taken on.',
  },
  'experience.statusRecord': { tr: 'kayıt', en: 'records' },
  'experience.statusComputer': { tr: 'Bilgisayarım', en: 'My Computer' },

  // Projects
  'projects.title': { tr: 'Projeler', en: 'Projects' },
  'projects.subtitle': {
    tr: 'Üzerinde çalıştığım veya tamamladığım seçili işler.',
    en: 'Selected work I have built or contributed to.',
  },
  'projects.open': { tr: 'Projeyi aç →', en: 'Open project →' },

  // CV / Documents
  'cv.title': { tr: 'My Documents', en: 'My Documents' },
  'cv.subtitle': {
    tr: '{name} — CV ve belgeler',
    en: '{name} — CV and documents',
  },
  'cv.fileTasks': {
    tr: 'Dosya ve Klasör Görevleri',
    en: 'File and Folder Tasks',
  },
  'cv.fileTask.downloadDoc': {
    tr: '{doc} dosyasını indir',
    en: 'Download {doc}',
  },
  'cv.file.cvTr': { tr: 'Türkçe CV', en: 'Turkish CV' },
  'cv.file.cvEn': { tr: 'İngilizce CV', en: 'English CV' },
  'cv.fileTask.email': {
    tr: 'Bu dosyayı e-postayla gönder',
    en: 'E-mail this file',
  },
  'cv.details': { tr: 'Ayrıntılar', en: 'Details' },
  'cv.docType': {
    tr: 'Adobe Acrobat Belgesi',
    en: 'Adobe Acrobat Document',
  },
  'cv.note': {
    tr: 'Not: CV iki dilde de mevcut. Dosyayı tıklayarak veya sol paneldeki "İndir" bağlantısı ile istediğiniz sürümü kaydedebilirsiniz. Mevcut arayüz dili ile uyumlu kart vurgulanmıştır.',
    en: 'Note: The CV is available in both languages. Click a file or use the sidebar "Download" link to save the version you want. The card matching the current UI language is highlighted.',
  },

  // Contact
  'contact.title': { tr: 'İletişim', en: 'Contact' },
  'contact.subtitle': {
    tr: 'Bana mesaj bırak (placeholder form)',
    en: 'Drop me a message (placeholder form)',
  },
  'contact.from': { tr: 'Kimden:', en: 'From:' },
  'contact.to': { tr: 'Kime:', en: 'To:' },
  'contact.subject': { tr: 'Konu:', en: 'Subject:' },
  'contact.message': { tr: 'Mesaj:', en: 'Message:' },
  'contact.placeholder.subject': { tr: 'Merhaba!', en: 'Hello!' },
  'contact.placeholder.message': {
    tr: 'Mesajını yaz...',
    en: 'Type your message...',
  },
  'contact.cancel': { tr: 'İptal', en: 'Cancel' },
  'contact.send': { tr: 'Gönder', en: 'Send' },
  'contact.queued.title': {
    tr: 'Mesaj kuyruğa alındı',
    en: 'Message queued',
  },
  'contact.queued.body': {
    tr: 'Şu an gerçek bir mailer bağlı değil; bana doğrudan {email} adresinden ulaşabilirsin.',
    en: 'No real mailer is wired up yet; reach me directly at {email}.',
  },
  'contact.newMessage': { tr: 'Yeni mesaj', en: 'New message' },

  // IE
  'ie.welcome': { tr: 'Welcome, {name}!', en: 'Welcome, {name}!' },
  'ie.intro': {
    tr: 'Bu bir Internet Explorer simülasyonudur. Aşağıdaki linklerden birine tıklayarak gez.',
    en: 'This is an Internet Explorer simulation. Click any link below to browse.',
  },
  'ie.socialHeading': { tr: 'Sosyal & Bağlantılar', en: 'Social & Links' },
  'ie.bestViewed': {
    tr: '© {year} {name} — Best viewed in 1024×768.',
    en: '© {year} {name} — Best viewed in 1024×768.',
  },
  'ie.loading': { tr: 'Sayfa yükleniyor...', en: 'Loading page...' },
  'ie.askOpen': {
    tr: 'Bu bir simülasyon. Gerçek sayfayı yeni sekmede açmak ister misin?',
    en: 'This is a simulation. Open the real page in a new tab?',
  },
  'ie.goBack': { tr: '← Geri dön', en: '← Go back' },
  'ie.done': { tr: 'Bitti', en: 'Done' },
  'ie.address': { tr: 'Adres', en: 'Address' },
  'ie.go': { tr: 'Git', en: 'Go' },
  'ie.embedBadge': { tr: 'içeride aç', en: 'open inside' },
  'ie.embedBadgeHint': {
    tr: 'Bu site IE penceresinin içinde gömülü olarak açılabilir.',
    en: 'This site can be embedded inside the IE window.',
  },

  // Recycle
  'recycle.title': { tr: 'Recycle Bin', en: 'Recycle Bin' },
  'recycle.subtitle': {
    tr: 'Çöp kutusu şu anda boş.',
    en: 'The recycle bin is currently empty.',
  },
  'recycle.empty': {
    tr: 'Burada gösterilecek bir şey yok.',
    en: 'Nothing to show here.',
  },

  // Start menu
  'start.internetTitle': { tr: 'İnternet', en: 'Internet' },
  'start.internetSub': { tr: 'Internet Explorer', en: 'Internet Explorer' },
  'start.emailTitle': { tr: 'E-posta', en: 'E-mail' },
  'start.emailSub': {
    tr: 'İletişim formu',
    en: 'Contact form',
  },
  'start.switchUser': { tr: 'Kullanıcı Değiştir', en: 'Switch User' },
  'logOff.title': {
    tr: 'Kullanıcı Değiştir',
    en: 'Switch User',
  },
  'logOff.prompt': {
    tr: 'Devam etmek istediğiniz portfolyo deneyimini seçin.',
    en: 'Choose which portfolio session you want to continue with.',
  },
  'logOff.thisTitle': {
    tr: 'Bu oturum (XP)',
    en: 'This session (XP)',
  },
  'logOff.thisDesc': {
    tr: 'Şu an gezdiğiniz Windows XP temalı portfolyo.',
    en: 'The Windows XP-themed portfolio you are currently on.',
  },
  'logOff.otherTitle': {
    tr: 'Diğer Portfolyo',
    en: 'Other Portfolio',
  },
  'logOff.otherDesc': {
    tr: 'Klasik portfolyo sayfam — yeni sekmede açılır.',
    en: 'My classic portfolio page — opens in a new tab.',
  },
  'logOff.cancel': { tr: 'İptal', en: 'Cancel' },
  'start.label': { tr: 'başlat', en: 'start' },

  // Context menu (desktop)
  'ctx.view': { tr: 'Görünüm', en: 'View' },
  'ctx.view.large': { tr: 'Büyük Simgeler', en: 'Large Icons' },
  'ctx.view.small': { tr: 'Küçük Simgeler', en: 'Small Icons' },
  'ctx.arrange': { tr: 'Simgeleri Düzenle', en: 'Arrange Icons By' },
  'ctx.arrange.name': { tr: 'Ada Göre', en: 'Name' },
  'ctx.arrange.type': { tr: 'Türe Göre', en: 'Type' },
  'ctx.arrange.alignGrid': { tr: 'Izgaraya Hizala', en: 'Align to Grid' },
  'ctx.arrange.autoArrange': { tr: 'Otomatik Düzenle', en: 'Auto Arrange' },
  'ctx.refresh': { tr: 'Yenile', en: 'Refresh' },
  'ctx.paste': { tr: 'Yapıştır', en: 'Paste' },
  'ctx.pasteShortcut': { tr: 'Kısayolu Yapıştır', en: 'Paste Shortcut' },
  'ctx.new': { tr: 'Yeni', en: 'New' },
  'ctx.new.folder': { tr: 'Klasör', en: 'Folder' },
  'ctx.new.shortcut': { tr: 'Kısayol', en: 'Shortcut' },
  'ctx.new.textDoc': { tr: 'Metin Belgesi', en: 'Text Document' },
  'ctx.properties': { tr: 'Özellikler', en: 'Properties' },

  // Context menu (icon)
  'ctx.open': { tr: 'Aç', en: 'Open' },
  'ctx.rename': { tr: 'Yeniden Adlandır', en: 'Rename' },
  'ctx.delete': { tr: 'Sil', en: 'Delete' },
  'ctx.cut': { tr: 'Kes', en: 'Cut' },
  'ctx.copy': { tr: 'Kopyala', en: 'Copy' },
  'ctx.createShortcut': { tr: 'Kısayol Oluştur', en: 'Create Shortcut' },
} as const;

export type TKey = keyof typeof TRANSLATIONS;

export function translate(
  key: TKey,
  lang: Lang,
  vars?: Record<string, string | number>,
): string {
  const entry = TRANSLATIONS[key];
  let value: string = entry[lang];
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      value = value.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
    }
  }
  return value;
}
