import React, {useState} from "react";
import CategoryDetailTable from "./CategoryDetailTable";

// Example data for demonstration
const incomeCategories = ["Salary", "Other"];
const expenseCategories = [
	"Invoices",
	"Transportation",
	"Groceries",
	"Entertainment",
];

const yearlySummaryData = {
	income: {
		Salary: [
			1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000,
			1000,
		],
		Other: [200, 150, 180, 220, 210, 190, 200, 210, 220, 230, 240, 250],
	},
	expenses: {
		Invoices: [300, 320, 310, 305, 315, 325, 330, 340, 350, 360, 370, 380],
		Transportation: [
			100, 120, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155,
		],
		Groceries: [400, 420, 410, 405, 415, 425, 430, 440, 450, 460, 470, 480],
		Entertainment: [50, 60, 55, 65, 70, 75, 80, 85, 90, 95, 100, 105],
	},
};

const categoryDetails: Record<string, {[subcategory: string]: number[]}> = {
	Salary: {
		Base: [
			1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000,
			1000,
		],
	},
	Other: {
		Freelance: [100, 100, 120, 120, 110, 90, 100, 110, 120, 130, 140, 150],
		Gifts: [100, 50, 60, 100, 100, 100, 100, 100, 100, 100, 100, 100],
	},
	Invoices: {
		Utilities: [100, 110, 105, 100, 110, 115, 120, 125, 130, 135, 140, 145],
		Rent: [200, 210, 205, 205, 205, 210, 210, 215, 220, 225, 230, 235],
	},
	Transportation: {
		Bus: [50, 60, 55, 60, 60, 65, 70, 70, 75, 80, 80, 85],
		Taxi: [50, 60, 55, 55, 60, 60, 60, 65, 65, 65, 70, 70],
	},
	Groceries: {
		Supermarket: [
			300, 320, 310, 305, 315, 325, 330, 340, 350, 360, 370, 380,
		],
		Market: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
	},
	Entertainment: {
		Movies: [20, 30, 25, 35, 40, 45, 50, 55, 60, 65, 70, 75],
		Games: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
	},
};

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const YearlySummaryTable: React.FC = () => {
	const [selectedCategory, setSelectedCategory] = useState<string | null>(
		null,
	);

	// Gather all categories for selector row
	const allCategories = [
		...incomeCategories.map(cat => ({name: cat, type: "income" as const})),
		...expenseCategories.map(cat => ({
			name: cat,
			type: "expense" as const,
		})),
	];

	// Find the summary row for the selected category
	const getCategoryDetail = (category: string) =>
		categoryDetails[category] || {};

	// Calculate totals per month
	const incomeTotals = months.map((_, i) =>
		Object.values(yearlySummaryData.income).reduce(
			(sum, arr) => sum + (arr[i] || 0),
			0,
		),
	);
	const expenseTotals = months.map((_, i) =>
		Object.values(yearlySummaryData.expenses).reduce(
			(sum, arr) => sum + (arr[i] || 0),
			0,
		),
	);
	const savings = months.map((_, i) => incomeTotals[i] - expenseTotals[i]);

	return (
		<div className="flex flex-col md:flex-row gap-6 w-full pb-8">
			<div className="flex-1 w-full">
				{/* Always show the selector row */}
				<div className="relative overflow-x-auto shadow-md rounded-t-lg">
					<table className="w-full min-w-[900px] text-sm text-left rtl:text-center text-gray-500 dark:text-gray-400 border-collapse">
						<tbody>
							<tr className="bg-gray-100 dark:bg-gray-800">
								<th
									className="px-6 py-3 text-left font-semibold"
									colSpan={13}
								>
									<div className="flex flex-wrap gap-2">
										<button
											type="button"
											className="px-3 py-1 rounded text-xs font-medium border border-transparent transition-colors bg-blue-600 text-white dark:bg-blue-700 cursor-pointer"
											onClick={() =>
												setSelectedCategory(null)
											}
											disabled={!selectedCategory}
										>
											Back to Summary
										</button>
										{allCategories.map(cat => (
											<button
												key={cat.name}
												type="button"
												className={`px-3 py-1 rounded text-xs font-medium border border-transparent transition-colors
                          ${cat.type === "income" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"}
                          hover:bg-blue-200 dark:hover:bg-blue-700 cursor-pointer`}
												onClick={() =>
													setSelectedCategory(
														cat.name,
													)
												}
											>
												{cat.name}
											</button>
										))}
									</div>
								</th>
							</tr>
						</tbody>
					</table>
				</div>
				{selectedCategory ? (
					<CategoryDetailTable
						categoryName={selectedCategory}
						subcategories={getCategoryDetail(selectedCategory)}
					/>
				) : (
					<div className="relative overflow-x-auto shadow-md rounded-b-lg">
						<table className="w-full min-w-[900px] text-sm text-left rtl:text-center text-gray-500 dark:text-gray-400 border-collapse">
							<tbody>
								{/* Expenses Section Header */}
								<tr className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
									<th
										scope="col"
										className="sticky whitespace-nowrap left-0 z-20 px-6 py-4 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-left"
									>
										Income
									</th>
									{months.map(month => (
										<th
											key={month}
											scope="col"
											className="px-6 py-3 text-center font-semibold"
											aria-label="Income section"
										>
											{month}
										</th>
									))}
								</tr>
								{/* Income Rows */}
								{Object.entries(yearlySummaryData.income).map(
									([cat, values]) => (
										<tr
											key={cat}
											className={`odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 transition`}
											onClick={() =>
												setSelectedCategory(cat)
											}
										>
											<th
												scope="row"
												className="sticky whitespace-nowrap left-0 z-10 px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-inherit"
											>
												{cat}
											</th>
											{values.map((val, i) => (
												<td
													key={i}
													className="px-6 py-3 text-center"
												>
													{val}
												</td>
											))}
										</tr>
									),
								)}
								{/* Total Income Row */}
								<tr className="bg-green-600 bg-opacity-30 dark:bg-green-900 dark:bg-opacity-80 font-bold text-green-900 dark:text-green-200">
									<td className="sticky whitespace-nowrap left-0 z-10 px-6 py-3 bg-green-600 bg-opacity-30 dark:bg-green-900 dark:bg-opacity-80">
										Total Income
									</td>
									{incomeTotals.map((val, i) => (
										<td
											key={i}
											className="px-6 py-3 text-center"
										>
											{val}
										</td>
									))}
								</tr>
								{/* Expenses Section Header */}
								<tr className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
									<th
										scope="col"
										className="sticky whitespace-nowrap left-0 z-20 px-6 py-4 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-left"
									>
										Expenses
									</th>
									{months.map(month => (
										<th
											key={month}
											scope="col"
											className="px-6 py-3 text-center font-semibold"
											aria-label="Expenses section"
										>
											{month}
										</th>
									))}
								</tr>
								{/* Expenses Rows */}
								{Object.entries(yearlySummaryData.expenses).map(
									([cat, values]) => (
										<tr
											key={cat}
											className={`odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 transition`}
											onClick={() =>
												setSelectedCategory(cat)
											}
										>
											<th
												scope="row"
												className="sticky whitespace-nowrap left-0 z-10 px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-inherit"
											>
												{cat}
											</th>
											{values.map((val, i) => (
												<td
													key={i}
													className="px-6 py-3 text-center"
												>
													{val}
												</td>
											))}
										</tr>
									),
								)}
								{/* Total Expenses Row */}
								<tr className="bg-red-600 bg-opacity-30 dark:bg-red-900 dark:bg-opacity-80 font-bold text-red-900 dark:text-red-200">
									<td className="sticky whitespace-nowrap left-0 z-10 px-6 py-3 bg-red-600 bg-opacity-30 dark:bg-red-900 dark:bg-opacity-80">
										Total Expenses
									</td>
									{expenseTotals.map((val, i) => (
										<td
											key={i}
											className="px-6 py-3 text-center"
										>
											{val}
										</td>
									))}
								</tr>
								{/* Savings Row */}
								<tr className="bg-yellow-400 bg-opacity-30 dark:bg-yellow-900 dark:bg-opacity-80 font-bold text-yellow-900 dark:text-yellow-100">
									<td className="sticky whitespace-nowrap left-0 z-10 px-6 py-3 bg-yellow-400 bg-opacity-30 dark:bg-yellow-900 dark:bg-opacity-80">
										Savings
									</td>
									{savings.map((val, i) => (
										<td
											key={i}
											className="px-6 py-3 text-center"
										>
											{val}
										</td>
									))}
								</tr>
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
};

export default YearlySummaryTable;
