import * as React from "react";
import {Icon} from "@iconify/react";
import {Bar} from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
);

interface Subcategory {
	name: string;
	budget: number;
	notes: string;
}

interface Category {
	name: string;
	budget: number;
	notes: string;
	subcategories: Subcategory[];
	monthlyLimit: number;
}

const defaultCategories: Category[] = [
	{
		name: "Housing",
		budget: 12000,
		notes: "",
		subcategories: [
			{name: "Rent", budget: 10000, notes: ""},
			{name: "Utilities", budget: 2000, notes: ""},
		],
		monthlyLimit: 1000,
	},
	{
		name: "Groceries",
		budget: 6000,
		notes: "",
		subcategories: [
			{name: "Supermarket", budget: 4000, notes: ""},
			{name: "Market", budget: 2000, notes: ""},
		],
		monthlyLimit: 500,
	},
];

const BudgetPlanner: React.FC = () => {
	const [annualIncome, setAnnualIncome] = React.useState(50000);
	const [categories, setCategories] =
		React.useState<Category[]>(defaultCategories);
	const [newCategory, setNewCategory] = React.useState("");
	const [autoCalc, setAutoCalc] = React.useState(false);

	// Add new category
	const handleAddCategory = () => {
		if (!newCategory.trim()) return;
		setCategories([
			...categories,
			{
				name: newCategory,
				budget: 0,
				notes: "",
				subcategories: [],
				monthlyLimit: 0,
			},
		]);
		setNewCategory("");
	};

	// Add subcategory
	const handleAddSubcategory = (catIdx: number) => {
		setCategories(categories => {
			const updated = [...categories];
			updated[catIdx].subcategories.push({
				name: "",
				budget: 0,
				notes: "",
			});
			return updated;
		});
	};

	// Update category or subcategory
	const handleChange = (
		catIdx: number,
		field: keyof Category,
		value: any,
	) => {
		setCategories(categories => {
			const updated = [...categories];
			(updated[catIdx] as any)[field] = value;
			return updated;
		});
	};
	const handleSubChange = (
		catIdx: number,
		subIdx: number,
		field: keyof Subcategory,
		value: any,
	) => {
		setCategories(categories => {
			const updated = [...categories];
			(updated[catIdx].subcategories[subIdx] as any)[field] = value;
			return updated;
		});
	};

	// Remove category or subcategory
	const handleRemoveCategory = (catIdx: number) => {
		setCategories(categories => categories.filter((_, i) => i !== catIdx));
	};
	const handleRemoveSubcategory = (catIdx: number, subIdx: number) => {
		setCategories(categories => {
			const updated = [...categories];
			updated[catIdx].subcategories = updated[
				catIdx
			].subcategories.filter((_, i) => i !== subIdx);
			return updated;
		});
	};

	// Auto-calculate monthly limits
	React.useEffect(() => {
		if (autoCalc) {
			setCategories(categories =>
				categories.map(cat => ({
					...cat,
					monthlyLimit: Math.round(cat.budget / 12),
				})),
			);
		}
	}, [autoCalc, categories.length]);

	// Chart data
	const chartData = {
		labels: categories.map(cat => cat.name),
		datasets: [
			{
				label: "Annual Budget",
				data: categories.map(cat => cat.budget),
				backgroundColor: "rgba(59, 130, 246, 0.7)",
			},
			{
				label: "Monthly Limit",
				data: categories.map(cat => cat.monthlyLimit),
				backgroundColor: "rgba(16, 185, 129, 0.7)",
			},
		],
	};

	return (
		<div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 max-w-5xl mx-auto flex flex-col gap-6">
			<h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-gray-100">
				<Icon icon="ri:calendar-event-line" width={28} /> Yearly Budget
				Planner
			</h2>
			<div className="flex flex-col md:flex-row gap-4 items-center mb-4">
				<label className="font-medium text-gray-900 dark:text-gray-100">
					Total Annual Income
				</label>
				<input
					type="number"
					min="0"
					className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 w-48 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
					value={annualIncome}
					onChange={e => setAnnualIncome(Number(e.target.value))}
				/>
			</div>
			<div className="flex items-center gap-2 mb-2">
				<input
					type="checkbox"
					id="auto-calc"
					checked={autoCalc}
					onChange={e => setAutoCalc(e.target.checked)}
				/>
				<label
					htmlFor="auto-calc"
					className="text-sm text-gray-900 dark:text-gray-100"
				>
					Auto-calculate monthly limits from annual budget
				</label>
			</div>
			<div className="overflow-x-auto">
				<table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg">
					<thead>
						<tr className="bg-gray-100 dark:bg-gray-900">
							<th className="p-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
								Category
							</th>
							<th className="p-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
								Annual Budget
							</th>
							<th className="p-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
								Monthly Limit
							</th>
							<th className="p-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
								Notes
							</th>
							<th className="p-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
								Subcategories
							</th>
							<th className="p-2 border border-gray-200 dark:border-gray-700"></th>
						</tr>
					</thead>
					<tbody>
						{categories.map((cat, catIdx) => (
							<tr
								key={catIdx}
								className="even:bg-gray-50 even:dark:bg-gray-900"
							>
								<td className="p-2 border border-gray-200 dark:border-gray-700">
									<input
										className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 w-32 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
										value={cat.name}
										onChange={e =>
											handleChange(
												catIdx,
												"name",
												e.target.value,
											)
										}
									/>
								</td>
								<td className="p-2 border border-gray-200 dark:border-gray-700">
									<input
										type="number"
										min="0"
										className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 w-24 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
										value={cat.budget}
										onChange={e =>
											handleChange(
												catIdx,
												"budget",
												Number(e.target.value),
											)
										}
									/>
								</td>
								<td className="p-2 border border-gray-200 dark:border-gray-700">
									<input
										type="number"
										min="0"
										className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 w-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
										value={cat.monthlyLimit}
										onChange={e =>
											handleChange(
												catIdx,
												"monthlyLimit",
												Number(e.target.value),
											)
										}
										disabled={autoCalc}
									/>
								</td>
								<td className="p-2 border border-gray-200 dark:border-gray-700">
									<input
										className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 w-32 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
										value={cat.notes}
										onChange={e =>
											handleChange(
												catIdx,
												"notes",
												e.target.value,
											)
										}
									/>
								</td>
								<td className="p-2 border border-gray-200 dark:border-gray-700">
									<table>
										<tbody>
											{cat.subcategories.map(
												(sub, subIdx) => (
													<tr
														key={subIdx}
														className="even:bg-gray-50 even:dark:bg-gray-900"
													>
														<td>
															<input
																className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 w-24 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
																value={sub.name}
																onChange={e =>
																	handleSubChange(
																		catIdx,
																		subIdx,
																		"name",
																		e.target
																			.value,
																	)
																}
																placeholder="Subcategory"
															/>
														</td>
														<td>
															<input
																type="number"
																min="0"
																className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 w-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
																value={
																	sub.budget
																}
																onChange={e =>
																	handleSubChange(
																		catIdx,
																		subIdx,
																		"budget",
																		Number(
																			e
																				.target
																				.value,
																		),
																	)
																}
																placeholder="Budget"
															/>
														</td>
														<td>
															<input
																className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 w-24 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
																value={
																	sub.notes
																}
																onChange={e =>
																	handleSubChange(
																		catIdx,
																		subIdx,
																		"notes",
																		e.target
																			.value,
																	)
																}
																placeholder="Notes"
															/>
														</td>
														<td>
															<button
																type="button"
																className="text-red-500 hover:text-red-700 ml-2"
																onClick={() =>
																	handleRemoveSubcategory(
																		catIdx,
																		subIdx,
																	)
																}
															>
																<Icon
																	icon="ri:delete-bin-6-line"
																	width={18}
																/>
															</button>
														</td>
													</tr>
												),
											)}
											<tr>
												<td colSpan={4}>
													<button
														type="button"
														className="text-blue-600 hover:underline text-sm mt-1"
														onClick={() =>
															handleAddSubcategory(
																catIdx,
															)
														}
													>
														+ Add Subcategory
													</button>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
								<td className="p-2 border border-gray-200 dark:border-gray-700">
									<button
										type="button"
										className="text-red-500 hover:text-red-700"
										onClick={() =>
											handleRemoveCategory(catIdx)
										}
									>
										<Icon
											icon="ri:delete-bin-6-line"
											width={20}
										/>
									</button>
								</td>
							</tr>
						))}
						<tr>
							<td
								colSpan={6}
								className="p-2 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
							>
								<div className="flex gap-2 items-center">
									<input
										className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 w-48 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
										value={newCategory}
										onChange={e =>
											setNewCategory(e.target.value)
										}
										placeholder="New category name"
									/>
									<button
										type="button"
										className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded px-4 py-2 transition-colors"
										onClick={handleAddCategory}
									>
										Add Category
									</button>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mt-4">
				<h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
					Budget Distribution Preview
				</h3>
				<Bar
					data={chartData}
					options={{
						responsive: true,
						plugins: {legend: {position: "top"}},
					}}
				/>
			</div>
		</div>
	);
};

export default BudgetPlanner;
