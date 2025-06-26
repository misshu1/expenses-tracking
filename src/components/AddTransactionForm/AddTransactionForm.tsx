import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Currency } from '../../utils/currencyUtils';

const expenseCategories = {
  Invoices: ['Phone', 'Internet', 'Electricity'],
  Transportation: ['Fuel', 'Taxi', 'Public Transport'],
  Health: ['Medicine', 'Doctor', 'Insurance'],
  Home: ['Rent', 'Maintenance', 'Furniture'],
  Vacations: ['Flights', 'Hotels', 'Activities'],
  Groceries: ['Supermarket', 'Market', 'Other'],
  Entertainment: ['Movies', 'Games', 'Events'],
  Other: ['Miscellaneous'],
};

const incomeCategories = {
  Salary: ['Monthly', 'Bonus'],
  Others: ['Insurance', 'Gifts', 'Returns', 'Rent', 'Other'],
};

const schema = z.object({
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  category: z.string().min(1, 'Category is required'),
  subcategory: z.string().min(1, 'Subcategory is required'),
  date: z.string().min(1, 'Date is required'),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface AddTransactionFormProps {
  currency: Currency;
}

const AddTransactionForm: React.FC<AddTransactionFormProps> = ({
  currency,
}) => {
  const [type, setType] = useState<'expense' | 'income'>('expense');
  const [category, setCategory] = useState('');
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: 0,
      category: '',
      subcategory: '',
      date: '',
      notes: '',
    },
  });

  const categories =
    type === 'expense'
      ? Object.keys(expenseCategories)
      : Object.keys(incomeCategories);
  const subcategories =
    type === 'expense'
      ? expenseCategories[category as keyof typeof expenseCategories] || []
      : incomeCategories[category as keyof typeof incomeCategories] || [];

  const onSubmit = async (data: FormData) => {
    const endpoint =
      type === 'expense' ? '/api/add-expense' : '/api/add-income';
    await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, currency }),
    });
    reset();
  };

  return (
    <div className='max-w-md mx-auto p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md mt-6'>
      <div className='flex justify-center mb-6'>
        <button
          className={`px-4 py-2 rounded-l-full border ${type === 'expense' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}
          onClick={() => {
            setType('expense');
            setCategory('');
          }}
          type='button'
        >
          Add Expense
        </button>
        <button
          className={`px-4 py-2 rounded-r-full border-l-0 border ${type === 'income' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}
          onClick={() => {
            setType('income');
            setCategory('');
          }}
          type='button'
        >
          Add Income
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <Controller
          name='amount'
          control={control}
          render={({ field }) => (
            <div>
              <label className='block mb-1 font-medium'>Amount</label>
              <input
                type='number'
                step='0.01'
                min='0'
                {...field}
                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
              />
              {errors.amount && (
                <span className='text-red-500 text-sm'>
                  {errors.amount.message}
                </span>
              )}
            </div>
          )}
        />
        <Controller
          name='category'
          control={control}
          render={({ field }) => (
            <div>
              <label className='block mb-1 font-medium'>Category</label>
              <select
                {...field}
                value={category}
                onChange={(e) => {
                  field.onChange(e);
                  setCategory(e.target.value);
                }}
                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
              >
                <option value=''>Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className='text-red-500 text-sm'>
                  {errors.category.message}
                </span>
              )}
            </div>
          )}
        />
        <Controller
          name='subcategory'
          control={control}
          render={({ field }) => (
            <div>
              <label className='block mb-1 font-medium'>Subcategory</label>
              <select
                {...field}
                disabled={!category}
                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
              >
                <option value=''>
                  {category ? 'Select subcategory' : 'Select category first'}
                </option>
                {subcategories.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
              {errors.subcategory && (
                <span className='text-red-500 text-sm'>
                  {errors.subcategory.message}
                </span>
              )}
            </div>
          )}
        />
        <Controller
          name='date'
          control={control}
          render={({ field }) => (
            <div>
              <label className='block mb-1 font-medium'>Date</label>
              <input
                type='date'
                {...field}
                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
              />
              {errors.date && (
                <span className='text-red-500 text-sm'>
                  {errors.date.message}
                </span>
              )}
            </div>
          )}
        />
        <Controller
          name='notes'
          control={control}
          render={({ field }) => (
            <div>
              <label className='block mb-1 font-medium'>Notes</label>
              <textarea
                {...field}
                rows={2}
                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                placeholder='Optional notes...'
              />
            </div>
          )}
        />
        <button
          type='submit'
          disabled={isSubmitting}
          className='w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow disabled:opacity-60'
        >
          {isSubmitting
            ? 'Submitting...'
            : type === 'expense'
              ? 'Add Expense'
              : 'Add Income'}
        </button>
      </form>
    </div>
  );
};

export default AddTransactionForm;
