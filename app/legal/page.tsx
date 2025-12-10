'use client';

import Link from 'next/link';
import { useLocale } from '@/contexts/LocaleContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LocaleToggleCompact } from '@/components/LocaleToggleCompact';
import { Footer } from '@/components/Footer';

export default function LegalPage() {
  const { t, locale } = useLocale();
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'SaaS Starter';
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || siteName;
  const companyAddress = process.env.NEXT_PUBLIC_COMPANY_ADDRESS || '123 Rue Example, 75000 Paris, France';
  const companyEmail = process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'contact@example.com';
  const companyPhone = process.env.NEXT_PUBLIC_COMPANY_PHONE || '+33 1 23 45 67 89';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-xl font-bold">
              {siteName}
            </Link>
            <div className="flex items-center gap-4">
              <LocaleToggleCompact />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">
          {locale === 'fr_FR' ? 'Mentions Légales' : 'Terms of Service'}
        </h1>

        {locale === 'fr_FR' ? (
          // Version française
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-muted-foreground mb-8">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Informations légales</h2>
              <p className="mb-4">
                Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l'économie numérique, il est précisé aux utilisateurs du site {siteName} l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi.
              </p>
              
              <h3 className="text-xl font-semibold mb-2">Éditeur du site</h3>
              <p className="mb-2">
                <strong>Raison sociale :</strong> {companyName}<br />
                <strong>Adresse :</strong> {companyAddress}<br />
                <strong>Email :</strong> <a href={`mailto:${companyEmail}`} className="text-primary hover:underline">{companyEmail}</a><br />
                <strong>Téléphone :</strong> {companyPhone}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Hébergement</h2>
              <p className="mb-4">
                Le site est hébergé par :<br />
                <strong>Hébergeur :</strong> [Nom de votre hébergeur]<br />
                <strong>Adresse :</strong> [Adresse de l'hébergeur]
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. Propriété intellectuelle</h2>
              <p className="mb-4">
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
              <p className="mb-4">
                La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Conditions d'utilisation</h2>
              <p className="mb-4">
                L'utilisation du site {siteName} implique l'acceptation pleine et entière des conditions générales d'utilisation décrites ci-après. Ces conditions d'utilisation sont susceptibles d'être modifiées ou complétées à tout moment.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Services fournis</h2>
              <p className="mb-4">
                Le site {siteName} a pour objet de fournir une plateforme SaaS avec système d'authentification et d'abonnements. Nous nous efforçons de fournir sur le site {siteName} des informations aussi précises que possible. Toutefois, nous ne pourrons être tenus responsables des omissions, des inexactitudes et des carences dans la mise à jour, qu'elles soient de notre fait ou du fait des tiers partenaires qui nous fournissent ces informations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Limitations de responsabilité</h2>
              <p className="mb-4">
                {companyName} ne pourra être tenu responsable des dommages directs et indirects causés au matériel de l'utilisateur, lors de l'accès au site {siteName}, et résultant soit de l'utilisation d'un matériel ne répondant pas aux spécifications indiquées, soit de l'apparition d'un bug ou d'une incompatibilité.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Droit applicable</h2>
              <p className="mb-4">
                Les présentes conditions du site {siteName} sont régies par les lois françaises et toute contestation ou litiges qui pourraient naître de l'interprétation ou de l'exécution de celles-ci seront de la compétence exclusive des tribunaux dont dépend le siège social de la société {companyName}.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Contact</h2>
              <p className="mb-4">
                Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter à l'adresse suivante : <a href={`mailto:${companyEmail}`} className="text-primary hover:underline">{companyEmail}</a>
              </p>
            </section>
          </div>
        ) : (
          // English version
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-muted-foreground mb-8">
              Last updated: {new Date().toLocaleDateString('en-US')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Terms of Service</h2>
              <p className="mb-4">
                By accessing and using {siteName}, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Company Information</h2>
              <p className="mb-2">
                <strong>Company name:</strong> {companyName}<br />
                <strong>Address:</strong> {companyAddress}<br />
                <strong>Email:</strong> <a href={`mailto:${companyEmail}`} className="text-primary hover:underline">{companyEmail}</a><br />
                <strong>Phone:</strong> {companyPhone}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. Use License</h2>
              <p className="mb-4">
                Permission is granted to temporarily use {siteName} for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Service Description</h2>
              <p className="mb-4">
                {siteName} provides a SaaS platform with authentication and subscription management. We strive to provide accurate information, but we cannot guarantee the accuracy of all content.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Limitations</h2>
              <p className="mb-4">
                In no event shall {companyName} or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use {siteName}.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Contact</h2>
              <p className="mb-4">
                For any questions about these Terms of Service, please contact us at: <a href={`mailto:${companyEmail}`} className="text-primary hover:underline">{companyEmail}</a>
              </p>
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
