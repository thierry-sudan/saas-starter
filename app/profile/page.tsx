'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useLocale } from '@/contexts/LocaleContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LocaleToggleCompact } from '@/components/LocaleToggleCompact';
import { plans, Currency, getPreferredCurrency } from '@/lib/stripe';

export default function ProfilePage() {
  const { user, userData, signOut, updateProfile, loading } = useAuth();
  const { t, locale } = useLocale();
  const router = useRouter();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  // Gérer la devise
  const currency: Currency = userData?.currency || getPreferredCurrency(locale);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (userData) {
      setFirstName(userData.firstName || '');
      setLastName(userData.lastName || '');
    }
  }, [userData]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      await updateProfile(firstName, lastName);
      setMessage(t('profile.profileUpdated'));
      setIsEditing(false);
      setTimeout(() => setMessage(''), 3000);
    } catch (error: any) {
      setMessage(error.message || t('profile.updateError'));
    } finally {
      setSaving(false);
    }
  };

  const handleManageSubscription = async () => {
    try {
      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user?.uid }),
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

  if (!user || !userData) {
    return null;
  }

  const currentPlan = userData?.plan || 'free';
  const displayName = userData?.firstName || user.email?.split('@')[0] || 'Utilisateur';
  const isGoogleAuth = userData?.provider === 'google';

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold">{t('nav.myProfile')}</h1>
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="px-4 py-2 text-sm hover:bg-secondary rounded-lg"
              >
                {t('common.dashboard')}
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            {t('common.hello')}, {displayName} !
          </h2>
          <div className="flex items-center gap-2 text-muted-foreground">
            {isGoogleAuth ? (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            )}
            <span>{user.email}</span>
          </div>
        </div>

        {message && (
          <div className="mb-6 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-4 rounded-lg">
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Informations personnelles */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">{t('profile.personalInfo')}</h3>
              {!isEditing && !isGoogleAuth && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-primary hover:underline text-sm"
                >
                  {t('common.edit')}
                </button>
              )}
            </div>

            {isGoogleAuth && (
              <div className="mb-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 p-3 rounded-lg text-sm flex items-start gap-2">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{t('profile.googleSyncMessage')}</span>
              </div>
            )}

            {isEditing ? (
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                    {t('common.firstName')}
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={t('common.firstName')}
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                    {t('common.lastName')}
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={t('common.lastName')}
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:opacity-90 disabled:opacity-50 font-medium"
                  >
                    {saving ? t('common.saving') : t('common.save')}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setFirstName(userData.firstName || '');
                      setLastName(userData.lastName || '');
                    }}
                    className="flex-1 bg-secondary hover:bg-secondary/80 py-2 px-4 rounded-lg font-medium"
                  >
                    {t('common.cancel')}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t('common.firstName')}</p>
                  <p className="font-medium">{userData.firstName || t('profile.notProvided')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t('common.lastName')}</p>
                  <p className="font-medium">{userData.lastName || t('profile.notProvided')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t('common.email')}</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
            )}
          </div>

          {/* Abonnement */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-bold mb-6">{t('profile.subscription')}</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{t('profile.currentPlan')}</p>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                    {currentPlan === 'free' ? t('profile.free') : plans[currentPlan as keyof typeof plans]?.name}
                  </span>
                </div>
              </div>

              {userData.subscriptionStatus && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t('profile.status')}</p>
                  <p className="font-medium capitalize">
                    {userData.subscriptionStatus === 'active' && t('subscription.status.active')}
                    {userData.subscriptionStatus === 'canceled' && t('subscription.status.canceled')}
                    {userData.subscriptionStatus === 'past_due' && t('subscription.status.past_due')}
                    {userData.subscriptionStatus === 'trialing' && t('subscription.status.trialing')}
                  </p>
                </div>
              )}

              {currentPlan !== 'free' && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t('profile.price')}</p>
                  <p className="font-medium text-lg">
                    {plans[currentPlan as keyof typeof plans]?.prices[currency].amount}{t('profile.perMonth')}
                  </p>
                </div>
              )}

              {currentPlan === 'free' ? (
                <Link
                  href="/dashboard"
                  className="block w-full text-center bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:opacity-90 font-medium"
                >
                  {t('profile.choosePlan')}
                </Link>
              ) : (
                <button
                  onClick={handleManageSubscription}
                  className="w-full bg-secondary hover:bg-secondary/80 py-2 px-4 rounded-lg font-medium"
                >
                  {t('profile.manageSubscription')}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Clé API */}
        <div className="mt-6 bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">{t('profile.apiKey')}</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {t('profile.apiKeyDescription')}
          </p>
          <code className="block bg-secondary p-3 rounded text-sm font-mono break-all">
            {user.uid}
          </code>
        </div>
      </div>
    </div>
  );
}
