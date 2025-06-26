import React, {useState} from "react";
import YearlySummaryTable from "./YearlySummaryTable";
import CategoryDetailTable from "./CategoryDetailTable";

// Example data for demonstration
const incomeCategories = ["Salary", "Other"];
const expenseCategories = [
	"Invoices",
	"Transportation",
	"Groceries",
	"Entertainment",
];

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

const FinanceDashboard: React.FC = () => {
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

	return (
		<div className="flex flex-col md:flex-row gap-6 w-full">
			{/* Main View */}
			<div className="flex-1 w-full">
				{/* Always show the selector row */}
				<div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-2">
					<table className="w-full min-w-[900px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse">
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
					<YearlySummaryTable />
				)}
			</div>
		</div>
	);
};

export default FinanceDashboard;
