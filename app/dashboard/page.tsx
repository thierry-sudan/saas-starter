'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useLocale } from '@/contexts/LocaleContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LocaleToggleCompact } from '@/components/LocaleToggleCompact';
import { CurrencySelector } from '@/components/CurrencySelector';
import { plans, getPreferredCurrency, Currency } from '@/lib/stripe';

export default function DashboardPage() {
  const { user, userData, signOut, loading } = useAuth();
  const { t, locale } = useLocale();
  const router = useRouter();
  
  // Gérer la devise
  const [currency, setCurrency] = useState<Currency>(
    userData?.currency || getPreferredCurrency(locale)
  );
  
  // Mettre à jour la devise quand userData change
  useEffect(() => {
    if (userData?.currency) {
      setCurrency(userData.currency);
    }
  }, [userData]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleSubscribe = async (priceId: string) => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Erreur lors de la création de la session:', error);
    }
  };

  const handleManageSubscription = async () => {
    try {
      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Erreur lors de l\'accès au portail:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-lg">{t('common.loading')}</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const currentPlan = userData?.plan || 'free';
  const displayName = userData?.firstName || user.email?.split('@')[0] || 'Utilisateur';

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold">{t('nav.myDashboard')}</h1>
            <div className="flex items-center gap-4">
              <Link
                href="/profile"
                className="px-4 py-2 text-sm hover:bg-secondary rounded-lg"
              >
                {t('common.profile')}
              </Link>
              <LocaleToggleCompact />
              <ThemeToggle />
              <button
                onClick={signOut}
                className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-lg"
              >
                {t('common.logout')}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">{t('common.hello')}, {displayName} !</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{t('dashboard.currentPlan')}</span>
            <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
              {currentPlan === 'free' ? t('profile.free') : plans[currentPlan as keyof typeof plans]?.name}
            </span>
          </div>
        </div>

        {userData?.subscriptionStatus && (
          <div className="mb-8">
            <button
              onClick={handleManageSubscription}
              className="px-6 py-2 bg-secondary hover:bg-secondary/80 rounded-lg text-sm font-medium"
            >
              {t('profile.manageSubscription')}
            </button>
          </div>
        )}

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <h3 className="text-xl font-bold">{t('dashboard.subscriptionPlans')}</h3>
            
            {/* Sélecteur de devise - uniquement si pas encore d'abonnement */}
            {userData?.plan === 'free' && (
              <div className="flex flex-col gap-2">
                <span className="text-xs text-muted-foreground">{t('currency.select')}</span>
                <CurrencySelector currency={currency} onChange={setCurrency} />
              </div>
            )}
            
            {/* Afficher la devise actuelle si abonné */}
            {userData?.plan !== 'free' && userData?.currency && (
              <div className="text-sm text-muted-foreground">
                {t('currency.current')}: {userData.currency === 'EUR' ? '€ EUR' : '$ USD'}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(plans).map(([key, plan]) => {
              const isCurrentPlan = currentPlan === key;
              const planKey = key as 'simple' | 'premium' | 'pro';
              
              // Récupérer les features traduites manuellement
              const getFeatures = (plan: string) => {
                if (plan === 'simple') {
                  return [
                    t('plans.simple.features.api'),
                    t('plans.simple.features.requests'),
                    t('plans.simple.features.support'),
                  ];
                } else if (plan === 'premium') {
                  return [
                    t('plans.premium.features.api'),
                    t('plans.premium.features.requests'),
                    t('plans.premium.features.support'),
                    t('plans.premium.features.webhooks'),
                  ];
                } else {
                  return [
                    t('plans.pro.features.api'),
                    t('plans.pro.features.requests'),
                    t('plans.pro.features.support'),
                    t('plans.pro.features.sla'),
                    t('plans.pro.features.integrations'),
                  ];
                }
              };
              
              const translatedFeatures = getFeatures(planKey);
              
              return (
                <div
                  key={key}
                  className={`bg-card border rounded-lg p-6 ${
                    isCurrentPlan ? 'border-primary ring-2 ring-primary' : 'border-border'
                  }`}
                >
                  <h4 className="text-xl font-bold mb-2">{t(`plans.${planKey}.name`)}</h4>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">{plan.prices[currency].amount}</span>
                    <span className="text-muted-foreground">{t('profile.perMonth')}</span>
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    {translatedFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSubscribe(plan.prices[currency].priceId)}
                    disabled={isCurrentPlan}
                    className={`w-full py-2 px-4 rounded-lg font-medium ${
                      isCurrentPlan
                        ? 'bg-secondary text-secondary-foreground cursor-not-allowed'
                        : 'bg-primary text-primary-foreground hover:opacity-90'
                    }`}
                  >
                    {isCurrentPlan ? t('dashboard.currentPlanBadge') : t('dashboard.subscribe')}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">{t('dashboard.apiKey')}</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {t('dashboard.apiKeyDescription')}
          </p>
          <code className="block bg-secondary p-3 rounded text-sm font-mono break-all">
            {user.uid}
          </code>
        </div>
      </div>
    </div>
  );
}
