import React from 'react';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

type YearlySummaryData = {
  income: Record<string, number[]>;
  expenses: Record<string, number[]>;
};

interface YearlySummaryTableProps {
  data: YearlySummaryData;
}

function sum(arr: number[]) {
  return arr.reduce((a, b) => a + b, 0);
}

const YearlySummaryTable: React.FC<YearlySummaryTableProps> = ({ data }) => {
  // Calculate totals per month
  const incomeTotals = months.map((_, i) =>
    Object.values(data.income).reduce((sum, arr) => sum + (arr[i] || 0), 0)
  );
  const expenseTotals = months.map((_, i) =>
    Object.values(data.expenses).reduce((sum, arr) => sum + (arr[i] || 0), 0)
  );
  const savings = months.map((_, i) => incomeTotals[i] - expenseTotals[i]);

  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg mt-8'>
      <table className='w-full min-w-[900px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse'>
        {/* Expenses Section Header */}
        <tr className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <th
            scope='col'
            className='sticky whitespace-nowrap left-0 z-20 px-6 py-4 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-left'
          >
            Income
          </th>
          {months.map((month) => (
            <th
              key={month}
              scope='col'
              className='px-6 py-3 text-center font-semibold'
              aria-label='Income section'
            >
              {month}
            </th>
          ))}
        </tr>
        <tbody>
          {/* Income Rows */}
          {Object.entries(data.income).map(([cat, values], idx) => (
            <tr
              key={cat}
              className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200'
            >
              <th
                scope='row'
                className='sticky whitespace-nowrap left-0 z-10 px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-inherit'
              >
                {cat}
              </th>
              {values.map((val, i) => (
                <td key={i} className='px-6 py-3 text-right'>
                  {val}
                </td>
              ))}
            </tr>
          ))}
          {/* Total Income Row */}
          <tr className='bg-green-600 bg-opacity-30 dark:bg-green-900 dark:bg-opacity-80 font-bold text-green-900 dark:text-green-200'>
            <td className='sticky whitespace-nowrap left-0 z-10 px-6 py-3 bg-green-600 bg-opacity-30 dark:bg-green-900 dark:bg-opacity-80'>
              Total Income
            </td>
            {incomeTotals.map((val, i) => (
              <td key={i} className='px-6 py-3 text-right'>
                {val}
              </td>
            ))}
          </tr>
          {/* Expenses Section Header */}
          <tr className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <th
              scope='col'
              className='sticky whitespace-nowrap left-0 z-20 px-6 py-4 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-left'
            >
              Expenses
            </th>
            {months.map((month) => (
              <th
                key={month}
                scope='col'
                className='px-6 py-3 text-center font-semibold'
                aria-label='Expenses section'
              >
                {month}
              </th>
            ))}
          </tr>
          {/* Expenses Rows */}
          {Object.entries(data.expenses).map(([cat, values], idx) => (
            <tr
              key={cat}
              className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200'
            >
              <th
                scope='row'
                className='sticky whitespace-nowrap left-0 z-10 px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-inherit'
              >
                {cat}
              </th>
              {values.map((val, i) => (
                <td key={i} className='px-6 py-3 text-right'>
                  {val}
                </td>
              ))}
            </tr>
          ))}

          {/* Total Expenses Row */}
          <tr className='bg-red-600 bg-opacity-30 dark:bg-red-900 dark:bg-opacity-80 font-bold text-red-900 dark:text-red-200'>
            <td className='sticky whitespace-nowrap left-0 z-10 px-6 py-3 bg-red-600 bg-opacity-30 dark:bg-red-900 dark:bg-opacity-80'>
              Total Expenses
            </td>
            {expenseTotals.map((val, i) => (
              <td key={i} className='px-6 py-3 text-right'>
                {val}
              </td>
            ))}
          </tr>
          {/* Savings Row */}
          <tr className='bg-yellow-400 bg-opacity-30 dark:bg-yellow-900 dark:bg-opacity-80 font-bold text-yellow-900 dark:text-yellow-100'>
            <td className='sticky whitespace-nowrap left-0 z-10 px-6 py-3 bg-yellow-400 bg-opacity-30 dark:bg-yellow-900 dark:bg-opacity-80'>
              Savings
            </td>
            {savings.map((val, i) => (
              <td key={i} className='px-6 py-3 text-right'>
                {val}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default YearlySummaryTable;
