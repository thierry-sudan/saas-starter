'use client';

import { useState, useEffect } from 'react';
import { useLocale } from '@/contexts/LocaleContext';
import Link from 'next/link';

export function CookieBanner() {
  const { t } = useLocale();
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Toujours activés
    analytics: false,
    marketing: false,
  });
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà fait un choix
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    } else {
      const saved = JSON.parse(consent);
      setPreferences(saved);
    }

    // Écouter l'événement pour ouvrir les paramètres
    const handleOpenSettings = () => {
      setIsVisible(true);
      setIsMinimized(false);
      setShowSettings(true);
    };

    window.addEventListener('openCookieSettings', handleOpenSettings);
    return () => window.removeEventListener('openCookieSettings', handleOpenSettings);
  }, []);

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted));
    setIsVisible(false);
  };

  const acceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    setPreferences(necessaryOnly);
    localStorage.setItem('cookie-consent', JSON.stringify(necessaryOnly));
    setIsVisible(false);
  };

  const savePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    setIsVisible(false);
  };

  const minimize = () => {
    setIsMinimized(true);
    setShowSettings(false);
  };

  const restore = () => {
    setIsMinimized(false);
  };

  if (!isVisible) return null;

  // Version minimisée (cookie icon)
  if (isMinimized) {
    return (
      <button
        onClick={restore}
        className="fixed bottom-4 left-4 z-50 bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
        aria-label={t('cookies.settings')}
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
      </button>
    );
  }

  // Version complète
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg max-h-[90vh] overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <h3 className="text-base sm:text-lg font-bold">{t('cookies.title')}</h3>
            </div>
            
            <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
              {t('cookies.description')}{' '}
              <Link href="/privacy" className="text-primary hover:underline">
                {t('cookies.learnMore')}
              </Link>
            </p>

            {showSettings && (
              <div className="mb-3 sm:mb-4 space-y-2 sm:space-y-3 bg-secondary p-3 sm:p-4 rounded-lg">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-medium text-xs sm:text-sm">{t('cookies.necessary')}</p>
                    <p className="text-xs text-muted-foreground">{t('cookies.necessaryDesc')}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                  />
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-medium text-xs sm:text-sm">{t('cookies.analytics')}</p>
                    <p className="text-xs text-muted-foreground">{t('cookies.analyticsDesc')}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                  />
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-medium text-xs sm:text-sm">{t('cookies.marketing')}</p>
                    <p className="text-xs text-muted-foreground">{t('cookies.marketingDesc')}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                    className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <button
                onClick={acceptAll}
                className="px-3 sm:px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 font-medium text-xs sm:text-sm"
              >
                {t('cookies.acceptAll')}
              </button>

              {!showSettings && (
                <button
                  onClick={() => setShowSettings(true)}
                  className="px-3 sm:px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg font-medium text-xs sm:text-sm"
                >
                  {t('cookies.customize')}
                </button>
              )}

              {showSettings && (
                <button
                  onClick={savePreferences}
                  className="px-3 sm:px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg font-medium text-xs sm:text-sm"
                >
                  {t('cookies.savePreferences')}
                </button>
              )}

              <button
                onClick={acceptNecessary}
                className="px-3 sm:px-4 py-2 hover:bg-secondary rounded-lg font-medium text-xs sm:text-sm"
              >
                {t('cookies.rejectAll')}
              </button>

              <button
                onClick={minimize}
                className="ml-auto px-2 sm:px-3 py-2 hover:bg-secondary rounded-lg"
                aria-label={t('cookies.minimize')}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
