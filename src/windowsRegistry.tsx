import type { JSX } from 'react';
import type { WindowDefinition, WindowId } from './types';
import { ICONS } from './icons';
import AboutWindow from './components/windows/AboutWindow';
import ExperienceWindow from './components/windows/ExperienceWindow';
import ProjectsWindow from './components/windows/ProjectsWindow';
import CVWindow from './components/windows/CVWindow';
import ContactWindow from './components/windows/ContactWindow';
import IEWindow from './components/windows/IEWindow';
import RecycleBinWindow from './components/windows/RecycleBinWindow';

export const WINDOW_DEFS: WindowDefinition[] = [
  {
    id: 'about',
    titleKey: 'window.about',
    icon: ICONS.user,
    defaultSize: { width: 620, height: 420 },
    onDesktop: true,
  },
  {
    id: 'experience',
    titleKey: 'window.experience',
    icon: ICONS.briefcase,
    defaultSize: { width: 600, height: 480 },
    onDesktop: true,
  },
  {
    id: 'projects',
    titleKey: 'window.projects',
    icon: ICONS.folder,
    defaultSize: { width: 640, height: 500 },
    onDesktop: true,
  },
  {
    id: 'cv',
    titleKey: 'window.cv',
    icon: ICONS.documents,
    defaultSize: { width: 640, height: 440 },
    onDesktop: true,
  },
  {
    id: 'contact',
    titleKey: 'window.contact',
    icon: ICONS.mail,
    defaultSize: { width: 480, height: 420 },
    onDesktop: true,
  },
  {
    id: 'ie',
    titleKey: 'window.ie',
    icon: ICONS.ie,
    defaultSize: { width: 720, height: 520 },
    onDesktop: true,
  },
  {
    id: 'recycle',
    titleKey: 'window.recycle',
    icon: ICONS.recycle,
    defaultSize: { width: 460, height: 320 },
    onDesktop: true,
    inStartMenu: false,
  },
];

const CONTENT: Record<WindowId, () => JSX.Element> = {
  about: AboutWindow,
  experience: ExperienceWindow,
  projects: ProjectsWindow,
  cv: CVWindow,
  contact: ContactWindow,
  ie: IEWindow,
  recycle: RecycleBinWindow,
};

export function renderWindowContent(id: WindowId) {
  const C = CONTENT[id];
  return <C />;
}
