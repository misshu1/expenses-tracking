import React, { useState, useEffect } from 'react';
import CurrencySwitcher from './CurrencySwitcher';
import StatsCards from '../StatsCards/StatsCards';
import AlertBox from '../AlertBox/AlertBox';
import ExpenseCharts from '../ExpenseCharts/ExpenseCharts';
import type { Currency } from '../../utils/currencyUtils';

const getInitialCurrency = (initialCurrency?: Currency): Currency => {
  if (initialCurrency) return initialCurrency;
  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem('currency');
    if (stored === 'RON' || stored === 'EUR' || stored === 'USD') return stored;
  }
  return 'RON';
};

interface CurrencyDashboardProps {
  initialCurrency?: Currency;
}

const CurrencyDashboard: React.FC<CurrencyDashboardProps> = ({
  initialCurrency,
}) => {
  const [currency, setCurrency] = useState<Currency>(() =>
    getInitialCurrency(initialCurrency)
  );

  useEffect(() => {
    window.localStorage.setItem('currency', currency);
  }, [currency]);

  const income = 5000;
  const spent = 5200;
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    income: [5000, 5000, 5000, 5000, 5000, 5000],
    expenses: [4200, 4800, 5100, 4700, 5300, 5200],
  };
  const yearlyData = {
    labels: ['2020', '2021', '2022', '2023', '2024'],
    income: [60000, 61000, 62000, 63000, 64000],
    expenses: [48000, 50000, 54000, 59000, 61000],
  };

  return (
    <>
      <div className='flex justify-end mb-4'>
        <CurrencySwitcher value={currency} onChange={setCurrency} />
      </div>
      <StatsCards income={income} spent={spent} currency={currency} />
      {spent >= income && (
        <AlertBox message='Warning: Your expenses have reached or exceeded your monthly income!' />
      )}
      <ExpenseCharts
        monthlyData={monthlyData}
        yearlyData={yearlyData}
        currency={currency}
      />
    </>
  );
};

export default CurrencyDashboard;
