import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export type Currency = 'EUR' | 'USD';

export const currencySymbols: Record<Currency, string> = {
  EUR: '€',
  USD: '$',
};

export const plans = {
  simple: {
    name: 'Simple',
    prices: {
      EUR: { amount: '9€', priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_SIMPLE_EUR! },
      USD: { amount: '$9', priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_SIMPLE_USD! },
    },
  },
  premium: {
    name: 'Premium',
    prices: {
      EUR: { amount: '29€', priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PREMIUM_EUR! },
      USD: { amount: '$29', priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PREMIUM_USD! },
    },
  },
  pro: {
    name: 'Pro',
    prices: {
      EUR: { amount: '99€', priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_EUR! },
      USD: { amount: '$99', priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_USD! },
    },
  },
};

export type PlanType = keyof typeof plans;

// Détecte la devise préférée selon la locale
export function getPreferredCurrency(locale?: string): Currency {
  if (!locale) return 'EUR';
  
  // US et pays anglophones qui utilisent USD
  const usdLocales = ['en_US', 'en-US', 'en_CA', 'en-CA'];
  
  if (usdLocales.includes(locale)) {
    return 'USD';
  }
  
  // Par défaut EUR pour l'Europe
  return 'EUR';
}
