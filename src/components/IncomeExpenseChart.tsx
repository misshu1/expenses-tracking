import React from "react";
import {Bar} from "react-chartjs-2";
import {
	Chart as ChartJS,
	BarElement,
	CategoryScale,
	LinearScale,
	Legend,
	Tooltip,
	PointElement,
	LineElement,
} from "chart.js";
import type {ChartData, ChartOptions} from "chart.js";

ChartJS.register(
	BarElement,
	CategoryScale,
	LinearScale,
	Legend,
	Tooltip,
	PointElement,
	LineElement,
);

const months = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

interface IncomeExpenseChartProps {
	income: number[];
	expenses: number[];
	savings: number[];
}

const IncomeExpenseChart: React.FC<IncomeExpenseChartProps> = ({
	income,
	expenses,
	savings,
}) => {
	const data: ChartData<"bar"> = {
		labels: months,
		datasets: [
			{
				label: "Income",
				data: income,
				backgroundColor: "rgba(34,197,94,0.7)", // green-500
				borderRadius: 4,
				barPercentage: 0.45,
				categoryPercentage: 0.5,
			},
			{
				label: "Expenses",
				data: expenses,
				backgroundColor: "rgba(239,68,68,0.7)", // red-500
				borderRadius: 4,
				barPercentage: 0.45,
				categoryPercentage: 0.5,
			},
			{
				type: "line",
				label: "Savings",
				data: savings,
				borderColor: "rgba(234,179,8,1)", // yellow-400
				backgroundColor: "rgba(234,179,8,0.2)",
				borderWidth: 2,
				pointRadius: 4,
				pointBackgroundColor: "rgba(234,179,8,1)",
				fill: false,
				yAxisID: "y",
			},
		] as any,
	};

	const options: ChartOptions<"bar"> = {
		responsive: true,
		plugins: {
			legend: {position: "top"},
			tooltip: {mode: "index", intersect: false},
		},
		scales: {
			x: {stacked: false},
			y: {beginAtZero: true, stacked: false},
		},
	};

	return (
		<div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow p-4 mb-8">
			<h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
				Monthly Income vs Expenses
			</h3>
			<Bar data={data} options={options} />
		</div>
	);
};

export default IncomeExpenseChart;
