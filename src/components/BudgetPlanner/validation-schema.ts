import {z} from "zod";

export const SubcategorySchema = z.object({
	name: z.string().min(1, "Subcategory name is required"),
	budget: z.number().min(0, "Budget must be 0 or greater"),
	notes: z.string().optional(),
});

export const CategorySchema = z.object({
	name: z.string().min(1, "Category name is required"),
	budget: z.number().min(0, "Budget must be 0 or greater"),
	notes: z.string().optional(),
	monthlyLimit: z.number().min(0, "Monthly limit must be 0 or greater"),
	subcategories: z.array(SubcategorySchema),
});

export const BudgetPlannerSchema = z.object({
	annualIncome: z.number().min(0, "Annual income must be 0 or greater"),
	categories: z
		.array(CategorySchema)
		.min(1, "At least one category is required"),
});

export type SubcategoryInput = z.infer<typeof SubcategorySchema>;
export type CategoryInput = z.infer<typeof CategorySchema>;
export type BudgetPlannerInput = z.infer<typeof BudgetPlannerSchema>;
