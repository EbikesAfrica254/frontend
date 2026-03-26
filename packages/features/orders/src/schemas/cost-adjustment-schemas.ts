import { z } from "zod";
import { currencySchema } from "./shared";

export const adjustCostSchema = z.object({
  currency: currencySchema,
  reason: z
    .string()
    .min(10, "Reason must be at least 10 characters")
    .max(500, "Reason must be at most 500 characters"),
  revisedAmount: z.number().positive("Revised amount must be positive"),
});

export type AdjustCostFormData = z.infer<typeof adjustCostSchema>;
