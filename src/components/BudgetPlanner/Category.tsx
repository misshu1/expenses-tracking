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

type CategoryProps = {
	fields: FieldArrayWithId<BudgetPlannerInput>[];
	control: Control<BudgetPlannerInput>;
	errors: FieldErrors<BudgetPlannerInput>;
	remove: UseFieldArrayRemove;
};

const Category: FC<CategoryProps> = ({fields, control, errors, remove}) => {
	return (
		<div className="flex flex-col gap-4">
			{fields.map((cat, catIdx) => {
				return (
					<div
						key={cat.id}
						className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col gap-3 relative"
					>
						<span className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
							Category
						</span>
						<div className="flex flex-col gap-2 w-full">
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
							<div className="flex-1 min-w-0">
								<Controller
									name={
										`categories.${catIdx}.budget` as const
									}
									control={control}
									render={({
										field,
										fieldState: {invalid, isDirty, error},
									}) => (
										<TextField
											{...field}
											type="text"
											label="Annual Budget"
											isInvalid={invalid}
											isValid={!invalid && isDirty}
											error={error?.message}
											value={
												field.value !== undefined &&
												field.value !== null
													? String(field.value)
													: ""
											}
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
										fieldState: {invalid, isDirty, error},
									}) => (
										<TextField
											{...field}
											type="text"
											label="Monthly Limit"
											isInvalid={invalid}
											isValid={!invalid && isDirty}
											error={error?.message}
											value={
												field.value !== undefined &&
												field.value !== null
													? String(field.value)
													: ""
											}
											placeholder="Amount"
										/>
									)}
								/>
							</div>
						</div>
						{/* Subcategories */}
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
