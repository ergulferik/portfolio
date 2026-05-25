# Ergul Ferik — Portfolio

A Windows XP themed personal portfolio. Built as a single-page React app that
emulates the XP desktop: draggable windows, start menu, taskbar, system tray,
right-click context menus, and an Internet Explorer simulation.

**Live:** [ergulferik.github.io/portfolio](https://ergulferik.github.io/portfolio/)

## Features

- **Bilingual (TR / EN)** — language auto-detected from the browser; a first-
  visit welcome modal lets the user confirm, and the choice is remembered in
  `localStorage`. Toggle anytime from the taskbar.
- **Windowed UI** — open, drag, minimize, maximize, restore, close. State
  managed by a reducer in `useWindowManager`.
- **Desktop icons** — drag to move (positions persisted), right-click for an
  XP-style context menu, snap-to-grid toggle, single-tap to open on touch.
- **Start menu** — header with avatar, programs list, "Switch User" footer
  that opens a session-picker dialog (this XP portfolio vs. the classic one).
- **Bundled CV** — Turkish and English CVs are embedded as base64 PDFs and
  downloadable from the *My Documents* window.
- **Embedded portfolio** — the classic portfolio is iframed inside the IE
  window (whitelist of embeddable origins; everything else falls through to
  an "open in new tab" stub).
- **Mobile-aware** — at narrow viewports, windows fill the screen, the
  explorer sidebar collapses, the taskbar goes icon-only, and the start menu
  expands to an overlay. Uses `dvh` + `env(safe-area-inset-bottom)` so the
  taskbar stays visible above mobile browser chrome and the iOS home
  indicator.

## Tech stack

- **React 18** + **TypeScript** (strict)
- **Vite 5** for dev server and build
- **xp.css** as the base XP chrome library, with substantial overrides in
  `src/styles/xp.css`
- No state-management library; React hooks + a small reducer
- Deployed to **GitHub Pages** via **GitHub Actions**

## Project structure

```
src/
  App.tsx                     # Top-level layout (Desktop + Taskbar + modals)
  windowsRegistry.tsx         # Window definitions + content map
  state/useWindowManager.ts   # Reducer for open/min/max/close/focus
  components/
    Desktop.tsx               # Wallpaper, icon grid, context menus
    DesktopIcon.tsx           # Per-icon: select, drag, double-click/tap
    Window.tsx                # Title bar, drag-to-move, resize, animations
    Taskbar.tsx               # Start button, task list, lang switch, clock
    StartMenu.tsx
    ContextMenu.tsx
    LanguageSelectModal.tsx   # First-visit welcome
    LogOffDialog.tsx          # "Switch User" session picker
    windows/                  # Per-window content
      AboutWindow.tsx
      ExperienceWindow.tsx
      ProjectsWindow.tsx
      CVWindow.tsx
      ContactWindow.tsx
      IEWindow.tsx
      RecycleBinWindow.tsx
  data/
    portfolioData.ts          # Bilingual profile, experience, projects, bio
    cvTr.ts, cvEn.ts          # Base64-encoded CV PDFs
  i18n/
    LanguageContext.tsx       # Lang detection + persistence
    strings.ts                # All UI strings (flat keys, TR + EN)
  icons.ts                    # Asset path helpers (BASE_URL-prefixed)
  styles/xp.css               # Desktop, taskbar, windows, modals, mobile
public/
  assets/                     # Icons, favicon, profile photo
```

## Local development

Requirements: Node 20+, npm.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check then production build into dist/
npm run preview  # serve the build locally
```

## Deployment

`main` branch pushes trigger `.github/workflows/deploy.yml`, which runs
`npm ci && npm run build`, then publishes `dist/` to GitHub Pages.

`vite.config.ts` sets `base: '/portfolio/'` for the subpath deploy at
`ergulferik.github.io/portfolio/`. If forking to a different repo / domain,
update that value (use `/` for root domains or user-site repos).

## License

Personal portfolio code. Profile photo, CV PDFs, and project descriptions
are the author's own and not licensed for reuse. The surrounding XP-emulation
code is provided as-is for reference.
