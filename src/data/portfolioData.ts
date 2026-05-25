import type { Lang } from '../i18n/types';

/**
 * Bilingual portfolio data sourced from the user's CV (May 2026).
 * Each translatable field uses a `{ tr, en }` pair; helpers below resolve
 * to the active language.
 */

interface Bi {
  tr: string;
  en: string;
}

interface ProfileSource {
  name: string;
  title: Bi;
  shortBio: Bi;
  email: string;
  phone: string;
  location: Bi;
}

interface ExperienceSource {
  company: string;
  role: Bi;
  start: string;
  endTr: string;
  endEn: string;
  location: Bi;
  description: Bi;
  stack: string[];
  url?: string;
}

interface ProjectSource {
  name: string;
  tagline: Bi;
  description: Bi;
  stack: string[];
  url?: string;
  emoji: string;
}

/** Single source of truth for the portrait used on the About page and
 *  Start-menu header. Prefixed with Vite's BASE_URL so subpath deploys
 *  (e.g. /portfolio/) resolve the file correctly. */
export const PROFILE_PHOTO = `${import.meta.env.BASE_URL}assets/me/profile.jpg`;

const PROFILE_SRC: ProfileSource = {
  name: 'Ergül Ferik',
  title: { tr: 'Full-Stack Developer', en: 'Full-Stack Developer' },
  shortBio: {
    tr: 'Manisa Celal Bayar Üniversitesi Bilgisayar Mühendisliği mezunu, modern frontend mimarileri ve ölçeklenebilir full-stack sistemleri üzerine çalışan bir geliştiriciyim.',
    en: 'Computer Engineering graduate from Manisa Celal Bayar University, working on modern frontend architectures and scalable full-stack systems.',
  },
  email: 'eng.ergulferik@gmail.com',
  phone: '+90 541 882 88 72',
  location: { tr: 'Urla / İzmir, Türkiye', en: 'Urla / İzmir, Türkiye' },
};

const ABOUT_LONG: Bi = {
  tr: `Merhaba, ben <strong>Ergül Ferik</strong>. 2024 yılında <strong>Manisa Celal Bayar Üniversitesi Bilgisayar Mühendisliği (İngilizce)</strong> bölümünden <strong>3.16</strong> ortalama ile mezun oldum.<br><br>Modern frontend mimarilerine odaklanan <strong>full-stack</strong> geliştirme alanında deneyim sahibiyim. <strong>Angular, React, React Native, Ionic, TypeScript/JavaScript, HTML/CSS, RxJS ve NgRx</strong> ile ölçeklenebilir UI mimarileri geliştiriyorum. Backend tarafında <strong>Node.js (NestJS, Express)</strong>, <strong>Python</strong>, <strong>C#</strong> ve <strong>.NET/ABP Framework</strong> kullanarak RESTful API'ler ve mikroservis tabanlı sistemler üzerinde çalıştım. <strong>Docker, RabbitMQ ve caching</strong> stratejileri konusunda deneyimliyim; ayrıca <strong>npm</strong> üzerinden yeniden kullanılabilir kütüphaneler geliştirip <strong>Playwright</strong> ile uçtan uca test otomasyonlarını <strong>CI/CD</strong> pipeline'larına entegre ettim.<br><br>Şu anda <strong>Efsora</strong>'da Full-Stack Developer ve QA Engineer olarak çalışıyorum. Daha öncesinde <strong>Kerzz POS</strong>, <strong>2Ag Yazılım Hizmetleri</strong> ve <strong>İthinka Yazılım Danışmanlık Hizmetleri</strong>'nde görev aldım.<br><br><strong>Dil:</strong> Türkçe (anadil), İngilizce (Listening/Reading C1, Writing/Speaking B2).`,
  en: `Hello, I'm <strong>Ergül Ferik</strong>. I graduated from <strong>Manisa Celal Bayar University, Computer Engineering (English)</strong> in 2024 with a GPA of <strong>3.16</strong>.<br><br>I am a <strong>full-stack</strong> developer focused on modern frontend architectures. I build scalable UI architectures with <strong>Angular, React, React Native, Ionic, TypeScript/JavaScript, HTML/CSS, RxJS and NgRx</strong>. On the backend I have worked with <strong>Node.js (NestJS, Express)</strong>, <strong>Python</strong>, <strong>C#</strong> and <strong>.NET/ABP Framework</strong>, building RESTful APIs and microservice-oriented systems. I am experienced with <strong>Docker, RabbitMQ and caching</strong> strategies, ship reusable <strong>npm</strong> libraries, and integrate <strong>Playwright</strong> end-to-end test automation into <strong>CI/CD</strong> pipelines.<br><br>I am currently a Full-Stack Developer and QA Engineer at <strong>Efsora</strong>. Previously I worked at <strong>Kerzz POS</strong>, <strong>2Ag Yazılım Hizmetleri</strong> and <strong>İthinka Yazılım Danışmanlık Hizmetleri</strong>.<br><br><strong>Languages:</strong> Turkish (native), English (Listening/Reading C1, Writing/Speaking B2).`,
};

const EXPERIENCES_SRC: ExperienceSource[] = [
  {
    company: 'Efsora',
    role: { tr: 'Full-Stack Developer', en: 'Full-Stack Developer' },
    start: '01.2026',
    endTr: 'Halen',
    endEn: 'Present',
    location: { tr: 'İzmir, Türkiye', en: 'İzmir, Türkiye' },
    description: {
      tr: "Full-Stack Developer ve QA Engineer olarak clean architecture prensipleri (Functional Core / Imperative Shell dahil) ile çalışıyorum. Frontend tarafında Hooks, Context API ve state management yaklaşımlarıyla modüler ve yeniden kullanılabilir bileşen mimarisine sahip ölçeklenebilir React uygulamaları geliştiriyorum. Backend tarafında Node.js (Express) ve Python ile RESTful ve event-driven servisler tasarlayarak katmanlı mimari ve API orkestrasyonu uyguluyorum. MongoDB, MySQL ve PostgreSQL üzerinde optimize şema tasarımı ve sorgu performansı ile veri yönetimi sağlıyorum. QA süreçlerinde Playwright ile uçtan uca test otomasyonları geliştirip CI/CD pipeline'larına entegre ediyorum. Ayrıca CI/CD pipeline tasarımı ve bakımı ile Docker tabanlı containerization ve ortam standardizasyonu konularında aktif rol alıyorum.",
      en: 'Working as a Full-Stack Developer and QA Engineer, applying clean architecture principles including Functional Core / Imperative Shell. On the frontend, developing scalable React applications using Hooks, Context API, and state management patterns with a strong focus on modular and reusable component architecture. On the backend, building RESTful and event-driven services with Node.js (Express) and Python, implementing layered architectures and API orchestration. Managing data persistence across MongoDB, MySQL, and PostgreSQL with optimized schema design and query performance tuning. Implementing automated QA workflows using Playwright for end-to-end testing, integrated directly into CI/CD pipelines. Additionally contributing to CI/CD pipeline design and maintenance and utilizing Docker for containerization, environment standardization, and service orchestration.',
    },
    stack: [
      'React',
      'Hooks',
      'Context API',
      'Node.js',
      'Express',
      'Python',
      'MongoDB',
      'MySQL',
      'PostgreSQL',
      'Playwright',
      'CI/CD',
      'Docker',
    ],
  },
  {
    company: 'Kerzz POS',
    role: { tr: 'Full-Stack Developer', en: 'Full-Stack Developer' },
    start: '10.2024',
    endTr: '09.2025',
    endEn: '09.2025',
    location: { tr: 'İzmir, Türkiye', en: 'İzmir, Türkiye' },
    description: {
      tr: "Angular, Ionic ve React Native kullanarak web ve mobil uygulamalar geliştirdim. Şirketin ana ürünü olan Orwi uygulamasının cross-platform (web/mobil) geliştirilmesinde aktif rol aldım. NgRx, RxJS, REST API, WebSocket, frontend caching, veri tablosu çözümleri (DevExtreme, AG Grid) ve responsive design konularında çalıştım. İstanbul Büyükşehir Belediyesi Beltur, BigChefs ve Numnum gibi büyük işletmeler için çözümler ürettim.",
      en: 'Developed web and mobile applications using Angular, Ionic, and React Native. Contributed to the Orwi app with cross-platform (web/mobile) development. Worked with NgRx, RxJS, REST APIs, WebSocket, frontend caching, data tables (DevExtreme, AG Grid), and responsive design. Delivered solutions for clients including Beltur (İBB), BigChefs, and Numnum.',
    },
    stack: ['Angular', 'Ionic', 'React Native', 'NgRx', 'RxJS', 'REST API', 'WebSocket', 'DevExtreme', 'AG Grid'],
    url: 'https://www.kerzzpos.com/',
  },
  {
    company: '2Ag Yazılım Hizmetleri',
    role: { tr: 'Frontend Developer', en: 'Frontend Developer' },
    start: '02.2024',
    endTr: '10.2024',
    endEn: '10.2024',
    location: { tr: 'Manisa, Türkiye', en: 'Manisa, Türkiye' },
    description: {
      tr: "2Ag Yazılım Hizmetleri'ndeki gönüllü stajım sonrasında AR-GE ekibinde Yazılım Uzmanı olarak çalışmaya başladım. HTML, CSS, JavaScript, Angular, DevExtreme, RxJS, C#, ABP Framework, Docker, RabbitMQ ve Redis teknolojileriyle aktif olarak çalıştım. Frontend tarafında responsive UI bileşenleri, dinamik modüller ve npm kütüphaneleri geliştirdim, REST API entegrasyonları yaptım. Backend tarafında ise veritabanı tasarımı, mikroservis mimarisi ve API entegrasyon süreçlerine katkı sağladım.",
      en: 'Started as a Software Specialist in the R&D team at 2Ag Software Services after a voluntary internship. Worked with Angular, C#, ABP Framework, Docker, RabbitMQ, and Redis; developed responsive UI components, dynamic modules, and npm libraries, integrated REST APIs, and contributed to database design, microservices architecture, and backend integrations.',
    },
    stack: ['Angular', 'C#', 'ABP Framework', 'Docker', 'RabbitMQ', 'Redis', 'DevExtreme', 'RxJS'],
    url: 'https://www.2ag.com.tr',
  },
  {
    company: '2Ag Yazılım Hizmetleri',
    role: { tr: 'Yazılım Geliştirici Stajyeri', en: 'Software Developer Intern' },
    start: '08.2023',
    endTr: '01.2024',
    endEn: '01.2024',
    location: { tr: 'Manisa, Türkiye', en: 'Manisa, Türkiye' },
    description: {
      tr: "2Ag Yazılım Hizmetleri'nde yaptığım gönüllü staj sürecinde HTML, CSS, JavaScript, Angular, DevExtreme, RxJS, C#, ABP Framework, Docker, RabbitMQ ve RedisInsight teknolojileriyle çalıştım. Frontend tarafında responsive arayüzler, dinamik componentler, npm kütüphaneleri ve REST API entegrasyonları geliştirdim. Backend tarafında veritabanı tasarımı, mikroservis mimarisi ve API entegrasyonlarında görev aldım. Ayrıca ekip çalışmasıyla birlikte yeni teknolojilerin ve mimari yapıların araştırılması ve geliştirilmesine katkı sağladım.",
      en: 'During my voluntary internship at 2Ag Software Services, I worked with Angular, C#, ABP Framework, Docker, RabbitMQ, and Redis; developed responsive UI/UX components, dynamic modules, and npm libraries, integrated REST APIs, and contributed to database design, microservices architecture, and backend integrations while researching and improving architectural models.',
    },
    stack: ['Angular', 'C#', 'ABP Framework', 'Docker', 'RabbitMQ', 'RedisInsight', 'DevExtreme', 'RxJS'],
    url: 'https://www.2ag.com.tr',
  },
  {
    company: 'İthinka Yazılım Danışmanlık Hizmetleri',
    role: { tr: 'Yazılım Geliştirici Stajyeri', en: 'Software Developer Intern' },
    start: '07.2023',
    endTr: '09.2023',
    endEn: '09.2023',
    location: { tr: 'Bursa, Türkiye', en: 'Bursa, Türkiye' },
    description: {
      tr: 'Web mimarileri hakkında araştırma konularında görev aldım. Web üzerinde kullanılan teknolojiler ve bu teknolojiler kullanılarak oluşturulabilecek mimarilerin araştırılması ve yazılım geliştirici ekibi ile birlikte bu araştırılan mimarilerin uygulanmasında yer aldım.',
      en: 'I was responsible for researching web architectures. My duties included researching technologies used on the web and the architectures that can be created using these technologies, and working with the software development team to implement these researched architectures.',
    },
    stack: ['Web Architectures', 'HTML', 'CSS', 'JavaScript', 'Angular'],
    url: 'https://ithinka.com/',
  },
];

const PROJECTS_SRC: ProjectSource[] = [
  {
    name: 'Hyundai Work Tracer',
    tagline: { tr: 'İşçi takip uygulaması', en: 'Worker tracking app' },
    description: {
      tr: 'Hyundai Elevator (İzmir) için çalışanların giriş-çıkış ve konum bilgilerinin takip edilebildiği bir işçi takip uygulaması geliştirdim. Kişisel verilerin korunmasına önem verilerek yalnızca yetkililerin denetimini kolaylaştırmak amacıyla tasarlanan uygulamanın ön yüzü Angular, arka yüzü NestJS ile geliştirilmiş olup, veritabanı olarak MongoDB kullanılmıştır.',
      en: "I developed a worker tracking application for Hyundai Elevator (İzmir) that allows monitoring of employees' check-in/check-out times and location information. Designed with a strong emphasis on personal data protection, the application facilitates supervision exclusively for authorized personnel. The frontend was developed using Angular, the backend with NestJS, and MongoDB was used as the database.",
    },
    stack: ['Angular', 'NestJS', 'MongoDB'],
    emoji: '🏗️',
  },
  {
    name: 'Beltur',
    tagline: { tr: 'İBB Beltur — vapur rezervasyon & ödeme', en: 'İBB Beltur — ferry booking & payment' },
    description: {
      tr: 'İstanbul Büyükşehir Belediyesi\'ne bağlı Beltur işletmeleri için vapur seyahatleri rezervasyonu, menü görüntüleme, Masterpass ile online ödeme ve duyuru yönetimi gibi özellikleri içeren kapsamlı bir mobil uygulamanın geliştirilmesinde görev aldım. Şirkete bağlı olarak uygulamanın sorumluluğunu üstlendim ve yönetimini sağladım. Uygulamanın ön yüzü Ionic kullanılarak geliştirildi.',
      en: 'I contributed to the development of a comprehensive mobile application for Beltur, a subsidiary of Istanbul Metropolitan Municipality, which included features such as ferry trip reservations, menu viewing, online payments via Masterpass, and announcement management. I assumed responsibility for the application on behalf of the company and oversaw its management. The frontend of the application was developed using Ionic.',
    },
    stack: ['Ionic', 'Angular', 'Masterpass', 'Mobile'],
    url: 'https://play.google.com/store/apps/details?id=app.orwi.beltur&hl=tr',
    emoji: '⛴️',
  },
  {
    name: 'BigChefs',
    tagline: { tr: 'Restoran zinciri mobil uygulaması', en: 'Restaurant chain mobile app' },
    description: {
      tr: "Türkiye'nin önde gelen restoran zincirlerinden BigChefs için geliştirilen mobil uygulamanın yazım sürecinde proje sorumluluğunu ve yönetimini üstlendim. Menü görüntüleme, geri bildirim, kampanyalardan yararlanma ve sipariş oluşturma gibi özellikler sunan uygulamanın ön yüzü Ionic framework ile geliştirildi.",
      en: "I took on project responsibility and management during the development of a mobile application for BigChefs, one of Turkey's leading restaurant chains. The application, offering features such as menu browsing, feedback submission, campaign participation, and order creation, was developed using the Ionic framework for the frontend.",
    },
    stack: ['Ionic', 'Angular', 'Mobile'],
    url: 'https://play.google.com/store/apps/details?id=bigchefs.app&hl=tr',
    emoji: '🍽️',
  },
  {
    name: 'Laika',
    tagline: { tr: 'Kafe etkinlik ve biletleme', en: 'Café event & ticketing' },
    description: {
      tr: 'Laika adlı kafe için etkinliklerin yönetilebildiği, biletleme, menü görüntüleme ve rezervasyon işlemlerinin yapılabildiği bir web uygulaması geliştirdim. Ön yüz React, arka yüz NestJS ile geliştirildi; veritabanı olarak MongoDB kullanıldı.',
      en: 'I developed a web application for Laika café that enables event management, ticketing, menu viewing, and reservations. The frontend was developed using React, the backend with NestJS, and MongoDB was used as the database.',
    },
    stack: ['React', 'NestJS', 'MongoDB'],
    url: 'https://ergulferik.github.io/Laika-Web/',
    emoji: '🎟️',
  },
  {
    name: 'Angulogic — Sidebar',
    tagline: { tr: 'Angular sidebar bileşeni', en: 'Angular sidebar component' },
    description: {
      tr: '@angulogic/ng-sidebar, Angular uygulamaları için geliştirilen, dinamik, etkileşimli ve yüksek düzeyde özelleştirilebilir bir kenar çubuğu bileşenidir. Kullanıcı deneyimini geliştirmek amacıyla iç içe geçmiş menüler, arama fonksiyonelliği, favori yönetimi, tema değiştirme, duyarlı (responsive) görüntüleme modları ve yeniden boyutlandırılabilir / otomatik konumlandırılabilir yapı gibi gelişmiş özellikler sunmaktadır.',
      en: '@angulogic/ng-sidebar is a dynamic, interactive, and highly configurable Angular sidebar component designed to enhance navigation experiences. It offers advanced features such as nested menus, search functionality, favorites management, theme toggling, responsive view modes, and resizable/auto-position capabilities.',
    },
    stack: ['Angular', 'Npm', 'UI/UX', 'CSS'],
    url: 'https://github.com/skarahan35/angulogic',
    emoji: '🧭',
  },
  {
    name: 'Wave',
    tagline: { tr: 'Gerçek zamanlı fare takibi', en: 'Real-time mouse tracking' },
    description: {
      tr: 'Bu proje, web sayfası üzerindeki fare hareketlerini ve tıklamalarını gerçek zamanlı olarak takip eden bir sistem sunmaktadır. Backend için NestJS, frontend için Angular kullanılarak geliştirilmiş olan sistem, WebSocket protokolü aracılığıyla veri aktarımı yaparak kullanıcı arayüzünün anlık güncellenmesini sağlamaktadır.',
      en: 'This project provides a system that tracks mouse movements and clicks on a web page in real-time. Developed using NestJS for the backend and Angular for the frontend, the system ensures instant UI updates by transmitting data via the WebSocket protocol.',
    },
    stack: ['Angular', 'NestJS', 'WebSocket'],
    url: 'https://github.com/ergulferik/wave',
    emoji: '🌊',
  },
  {
    name: 'Spy',
    tagline: { tr: 'Cross-platform kelime oyunu', en: 'Cross-platform word game' },
    description: {
      tr: '"Spy", Ionic (Angular) framework kullanılarak geliştirilmiş cross-platform (web/mobil) bir kelime oyunudur. Oyunda gerçek zamanlı akış içerisinde oyunculara roller ve kelimeler atanır, bir kullanıcı rastgele "spy" olarak belirlenir. Uygulama; oyun oturumlarının bütünlüğünü koruyarak state yönetimi, rol dağıtımı ve sıra tabanlı etkileşimleri yönetir ve oyuncuların yapılandırılmış sorular üzerinden casusu tespit etmelerini sağlar.',
      en: '"Spy" is a cross-platform (web/mobile) word game developed using Ionic (Angular) framework, implementing real-time game flow where players are assigned roles and words, with one user randomly designated as the spy. The application manages state, role distribution, and turn-based interactions, enabling players to identify the spy through structured questioning while maintaining game session integrity.',
    },
    stack: ['Ionic', 'Angular', 'State Management', 'Web', 'Mobile'],
    url: 'https://ergulferik.github.io/spy/',
    emoji: '🕵️',
  },
  {
    name: 'DarkChicken — Angular UI Kit & Datatable',
    tagline: { tr: 'Angular UI ve Datatable paketi', en: 'Angular UI & Datatable package' },
    description: {
      tr: 'Angular tabanlı web uygulamalarında kullanılmak üzere hazır UI ve Datatable bileşenleri sunan bir npm paketi geliştirdim. Paket için geliştiricilerin kolayca faydalanabileceği bir web dokümantasyonu hazırladım.',
      en: 'I created an npm package that provides ready-to-use UI and Datatable elements for developers to use in web applications with Angular. I also prepared a web document for developers to use with the package.',
    },
    stack: ['Angular', 'Npm', 'UI kit', 'Datatable'],
    url: 'https://github.com/skarahan35/darkchicken',
    emoji: '🐔',
  },
  {
    name: 'DC Toast — Angular Toast Package',
    tagline: { tr: 'Angular toast bildirim paketi', en: 'Angular toast notification package' },
    description: {
      tr: 'Angular tabanlı web uygulamalarında kullanılmak üzere npm üzerinde yayınlanan bir toast paketi geliştirdim. Paket için geliştiricilerin kolayca faydalanabileceği bir web dokümantasyonu hazırladım.',
      en: 'I developed a toast package published on npm for developers to use in web applications with Angular. I also prepared a web document for developers to use with the package.',
    },
    stack: ['Angular', 'Npm', 'JavaScript'],
    url: 'https://www.npmjs.com/package/dc-toast-ng',
    emoji: '🍞',
  },
  {
    name: 'AllScan — Web Link Security Test',
    tagline: { tr: 'Bağlantı güvenliği Chrome eklentisi', en: 'Link safety Chrome extension' },
    description: {
      tr: 'Kullanıcıların gezindiği web sayfaları üzerinde bulunan sayfa bağlantılarını tarayıp sayfa bağlantısının güvenlik durumunu kullanıcıya gösteren bir Google Chrome eklentisi geliştirdim. Geliştirme sürecinde frontend için JavaScript, HTML, CSS; backend için Python, FastAPI ve BeautifulSoup teknolojilerini kullandım. Geliştirilen proje için kullanım ve tasarım dökümanı hazırladım.',
      en: 'I developed a Google Chrome extension that scans the page links on the web pages users browse and shows the security status of those links to the user. During the development process, I used JavaScript, HTML, CSS for the frontend; Python, FastAPI, and BeautifulSoup for the backend. I prepared usage and design documents for the developed project.',
    },
    stack: ['JavaScript', 'HTML', 'CSS', 'Python', 'FastAPI', 'BeautifulSoup'],
    url: 'https://github.com/ergulferik/All-Scan',
    emoji: '🛡️',
  },
  {
    name: 'Virtual Shelf Browser',
    tagline: { tr: 'Kütüphane yönetim uygulaması', en: 'Library management application' },
    description: {
      tr: 'Bir kütüphane içerisindeki kitapların kullanıcı yetkisine göre listelenmesini, alınmasını, iade edilmesini ve silinmesini sağlayan bir kütüphane yönetim uygulaması geliştirdim. Frontend tarafında Angular, HTML, CSS, JavaScript ve NGX; backend tarafında C#, ABP Framework ve MSSQL teknolojilerini kullandım. Kullanım ve tasarım için akademik döküman hazırladım.',
      en: 'I developed a library management application that allows listing, borrowing, returning, and deleting books in a library based on user authority. For this project, I used Angular, HTML, CSS, JavaScript, and NGX for the frontend; C#, ABP Framework, and MSSQL for the backend. I prepared an academic document for usage and design.',
    },
    stack: ['Angular', 'NGX', 'C#', 'ABP Framework', 'MSSQL'],
    url: 'https://github.com/ergulferik/Virtual-Shelf-Browser',
    emoji: '📚',
  },
];

export const socialLinks = [
  { label: 'GitHub', url: 'https://github.com/ergulferik' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/ergül-ferik-57a79a252/' },
  { label: 'Portfolio', url: 'https://ergulferik.github.io/Portfolio-Website/' },
  { label: 'Email', url: 'mailto:eng.ergulferik@gmail.com' },
];

/* ---------- Public, lang-resolved accessors ---------- */

export interface Profile {
  name: string;
  title: string;
  shortBio: string;
  email: string;
  phone: string;
  location: string;
}

export interface Experience {
  company: string;
  role: string;
  start: string;
  end: string;
  location: string;
  description: string;
  stack: string[];
  url?: string;
}

export interface Project {
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  url?: string;
  emoji: string;
}

export function getProfile(lang: Lang): Profile {
  return {
    name: PROFILE_SRC.name,
    title: PROFILE_SRC.title[lang],
    shortBio: PROFILE_SRC.shortBio[lang],
    email: PROFILE_SRC.email,
    phone: PROFILE_SRC.phone,
    location: PROFILE_SRC.location[lang],
  };
}

export function getAboutLong(lang: Lang): string {
  return ABOUT_LONG[lang];
}

export function getExperiences(lang: Lang): Experience[] {
  return EXPERIENCES_SRC.map((e) => ({
    company: e.company,
    role: e.role[lang],
    start: e.start,
    end: lang === 'tr' ? e.endTr : e.endEn,
    location: e.location[lang],
    description: e.description[lang],
    stack: e.stack,
    url: e.url,
  }));
}

export function getProjects(lang: Lang): Project[] {
  return PROJECTS_SRC.map((p) => ({
    name: p.name,
    tagline: p.tagline[lang],
    description: p.description[lang],
    stack: p.stack,
    url: p.url,
    emoji: p.emoji,
  }));
}

