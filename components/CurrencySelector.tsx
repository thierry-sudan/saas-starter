'use client';

import { Currency, currencySymbols } from '@/lib/stripe';

interface CurrencySelectorProps {
  currency: Currency;
  onChange: (currency: Currency) => void;
}

export function CurrencySelector({ currency, onChange }: CurrencySelectorProps) {
  return (
    <div className="flex items-center gap-2 bg-secondary rounded-lg p-1">
      <button
        onClick={() => onChange('EUR')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          currency === 'EUR'
            ? 'bg-primary text-primary-foreground'
            : 'hover:bg-background'
        }`}
      >
        {currencySymbols.EUR} EUR
      </button>
      <button
        onClick={() => onChange('USD')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          currency === 'USD'
            ? 'bg-primary text-primary-foreground'
            : 'hover:bg-background'
        }`}
      >
        {currencySymbols.USD} USD
      </button>
    </div>
  );
}
