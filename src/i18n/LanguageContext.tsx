import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { translate, type TKey } from './strings';
import type { Lang } from './types';

interface LanguageContextValue {
  lang: Lang;
  /** True once the user has explicitly picked a language (persists across visits). */
  hasChosen: boolean;
  /** The lang inferred from the browser at load time — useful for pre-selecting the suggested option in the welcome modal. */
  browserLang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  t: (key: TKey, vars?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = 'ferik-portfolio-lang';

function readStored(): Lang | null {
  if (typeof window === 'undefined') return null;
  const s = window.localStorage.getItem(STORAGE_KEY);
  return s === 'tr' || s === 'en' ? s : null;
}

function detectBrowserLang(): Lang {
  if (typeof window === 'undefined') return 'en';
  const nav = window.navigator.language.slice(0, 2).toLowerCase();
  return nav === 'tr' ? 'tr' : 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = useState<Lang | null>(() => readStored());
  const browserLang = useMemo(() => detectBrowserLang(), []);
  const [lang, setLangState] = useState<Lang>(() => stored ?? browserLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    setStored(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* storage might be blocked; in-memory state still works for the session */
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === 'tr' ? 'en' : 'tr');
  }, [lang, setLang]);

  const t = useCallback(
    (key: TKey, vars?: Record<string, string | number>) =>
      translate(key, lang, vars),
    [lang],
  );

  const value = useMemo(
    () => ({
      lang,
      hasChosen: stored !== null,
      browserLang,
      setLang,
      toggleLang,
      t,
    }),
    [lang, stored, browserLang, setLang, toggleLang, t],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider');
  return ctx;
}
