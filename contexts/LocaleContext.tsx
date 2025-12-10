'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import en_US from '@/locales/en_US.json';
import fr_FR from '@/locales/fr_FR.json';

type Locale = 'en_US' | 'fr_FR';

type TranslationKey = string;

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const LocaleContext = createContext<LocaleContextType>({} as LocaleContextType);

export const useLocale = () => useContext(LocaleContext);

const translations = {
  en_US,
  fr_FR,
};

// Détecter la langue du navigateur
const detectBrowserLocale = (): Locale => {
  if (typeof window === 'undefined') return 'en_US';
  
  const browserLang = navigator.language || (navigator as any).userLanguage;
  
  // Si la langue commence par 'fr', utiliser fr_FR
  if (browserLang.toLowerCase().startsWith('fr')) {
    return 'fr_FR';
  }
  
  // Par défaut, en_US
  return 'en_US';
};

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en_US');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Récupérer la locale depuis localStorage ou détecter
    const savedLocale = localStorage.getItem('locale') as Locale;
    const detectedLocale = savedLocale || detectBrowserLocale();
    setLocaleState(detectedLocale);
    setMounted(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  const t = (key: TranslationKey): string => {
    const keys = key.split('.');
    let value: any = translations[locale];

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Retourner la clé si non trouvé
      }
    }

    return typeof value === 'string' ? value : key;
  };

  // Ne pas render les enfants avant d'avoir détecté la locale
  if (!mounted) {
    return null;
  }

  const value = {
    locale,
    setLocale,
    t,
  };

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}
