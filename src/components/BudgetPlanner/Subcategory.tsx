import TextField from "@ui/inputs/TextField";
import type {FC} from "react";
import {
	Controller,
	useFieldArray,
	type Control,
	type FieldErrors,
} from "react-hook-form";
import type {BudgetPlannerInput} from "./validation-schema";
import {Icon} from "@iconify/react";

type SubcategoryProps = {
	catIdx: number;
	control: Control<BudgetPlannerInput>;
	errors: FieldErrors<BudgetPlannerInput>;
};

const Subcategory: FC<SubcategoryProps> = ({catIdx, control, errors}) => {
	const {fields, append, remove} = useFieldArray({
		control,
		name: `categories.${catIdx}.subcategories`,
	});

	return (
		<div className="flex flex-col gap-2 mt-2">
			<div className="flex items-center justify-between mb-1">
				<span className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
					Subcategories
				</span>
				<button
					type="button"
					className="text-blue-600 hover:underline text-sm"
					onClick={() =>
						append({
							name: "",
						})
					}
				>
					+ Add Subcategory
				</button>
			</div>
			{fields.length === 0 && (
				<span className="text-gray-500 text-xs">
					No subcategories yet.
				</span>
			)}
			{fields.map((sub, subIdx) => (
				<div key={sub.id} className="flex items-center gap-2 w-full">
					<div className="flex-1 min-w-0">
						<Controller
							name={
								`categories.${catIdx}.subcategories.${subIdx}.name` as const
							}
							control={control}
							render={({field}) => (
								<TextField
									{...field}
									type="text"
									label="Subcategory"
									placeholder="Name"
									isValid={
										!!field.value &&
										!errors.categories?.[catIdx]
											?.subcategories?.[subIdx]?.name
									}
									isInvalid={
										!!errors.categories?.[catIdx]
											?.subcategories?.[subIdx]?.name
									}
									error={
										errors.categories?.[catIdx]
											?.subcategories?.[subIdx]?.name
											?.message
									}
									value={field.value ?? ""}
								/>
							)}
						/>
					</div>
					<button
						type="button"
						className="p-2 rounded-full text-red-500 hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
						onClick={() => remove(subIdx)}
						aria-label="Delete subcategory"
					>
						<Icon icon="ri:delete-bin-6-line" width={22} />
					</button>
				</div>
			))}
		</div>
	);
};

export default Subcategory;
