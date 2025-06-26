import * as React from "react";
import {Icon} from "@iconify/react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {addExpenseSchema} from "./validation-schema";
import type {AddExpenseFormValues} from "./validation-schema";
import type {Currency} from "../../utils/currencyUtils";

const categories = {
	Invoices: ["Phone", "Internet", "Electricity", "Water", "Gas"],
	Transportation: ["Fuel", "Public Transport", "Taxi", "Parking"],
	Health: ["Pharmacy", "Doctor", "Insurance"],
	Home: ["Rent", "Maintenance", "Furniture", "Appliances"],
	Vacations: ["Flights", "Hotels", "Activities", "Food"],
	Groceries: ["Supermarket", "Market", "Bakery"],
	Entertainment: ["Movies", "Concerts", "Games"],
	Other: ["Other"],
};

const getInitialCurrency = (): Currency => {
	if (typeof window !== "undefined") {
		const stored = window.localStorage.getItem("currency");
		if (stored === "RON" || stored === "EUR" || stored === "USD")
			return stored;
	}
	return "RON";
};

interface AddExpenseFormProps {
	onSubmit?: (data: AddExpenseFormValues) => void;
}

const AddExpenseForm: React.FC<AddExpenseFormProps> = ({onSubmit}) => {
	const [currency, setCurrency] =
		React.useState<Currency>(getInitialCurrency);
	const [category, setCategory] =
		React.useState<keyof typeof categories>("Invoices");
	const [subcategory, setSubcategory] = React.useState(
		categories["Invoices"][0],
	);

	const {
		register,
		handleSubmit,
		setValue,
		formState: {errors},
		reset,
	} = useForm<AddExpenseFormValues>({
		resolver: zodResolver(addExpenseSchema),
		defaultValues: {
			category: "Invoices",
			subcategory: categories["Invoices"][0],
			amount: undefined,
			currency,
			date: "",
			notes: "",
		},
	});

	React.useEffect(() => {
		setSubcategory(categories[category][0]);
		setValue("category", category);
		setValue("subcategory", categories[category][0]);
	}, [category, setValue]);

	React.useEffect(() => {
		setValue("currency", currency);
	}, [currency, setValue]);

	React.useEffect(() => {
		const stored = window.localStorage.getItem("currency");
		if (stored === "RON" || stored === "EUR" || stored === "USD")
			setCurrency(stored);
	}, []);

	const onFormSubmit = (data: AddExpenseFormValues) => {
		if (onSubmit) onSubmit(data);
		reset();
	};

	return (
		<form
			onSubmit={handleSubmit(onFormSubmit)}
			className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 max-w-md mx-auto flex flex-col gap-4"
		>
			<h2 className="text-xl font-semibold mb-2 flex items-center gap-2 text-gray-900 dark:text-gray-100">
				<Icon icon="ri:money-dollar-circle-line" width={24} /> Add
				Expense
			</h2>
			<div className="flex flex-col gap-2">
				<label className="font-medium text-gray-900 dark:text-gray-100">
					Category
				</label>
				<select
					className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
					value={category}
					onChange={e => {
						setCategory(e.target.value as keyof typeof categories);
						setValue(
							"category",
							e.target.value as keyof typeof categories,
						);
					}}
				>
					{Object.keys(categories).map(cat => (
						<option key={cat} value={cat}>
							{cat}
						</option>
					))}
				</select>
				{errors.category && (
					<span className="text-red-600 dark:text-red-400 text-sm">
						{errors.category.message}
					</span>
				)}
			</div>
			<div className="flex flex-col gap-2">
				<label className="font-medium text-gray-900 dark:text-gray-100">
					Subcategory
				</label>
				<select
					className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
					value={subcategory}
					onChange={e => {
						setSubcategory(e.target.value);
						setValue("subcategory", e.target.value);
					}}
				>
					{categories[category].map((sub: string) => (
						<option key={sub} value={sub}>
							{sub}
						</option>
					))}
				</select>
				{errors.subcategory && (
					<span className="text-red-600 dark:text-red-400 text-sm">
						{errors.subcategory.message}
					</span>
				)}
			</div>
			<div className="flex flex-col gap-2">
				<label className="font-medium text-gray-900 dark:text-gray-100">
					Amount ({currency})
				</label>
				<input
					type="number"
					min="0"
					step="0.01"
					className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
					{...register("amount", {valueAsNumber: true})}
					placeholder="0.00"
				/>
				{errors.amount && (
					<span className="text-red-600 dark:text-red-400 text-sm">
						{errors.amount.message}
					</span>
				)}
			</div>
			<div className="flex flex-col gap-2">
				<label className="font-medium text-gray-900 dark:text-gray-100">
					Date
				</label>
				<input
					type="date"
					className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
					{...register("date")}
				/>
				{errors.date && (
					<span className="text-red-600 dark:text-red-400 text-sm">
						{errors.date.message}
					</span>
				)}
			</div>
			<div className="flex flex-col gap-2">
				<label className="font-medium text-gray-900 dark:text-gray-100">
					Notes{" "}
					<span className="text-gray-400 dark:text-gray-500">
						(optional)
					</span>
				</label>
				<textarea
					className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
					{...register("notes")}
					placeholder="Add any notes..."
					rows={2}
				/>
				{errors.notes && (
					<span className="text-red-600 dark:text-red-400 text-sm">
						{errors.notes.message}
					</span>
				)}
			</div>
			<button
				type="submit"
				className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded px-4 py-2 mt-2 transition-colors"
			>
				Add Expense
			</button>
		</form>
	);
};

export default AddExpenseForm;
