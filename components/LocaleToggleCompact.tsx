'use client';

import { useLocale } from '@/contexts/LocaleContext';
import { useState, useEffect, useRef } from 'react';

const locales = [
  { 
    code: 'en_US', 
    label: 'English', 
    flag: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 2C12 2 9 6 9 12C9 18 12 22 12 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 2C12 2 15 6 15 12C15 18 12 22 12 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M2 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M3.5 7H20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M3.5 17H20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  },
  { 
    code: 'fr_FR', 
    label: 'Français', 
    flag: (
      <svg className="w-6 h-4" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
        <rect width="900" height="600" fill="#ED2939"/>
        <rect width="600" height="600" fill="#fff"/>
        <rect width="300" height="600" fill="#002395"/>
      </svg>
    )
  },
] as const;

export function LocaleToggleCompact() {
  const { locale, setLocale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLocale = locales.find(l => l.code === locale) || locales[0];

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
        className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-secondary"
        aria-label="Change language"
        title={currentLocale.label}
      >
        {currentLocale.flag}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-card border border-border rounded-lg shadow-lg py-1 z-50">
          {locales.map((loc) => (
            <button
              key={loc.code}
              onClick={() => handleLocaleChange(loc.code)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-secondary transition-colors ${
                locale === loc.code ? 'bg-secondary' : ''
              }`}
            >
              <span className="flex-shrink-0">{loc.flag}</span>
              <span className="flex-1 text-left">{loc.label}</span>
              {locale === loc.code && (
                <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
