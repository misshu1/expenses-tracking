// @ts-nocheck
import * as React from 'react';
import { Icon } from '@iconify/react/dist/offline';
import type { Currency } from '../utils/currencyUtils';

const currencyIcons: Record<Currency, string> = {
  RON: 'ri:money-euro-circle-line',
  EUR: 'ri:currency-euro-line',
  USD: 'ri:currency-dollar-line',
};

interface Props {
  value?: Currency;
  onChange?: (currency: Currency) => void;
}

const getInitialCurrency = (): Currency => {
  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem('currency');
    if (stored === 'RON' || stored === 'EUR' || stored === 'USD')
      return stored as Currency;
  }
  return 'RON';
};

const CurrencySwitcher: React.FC<Props> = ({ value, onChange }) => {
  const [currency, setCurrency] = React.useState<Currency>(getInitialCurrency);

  React.useEffect(() => {
    window.localStorage.setItem('currency', currency);
    if (onChange) onChange(currency);
  }, [currency, onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value as Currency);
  };

  return (
    <div className='flex items-center gap-2'>
      <Icon icon={currencyIcons[currency]} width={24} height={24} />
      <select
        value={currency}
        onChange={handleChange}
        className='bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded px-3 py-2 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
        aria-label='Select currency'
      >
        {(['RON', 'EUR', 'USD'] as Currency[]).map((cur) => (
          <option key={cur} value={cur}>
            {cur}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySwitcher;
