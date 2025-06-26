import * as React from "react";
import { Icon } from "@iconify/react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const typeColors: Record<string, string> = {
  Crypto: "bg-yellow-200 text-yellow-800",
  Stocks: "bg-blue-200 text-blue-800",
  "Real Estate": "bg-green-200 text-green-800",
  Bonds: "bg-purple-200 text-purple-800",
  Other: "bg-gray-200 text-gray-800",
};

const investmentTypes = Object.keys(typeColors);

interface Investment {
  name: string;
  type: string;
  amount: number;
  roi: number;
  startDate: string;
  duration: number;
  expectedReturn: number;
}

const defaultInvestments: Investment[] = [
  {
    name: "BTC",
    type: "Crypto",
    amount: 2000,
    roi: 12,
    startDate: "2023-01-01",
    duration: 12,
    expectedReturn: 2240,
  },
  {
    name: "Apple",
    type: "Stocks",
    amount: 3000,
    roi: 8,
    startDate: "2022-06-01",
    duration: 24,
    expectedReturn: 3240,
  },
  {
    name: "Apartment",
    type: "Real Estate",
    amount: 10000,
    roi: 5,
    startDate: "2021-03-01",
    duration: 36,
    expectedReturn: 11500,
  },
];

const InvestmentsManager: React.FC = () => {
  const [investments, setInvestments] =
    React.useState<Investment[]>(defaultInvestments);
  const [form, setForm] = React.useState<Partial<Investment>>({
    type: "Crypto",
    amount: 0,
    duration: 12,
    expectedReturn: 0,
  });
  const [error, setError] = React.useState("");

  // Portfolio performance mock data
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const portfolioValues = [15000, 15500, 16000, 16200, 17000, 17500];
  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Portfolio Value",
        data: portfolioValues,
        borderColor: "rgba(59, 130, 246, 1)",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.3,
      },
    ],
  };

  // Add new investment
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (
      !form.name ||
      !form.type ||
      !form.amount ||
      !form.duration ||
      !form.expectedReturn
    ) {
      setError("Please fill in all fields.");
      return;
    }
    setInvestments([
      ...investments,
      {
        name: form.name,
        type: form.type,
        amount: Number(form.amount),
        roi: Number(form.roi) || 0,
        startDate: form.startDate || new Date().toISOString().slice(0, 10),
        duration: Number(form.duration),
        expectedReturn: Number(form.expectedReturn),
      },
    ]);
    setForm({ type: "Crypto", amount: 0, duration: 12, expectedReturn: 0 });
  };

  return (
    <div className="size-full mx-auto p-4 flex flex-col gap-6">
      <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-gray-100">
        <Icon icon="ri:bar-chart-2-line" width={28} /> Investments
      </h2>
      {/* Portfolio Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4">
        <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
          Portfolio Performance
        </h3>
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: { legend: { position: "top" } },
          }}
        />
      </div>
      {/* Add Investment Form */}
      <form
        onSubmit={handleAdd}
        className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col gap-4"
      >
        <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
          Add New Investment
        </h3>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 flex-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            placeholder="Name"
            value={form.name || ""}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <select
            className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 flex-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            value={form.type || "Crypto"}
            onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
          >
            {investmentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="number"
            min="0"
            className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 flex-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            placeholder="Amount"
            value={form.amount || ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, amount: Number(e.target.value) }))
            }
          />
          <input
            type="number"
            min="0"
            className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 flex-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            placeholder="ROI (%)"
            value={form.roi || ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, roi: Number(e.target.value) }))
            }
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="date"
            className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 flex-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            value={form.startDate || ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, startDate: e.target.value }))
            }
          />
          <input
            type="number"
            min="1"
            className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 flex-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            placeholder="Duration (months)"
            value={form.duration || ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, duration: Number(e.target.value) }))
            }
          />
          <input
            type="number"
            min="0"
            className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 flex-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            placeholder="Expected Return"
            value={form.expectedReturn || ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, expectedReturn: Number(e.target.value) }))
            }
          />
        </div>
        {error && (
          <div className="text-red-600 dark:text-red-400 font-medium">
            {error}
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded px-4 py-2 mt-2 transition-colors self-start"
        >
          Add Investment
        </button>
      </form>
      {/* Investments List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
          Active Investments
        </h3>
        <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-900">
              <th className="p-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                Name
              </th>
              <th className="p-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                Type
              </th>
              <th className="p-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                Amount
              </th>
              <th className="p-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                ROI (%)
              </th>
              <th className="p-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                Start Date
              </th>
              <th className="p-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                Duration (mo)
              </th>
              <th className="p-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                Expected Return
              </th>
            </tr>
          </thead>
          <tbody>
            {investments.map((inv, idx) => (
              <tr key={idx} className="even:bg-gray-50 even:dark:bg-gray-900">
                <td className="p-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                  {inv.name}
                </td>
                <td className="p-2 border border-gray-200 dark:border-gray-700">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${typeColors[inv.type] || typeColors.Other}`}
                  >
                    {inv.type}
                  </span>
                </td>
                <td className="p-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                  {inv.amount}
                </td>
                <td className="p-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                  {inv.roi}
                </td>
                <td className="p-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                  {inv.startDate}
                </td>
                <td className="p-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                  {inv.duration}
                </td>
                <td className="p-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                  {inv.expectedReturn}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvestmentsManager;
