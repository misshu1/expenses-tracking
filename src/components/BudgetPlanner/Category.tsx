import {
	Controller,
	type Control,
	type FieldArrayWithId,
	type FieldErrors,
	type UseFieldArrayRemove,
} from "react-hook-form";
import {Icon} from "@iconify/react";
import type {FC} from "react";
import Subcategory from "./Subcategory";
import type {BudgetPlannerInput} from "./validation-schema";
import TextField from "@ui/inputs/TextField";
import DropdownField from "@ui/inputs/DropdownField";

type CategoryProps = {
	fields: FieldArrayWithId<BudgetPlannerInput>[];
	control: Control<BudgetPlannerInput>;
	errors: FieldErrors<BudgetPlannerInput>;
	remove: UseFieldArrayRemove;
};

const Category: FC<CategoryProps> = ({fields, control, errors, remove}) => {
	const categoryTypeOptions = [
		{label: "Income", value: "income"},
		{label: "Expense", value: "expense"},
	];

	return (
		<div className="flex flex-col gap-4">
			{fields.map((cat, catIdx) => {
				// Get the current category type to conditionally render fields
				const currentCategoryType =
					control._formValues.categories?.[catIdx]?.categoryType;
				const isIncome = currentCategoryType === "income";

				return (
					<div
						key={cat.id}
						className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col gap-3 relative"
					>
						<span className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
							Category
						</span>
						<div className="flex flex-col gap-2 w-full">
							{/* Category Type Dropdown */}
							<div className="flex-1 min-w-0">
								<Controller
									name={
										`categories.${catIdx}.categoryType` as const
									}
									control={control}
									render={({
										field: {ref, ...field},
										fieldState: {invalid, isDirty, error},
									}) => (
										<DropdownField
											{...field}
											name={`categories.${catIdx}.categoryType`}
											label="Category Type"
											options={categoryTypeOptions}
											isInvalid={invalid}
											isValid={!invalid && isDirty}
											error={error?.message}
											value={field.value ?? ""}
										/>
									)}
								/>
							</div>
							{/* Category Name - Always visible */}
							<div className="flex-1 min-w-0">
								<Controller
									name={`categories.${catIdx}.name` as const}
									control={control}
									render={({
										field,
										fieldState: {invalid, isDirty, error},
									}) => (
										<TextField
											{...field}
											type="text"
											label="Category"
											isInvalid={invalid}
											isValid={!invalid && isDirty}
											error={error?.message}
											value={field.value ?? ""}
											placeholder="Name"
										/>
									)}
								/>
							</div>
							{/* Budget and Monthly Limit - Only visible for expense categories */}
							{!isIncome && (
								<>
									<div className="flex-1 min-w-0">
										<Controller
											name={
												`categories.${catIdx}.budget` as const
											}
											control={control}
											render={({
												field,
												fieldState: {
													invalid,
													isDirty,
													error,
												},
											}) => (
												<TextField
													{...field}
													type="number"
													label="Annual Budget"
													isInvalid={invalid}
													isValid={
														!invalid && isDirty
													}
													error={error?.message}
													value={field.value}
													placeholder="Amount"
												/>
											)}
										/>
									</div>
									<div className="flex-1 min-w-0">
										<Controller
											name={
												`categories.${catIdx}.monthlyLimit` as const
											}
											control={control}
											render={({
												field,
												fieldState: {
													invalid,
													isDirty,
													error,
												},
											}) => (
												<TextField
													{...field}
													type="number"
													label="Monthly Limit"
													isInvalid={invalid}
													isValid={
														!invalid && isDirty
													}
													error={error?.message}
													value={field.value ?? ""}
													placeholder="Amount"
												/>
											)}
										/>
									</div>
								</>
							)}
						</div>
						{/* Subcategories - Always visible for both income and expense categories */}
						<Subcategory
							errors={errors}
							catIdx={catIdx}
							control={control}
						/>
						{/* Delete Category Button (bottom of card) */}
						<button
							type="button"
							className="mt-4 w-full flex items-center justify-center gap-2 border border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 font-semibold rounded-lg py-2 transition-colors"
							onClick={() => remove(catIdx)}
							aria-label="Delete category"
						>
							<Icon icon="ri:delete-bin-6-line" width={20} />
							Delete Category
						</button>
					</div>
				);
			})}
		</div>
	);
};

export default Category;
