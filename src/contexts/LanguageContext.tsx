import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { translations, TranslationKey } from '@/lib/translations';

type Lang = 'id' | 'en';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem('lang');
    return saved === 'en' ? 'en' : 'id';
  });

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem('lang', l);
  }, []);

  // 🔥 SAFE t FUNCTION (anti crash)
  const t = useCallback((key: TranslationKey) => {
    try {
      return translations?.[lang]?.[key] || key;
    } catch {
      return key;
    }
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// 🔥 GLOBAL SAFE HOOK (FIX SEMUA PAGE)
export function useLanguage() {
  const ctx = useContext(LanguageContext);

  if (!ctx) {
    return {
      lang: 'id' as const,
      setLang: () => {},
      t: (key: TranslationKey) => key,
    };
  }

  return ctx;
}
