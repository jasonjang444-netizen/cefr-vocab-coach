'use client';

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from 'react';

export type AppLanguage = 'en' | 'ko';

interface LanguageContextValue {
  language: AppLanguage;
  setLanguage: (language: AppLanguage) => void;
  mounted: boolean;
}

const STORAGE_KEY = 'cefr-vocab-coach-language';
const LANGUAGE_EVENT = 'cefr-vocab-coach-language-change';

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function getStoredLanguage(): AppLanguage {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const storedLanguage = window.localStorage.getItem(STORAGE_KEY);
  return storedLanguage === 'ko' ? 'ko' : 'en';
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === 'undefined') {
    return () => undefined;
  }

  const handleStorage = (event: StorageEvent) => {
    if (!event.key || event.key === STORAGE_KEY) {
      onStoreChange();
    }
  };

  window.addEventListener('storage', handleStorage);
  window.addEventListener(LANGUAGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener(LANGUAGE_EVENT, onStoreChange);
  };
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(subscribe, getStoredLanguage, () => 'en') as AppLanguage;
  const mounted = true;

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (nextLanguage: AppLanguage) => {
    window.localStorage.setItem(STORAGE_KEY, nextLanguage);
    document.documentElement.lang = nextLanguage;
    window.dispatchEvent(new Event(LANGUAGE_EVENT));
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      mounted,
    }),
    [language, mounted]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
}
