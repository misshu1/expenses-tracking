import { z } from "zod";

export const addExpenseSchema = z.object({
  category: z.string().min(1, "Category is required"),
  subcategory: z.string().min(1, "Subcategory is required"),
  amount: z.number().positive("Amount must be greater than 0"),
  currency: z.enum(["RON", "EUR", "USD"]),
  date: z.string().min(1, "Date is required"),
  notes: z.string().optional(),
});

export type AddExpenseFormValues = z.infer<typeof addExpenseSchema>;
