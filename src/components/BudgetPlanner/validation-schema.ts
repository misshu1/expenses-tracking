import {z} from "zod";

export const SubcategorySchema = z.object({
	name: z.string().min(1, "Subcategory name is required"),
});

export const CategorySchema = z
	.object({
		name: z.string().min(1, "Category name is required"),
		categoryType: z.enum(["income", "expense"], {
			required_error: "Category type is required",
		}),
		budget: z.number().min(0, "Budget must be 0 or greater").optional(),
		monthlyLimit: z
			.number()
			.min(0, "Monthly limit must be 0 or greater")
			.optional(),
		subcategories: z.array(SubcategorySchema),
	})
	.refine(
		data => {
			// If category type is expense, budget and monthlyLimit are required
			if (data.categoryType === "expense") {
				return (
					data.budget !== undefined && data.monthlyLimit !== undefined
				);
			}
			return true;
		},
		{
			message:
				"Budget and monthly limit are required for expense categories",
			path: ["budget"], // This will show the error on the budget field
		},
	);

export const BudgetPlannerSchema = z.object({
	categories: z
		.array(CategorySchema)
		.min(1, "At least one category is required"),
});

export type SubcategoryInput = z.infer<typeof SubcategorySchema>;
export type CategoryInput = z.infer<typeof CategorySchema>;
export type BudgetPlannerInput = z.infer<typeof BudgetPlannerSchema>;
