'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLocale } from '@/contexts/LocaleContext';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LocaleToggleCompact } from '@/components/LocaleToggleCompact';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';

export default function Home() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'SaaS Starter';
  const { t } = useLocale();
  const { user, userData, signOut, loading } = useAuth();
  const router = useRouter();
  
  // Afficher le nom de l'utilisateur
  const displayName = userData?.firstName || user?.email?.split('@')[0] || 'User';
  
  return (
    <>
      <div className="min-h-screen bg-background flex flex-col">
        <nav className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link href="/" className="text-lg sm:text-xl font-bold">
                {siteName}
              </Link>
              <div className="flex items-center gap-2 sm:gap-4">
                <LocaleToggleCompact />
                <ThemeToggle />
                
                {loading ? (
                  // État de chargement
                  <div className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-muted-foreground">
                    {t('common.loading')}...
                  </div>
                ) : user ? (
                  // Utilisateur connecté
                  <>
                    <span className="hidden sm:inline text-sm text-muted-foreground">
                      {t('common.hello')}, {displayName}
                    </span>
                    <Link
                      href="/dashboard"
                      className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-primary text-primary-foreground hover:opacity-90 rounded-lg font-medium"
                    >
                      {t('common.dashboard')}
                    </Link>
                    <button
                      onClick={signOut}
                      className="px-3 sm:px-4 py-2 text-xs sm:text-sm hover:bg-secondary rounded-lg"
                    >
                      {t('common.logout')}
                    </button>
                  </>
                ) : (
                  // Utilisateur non connecté
                  <>
                    <Link
                      href="/login"
                      className="px-3 sm:px-4 py-2 text-xs sm:text-sm hover:bg-secondary rounded-lg"
                    >
                      {t('auth.login')}
                    </Link>
                    <Link
                      href="/signup"
                      className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-primary text-primary-foreground hover:opacity-90 rounded-lg font-medium"
                    >
                      {t('home.getStarted')}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>

        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="max-w-4xl w-full text-center">
            {user ? (
              // Contenu pour utilisateur connecté
              <>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                  {t('common.hello')}, {displayName} ! 👋
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
                  {t('home.welcomeBack')}
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
                  <Link
                    href="/dashboard"
                    className="px-6 sm:px-8 py-3 bg-primary text-primary-foreground hover:opacity-90 rounded-lg font-medium text-base sm:text-lg"
                  >
                    {t('common.dashboard')}
                  </Link>
                  <Link
                    href="/profile"
                    className="px-6 sm:px-8 py-3 bg-secondary hover:bg-secondary/80 rounded-lg font-medium text-base sm:text-lg"
                  >
                    {t('nav.myProfile')}
                  </Link>
                </div>
              </>
            ) : (
              // Contenu pour utilisateur non connecté
              <>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                  {t('home.title')}
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
                  {t('home.subtitle')}
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
                  <Link
                    href="/signup"
                    className="px-6 sm:px-8 py-3 bg-primary text-primary-foreground hover:opacity-90 rounded-lg font-medium text-base sm:text-lg"
                  >
                    {t('home.getStarted')}
                  </Link>
                  <Link
                    href="/login"
                    className="px-6 sm:px-8 py-3 bg-secondary hover:bg-secondary/80 rounded-lg font-medium text-base sm:text-lg"
                  >
                    {t('home.login')}
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

        <Footer />
      </div>

      <CookieBanner />
    </>
  );
}
