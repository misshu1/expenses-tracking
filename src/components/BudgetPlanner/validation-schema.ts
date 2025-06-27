import {z} from "zod";

export const SubcategorySchema = z.object({
	name: z.string().min(1, "Subcategory name is required"),
});

export const CategorySchema = z.object({
	name: z.string().min(1, "Category name is required"),
	budget: z.number().min(0, "Budget must be 0 or greater").optional(),
	monthlyLimit: z
		.number()
		.min(0, "Monthly limit must be 0 or greater")
		.optional(),
	subcategories: z.array(SubcategorySchema),
});

export const BudgetPlannerSchema = z.object({
	categories: z
		.array(CategorySchema)
		.min(1, "At least one category is required"),
});

export type SubcategoryInput = z.infer<typeof SubcategorySchema>;
export type CategoryInput = z.infer<typeof CategorySchema>;
export type BudgetPlannerInput = z.infer<typeof BudgetPlannerSchema>;
