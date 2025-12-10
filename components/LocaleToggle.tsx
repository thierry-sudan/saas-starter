'use client';

import { useLocale } from '@/contexts/LocaleContext';
import { useState, useEffect, useRef } from 'react';

const locales = [
  { code: 'en_US', label: 'English', flag: '🇺🇸' },
  { code: 'fr_FR', label: 'Français', flag: '🇫🇷' },
] as const;

export function LocaleToggle() {
  const { locale, setLocale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLocale = locales.find(l => l.code === locale) || locales[0];

  // Fermer le dropdown si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocaleChange = (newLocale: typeof locales[number]['code']) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-secondary text-sm font-medium"
        aria-label="Change language"
      >
        <span className="text-lg">{currentLocale.flag}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-1 z-50">
          {locales.map((loc) => (
            <button
              key={loc.code}
              onClick={() => handleLocaleChange(loc.code)}
              className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-secondary transition-colors ${
                locale === loc.code ? 'bg-secondary' : ''
              }`}
            >
              <span className="text-lg">{loc.flag}</span>
              <span className="flex-1 text-left">{loc.label}</span>
              {locale === loc.code && (
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
