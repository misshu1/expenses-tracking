import * as React from "react";
import {Bar, Line} from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import type {Currency} from "@utils/currencyUtils";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
);

interface ChartData {
	labels: string[];
	income: number[];
	expenses: number[];
}

interface ExpenseChartsProps {
	monthlyData: ChartData;
	yearlyData: ChartData;
	currency: Currency;
}

const ExpenseCharts: React.FC<ExpenseChartsProps> = ({
	monthlyData,
	yearlyData,
	currency,
}) => {
	const barData = {
		labels: monthlyData.labels,
		datasets: [
			{
				label: `Income (${currency})`,
				data: monthlyData.income,
				backgroundColor: "rgba(59, 130, 246, 0.7)",
			},
			{
				label: `Expenses (${currency})`,
				data: monthlyData.expenses,
				backgroundColor: "rgba(239, 68, 68, 0.7)",
			},
		],
	};
	const lineData = {
		labels: yearlyData.labels,
		datasets: [
			{
				label: `Income (${currency})`,
				data: yearlyData.income,
				borderColor: "rgba(59, 130, 246, 1)",
				backgroundColor: "rgba(59, 130, 246, 0.2)",
				tension: 0.3,
			},
			{
				label: `Expenses (${currency})`,
				data: yearlyData.expenses,
				borderColor: "rgba(239, 68, 68, 1)",
				backgroundColor: "rgba(239, 68, 68, 0.2)",
				tension: 0.3,
			},
		],
	};
	return (
		<div className="grid md:grid-cols-2 gap-6 w-full">
			<div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
				<h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
					Monthly Overview
				</h3>
				<Bar
					data={barData}
					options={{
						responsive: true,
						plugins: {legend: {position: "top"}},
					}}
				/>
			</div>
			<div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
				<h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
					Yearly Overview
				</h3>
				<Line
					data={lineData}
					options={{
						responsive: true,
						plugins: {legend: {position: "top"}},
					}}
				/>
			</div>
		</div>
	);
};

export default ExpenseCharts;
