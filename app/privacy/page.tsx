'use client';

import Link from 'next/link';
import { useLocale } from '@/contexts/LocaleContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LocaleToggleCompact } from '@/components/LocaleToggleCompact';
import { Footer } from '@/components/Footer';

export default function PrivacyPage() {
  const { t, locale } = useLocale();
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'SaaS Starter';
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || siteName;
  const companyEmail = process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'contact@example.com';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-xl font-bold">{siteName}</Link>
            <div className="flex items-center gap-4">
              <LocaleToggleCompact />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">
          {locale === 'fr_FR' ? 'Politique de Confidentialité' : 'Privacy Policy'}
        </h1>

        {locale === 'fr_FR' ? (
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-muted-foreground mb-8">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Collecte des données</h2>
              <p>Nous collectons les informations suivantes : nom, prénom, adresse email, et informations de paiement via Stripe.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Utilisation des données</h2>
              <p>Vos données sont utilisées pour : gérer votre compte, traiter vos paiements, vous contacter, et améliorer nos services.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. Cookies</h2>
              <p>Nous utilisons des cookies nécessaires au fonctionnement du site, des cookies analytiques (avec votre consentement) et des cookies marketing (avec votre consentement).</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Vos droits (RGPD)</h2>
              <p>Vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données. Contactez-nous à <a href={`mailto:${companyEmail}`} className="text-primary">{companyEmail}</a></p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Sécurité</h2>
              <p>Vos données sont stockées sur Firebase (Google Cloud) et les paiements sont gérés par Stripe. Nous utilisons le chiffrement HTTPS.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Durée de conservation</h2>
              <p>Vos données sont conservées pendant la durée de votre abonnement et 3 ans après pour les obligations légales.</p>
            </section>
          </div>
        ) : (
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString('en-US')}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Data Collection</h2>
              <p>We collect: first name, last name, email address, and payment information via Stripe.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Use of Data</h2>
              <p>Your data is used to: manage your account, process payments, contact you, and improve our services.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. Cookies</h2>
              <p>We use necessary cookies, analytics cookies (with consent), and marketing cookies (with consent).</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Your Rights (GDPR)</h2>
              <p>You have the right to access, rectify, delete and port your data. Contact us at <a href={`mailto:${companyEmail}`} className="text-primary">{companyEmail}</a></p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Security</h2>
              <p>Your data is stored on Firebase (Google Cloud) and payments are handled by Stripe. We use HTTPS encryption.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Data Retention</h2>
              <p>Your data is kept for the duration of your subscription and 3 years after for legal obligations.</p>
            </section>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-border">
          <Link href="/" className="text-primary hover:underline">
            ← {locale === 'fr_FR' ? 'Retour à l\'accueil' : 'Back to home'}
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
