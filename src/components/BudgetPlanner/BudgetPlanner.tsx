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
import {useForm, useFieldArray} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {BudgetPlannerSchema} from "./validation-schema";
import type {BudgetPlannerInput} from "./validation-schema";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
);

const defaultValues: BudgetPlannerInput = {
	annualIncome: 50000,
	categories: [
		{
			name: "Housing",
			budget: 12000,
			notes: "",
			monthlyLimit: 1000,
			subcategories: [
				{name: "Rent", budget: 10000, notes: ""},
				{name: "Utilities", budget: 2000, notes: ""},
			],
		},
		{
			name: "Groceries",
			budget: 6000,
			notes: "",
			monthlyLimit: 500,
			subcategories: [
				{name: "Supermarket", budget: 4000, notes: ""},
				{name: "Market", budget: 2000, notes: ""},
			],
		},
	],
};

// Child component for a single category row and its subcategories
function CategoryRow({
	cat,
	catIdx,
	control,
	register,
	errors,
	expanded,
	setExpanded,
}: {
	cat: any;
	catIdx: number;
	control: any;
	register: any;
	errors: any;
	expanded: number | null;
	setExpanded: (idx: number | null) => void;
}) {
	const {fields, append, remove} = useFieldArray({
		control,
		name: `categories.${catIdx}.subcategories`,
	});
	return (
		<React.Fragment key={cat.id}>
			<tr className="even:bg-gray-50 even:dark:bg-gray-900">
				<td className="p-2 border border-gray-200 dark:border-gray-700 text-center">
					<button
						type="button"
						aria-label={expanded === catIdx ? "Collapse" : "Expand"}
						className="text-gray-500 hover:text-blue-600"
						onClick={() =>
							setExpanded(expanded === catIdx ? null : catIdx)
						}
					>
						<Icon
							icon={
								expanded === catIdx
									? "ri:arrow-down-s-line"
									: "ri:arrow-right-s-line"
							}
							width={22}
						/>
					</button>
				</td>
				<td className="p-2 border border-gray-200 dark:border-gray-700">
					<input
						className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 w-32 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
						{...register(`categories.${catIdx}.name` as const)}
					/>
					{errors.categories?.[catIdx]?.name && (
						<div className="text-red-500 text-xs mt-1">
							{errors.categories[catIdx]?.name?.message}
						</div>
					)}
				</td>
				<td className="p-2 border border-gray-200 dark:border-gray-700">
					<input
						type="number"
						min="0"
						className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 w-24 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
						{...register(`categories.${catIdx}.budget` as const, {
							valueAsNumber: true,
						})}
					/>
					{errors.categories?.[catIdx]?.budget && (
						<div className="text-red-500 text-xs mt-1">
							{errors.categories[catIdx]?.budget?.message}
						</div>
					)}
				</td>
				<td className="p-2 border border-gray-200 dark:border-gray-700">
					<input
						type="number"
						min="0"
						className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 w-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
						{...register(
							`categories.${catIdx}.monthlyLimit` as const,
							{valueAsNumber: true},
						)}
						disabled={false}
					/>
					{errors.categories?.[catIdx]?.monthlyLimit && (
						<div className="text-red-500 text-xs mt-1">
							{errors.categories[catIdx]?.monthlyLimit?.message}
						</div>
					)}
				</td>
				<td className="p-2 border border-gray-200 dark:border-gray-700">
					<input
						className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 w-32 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
						{...register(`categories.${catIdx}.notes` as const)}
					/>
				</td>
				<td className="p-2 border border-gray-200 dark:border-gray-700 text-center">
					<button
						type="button"
						className="text-red-500 hover:text-red-700"
						onClick={() => {
							// Remove category at parent
							const event = new CustomEvent("removeCategory", {
								detail: catIdx,
							});
							window.dispatchEvent(event);
						}}
						aria-label="Remove category"
					>
						<Icon icon="ri:delete-bin-6-line" width={20} />
					</button>
				</td>
			</tr>
			{/* Subcategories Panel */}
			{expanded === catIdx && (
				<tr>
					<td
						colSpan={6}
						className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
					>
						<div className="p-4 flex flex-col gap-2">
							<div className="flex items-center justify-between mb-2">
								<span className="font-semibold text-gray-900 dark:text-gray-100">
									Subcategories
								</span>
								<button
									type="button"
									className="text-blue-600 hover:underline text-sm"
									onClick={() =>
										append({name: "", budget: 0, notes: ""})
									}
								>
									+ Add Subcategory
								</button>
							</div>
							<div className="flex flex-col gap-2">
								{fields.length === 0 && (
									<span className="text-gray-500 text-sm">
										No subcategories yet.
									</span>
								)}
								{fields.map((sub, subIdx) => (
									<div
										key={sub.id}
										className="flex flex-wrap gap-2 items-center border-b border-gray-100 dark:border-gray-700 pb-2"
									>
										<input
											className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 w-32 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
											{...register(
												`categories.${catIdx}.subcategories.${subIdx}.name` as const,
											)}
											placeholder="Subcategory"
										/>
										<input
											type="number"
											min="0"
											className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 w-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
											{...register(
												`categories.${catIdx}.subcategories.${subIdx}.budget` as const,
												{valueAsNumber: true},
											)}
											placeholder="Budget"
										/>
										<input
											className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 w-32 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
											{...register(
												`categories.${catIdx}.subcategories.${subIdx}.notes` as const,
											)}
											placeholder="Notes"
										/>
										<button
											type="button"
											className="text-red-500 hover:text-red-700 ml-2"
											onClick={() => remove(subIdx)}
											aria-label="Remove subcategory"
										>
											<Icon
												icon="ri:delete-bin-6-line"
												width={18}
											/>
										</button>
										{errors.categories?.[catIdx]
											?.subcategories?.[subIdx]?.name && (
											<div className="text-red-500 text-xs mt-1">
												{
													errors.categories[catIdx]
														?.subcategories?.[
														subIdx
													]?.name?.message
												}
											</div>
										)}
										{errors.categories?.[catIdx]
											?.subcategories?.[subIdx]
											?.budget && (
											<div className="text-red-500 text-xs mt-1">
												{
													errors.categories[catIdx]
														?.subcategories?.[
														subIdx
													]?.budget?.message
												}
											</div>
										)}
									</div>
								))}
							</div>
						</div>
					</td>
				</tr>
			)}
		</React.Fragment>
	);
}

const BudgetPlanner: React.FC = () => {
	const {
		register,
		control,
		handleSubmit,
		setValue,
		watch,
		formState: {errors},
	} = useForm<BudgetPlannerInput>({
		resolver: zodResolver(BudgetPlannerSchema),
		defaultValues,
		mode: "onBlur",
	});

	const {
		fields: categoryFields,
		append: appendCategory,
		remove: removeCategory,
	} = useFieldArray({
		control,
		name: "categories",
	});

	const [autoCalc, setAutoCalc] = React.useState(false);
	const [newCategory, setNewCategory] = React.useState("");
	const [expanded, setExpanded] = React.useState<number | null>(null);

	// Watch categories for chart and auto-calc
	const categories = watch("categories");

	React.useEffect(() => {
		if (autoCalc) {
			categories.forEach((cat, idx) => {
				setValue(
					`categories.${idx}.monthlyLimit`,
					Math.round(cat.budget / 12),
				);
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [autoCalc, categories.length]);

	React.useEffect(() => {
		// Listen for removeCategory event from child
		const handler = (e: any) => removeCategory(e.detail);
		window.addEventListener("removeCategory", handler);
		return () => window.removeEventListener("removeCategory", handler);
	}, [removeCategory]);

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

	const onSubmit = (data: BudgetPlannerInput) => {
		alert("Yearly budget created!\n" + JSON.stringify(data, null, 2));
	};

	return (
		<div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 max-w-5xl mx-auto flex flex-col gap-8">
			<h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-gray-100">
				<Icon icon="ri:calendar-event-line" width={28} /> Yearly Budget
				Planner
			</h2>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-8"
			>
				{/* Annual Income Section */}
				<section className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 flex flex-col gap-2">
					<label className="font-medium text-gray-900 dark:text-gray-100">
						Total Annual Income
					</label>
					<input
						type="number"
						min="0"
						className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 w-48 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
						{...register("annualIncome", {valueAsNumber: true})}
					/>
					{errors.annualIncome && (
						<div className="text-red-500 text-sm mt-1">
							{errors.annualIncome.message}
						</div>
					)}
				</section>
				{/* Auto-calc toggle */}
				<div className="flex items-center gap-2">
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
				{/* Categories Table */}
				<section className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
					<div className="flex justify-between items-center mb-2">
						<h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
							Categories
						</h3>
						<div className="flex gap-2">
							<input
								className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 w-48 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
								value={newCategory}
								onChange={e => setNewCategory(e.target.value)}
								placeholder="New category name"
							/>
							<button
								type="button"
								className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded px-4 py-2 transition-colors"
								onClick={() => {
									if (!newCategory.trim()) return;
									appendCategory({
										name: newCategory,
										budget: 0,
										notes: "",
										monthlyLimit: 0,
										subcategories: [],
									});
									setNewCategory("");
								}}
							>
								Add Category
							</button>
						</div>
					</div>
					<table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg">
						<thead>
							<tr className="bg-gray-100 dark:bg-gray-900">
								<th className="p-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"></th>
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
								<th className="p-2 border border-gray-200 dark:border-gray-700"></th>
							</tr>
						</thead>
						<tbody>
							{categoryFields.map((cat, catIdx) => (
								<CategoryRow
									key={cat.id}
									cat={cat}
									catIdx={catIdx}
									control={control}
									register={register}
									errors={errors}
									expanded={expanded}
									setExpanded={setExpanded}
								/>
							))}
						</tbody>
					</table>
				</section>
				{/* Budget Preview */}
				<section className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
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
				</section>
				<button
					type="submit"
					className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded px-6 py-2 transition-colors self-end"
				>
					Create Yearly Budget
				</button>
			</form>
		</div>
	);
};

export default BudgetPlanner;
