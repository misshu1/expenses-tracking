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
import type {FC} from "react";
import {useForm, useFieldArray} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {BudgetPlannerSchema} from "./validation-schema";
import type {BudgetPlannerInput} from "./validation-schema";
import Category from "./Category";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
);

const defaultValues: BudgetPlannerInput = {
	categories: [
		{
			name: "Housing",
			categoryType: "expense",
			budget: 12000,
			monthlyLimit: 1000,
			subcategories: [{name: "Rent"}, {name: "Utilities"}],
		},
		{
			name: "Groceries",
			categoryType: "expense",
			budget: 6000,
			monthlyLimit: 500,
			subcategories: [{name: "Supermarket"}, {name: "Market"}],
		},
	],
};

const BudgetPlanner: FC = () => {
	const {
		control,
		handleSubmit,
		formState: {errors},
	} = useForm<BudgetPlannerInput>({
		resolver: zodResolver(BudgetPlannerSchema),
		defaultValues,
		mode: "all",
		reValidateMode: "onBlur",
	});
	const {fields, append, remove} = useFieldArray({
		control,
		name: "categories",
	});

	const onSubmit = (data: BudgetPlannerInput) => {
		console.log(data);
	};

	return (
		<div className="max-w-2xl mx-auto p-2 sm:p-4 flex flex-col gap-6">
			<h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-gray-100">
				<Icon icon="ri:bar-chart-2-line" width={28} /> Budget Planner
			</h2>
			{/* Chart (optional, can be moved below form if preferred) */}
			<div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4">
				<h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
					Budget Overview
				</h3>
				<Bar
					data={{
						labels: fields.map(cat => cat.name),
						datasets: [
							{
								label: "Annual Budget",
								data: fields.map(cat => cat.budget),
								backgroundColor: "rgba(59, 130, 246, 0.7)",
							},
						],
					}}
					options={{
						responsive: true,
						plugins: {legend: {display: false}},
					}}
				/>
			</div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-6"
			>
				<Category
					control={control}
					errors={errors}
					fields={fields}
					remove={remove}
				/>
				<button
					type="button"
					className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow mt-2"
					onClick={() =>
						append({
							name: "",
							categoryType: "expense",
							budget: undefined,
							monthlyLimit: undefined,
							subcategories: [],
						})
					}
				>
					+ Add Category
				</button>
				<button
					type="submit"
					className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow mt-2"
				>
					Save Budget
				</button>
			</form>
		</div>
	);
};

export default BudgetPlanner;
