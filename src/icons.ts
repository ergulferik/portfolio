const BASE = import.meta.env.BASE_URL;
const PNG = (n: string) => `${BASE}assets/icons/${n}.png`;

export const ICONS = {
  user: PNG('user'),
  briefcase: PNG('briefcase'),
  folder: PNG('folder'),
  documents: PNG('my-documents'),
  mail: PNG('mail'),
  ie: PNG('internet-explorer'),
  recycle: PNG('recycle-bin'),
  myComputer: PNG('my-computer'),
  help: PNG('help'),
  document: PNG('document'),
  trayVolume: PNG('tray-volume'),
  trayNetwork: PNG('tray-network'),
  startFlag: `${BASE}favicon.png`,
};
