import {z} from "zod";

export const addTransactionSchema = z.object({
	amount: z.number().min(0.01, "Amount must be greater than 0"),
	category: z.string().min(1, "Category is required"),
	subcategory: z.string().min(1, "Subcategory is required"),
	date: z.string().min(1, "Date is required"),
	notes: z.string().optional(),
});

export type AddTransactionFormData = z.infer<typeof addTransactionSchema>;
