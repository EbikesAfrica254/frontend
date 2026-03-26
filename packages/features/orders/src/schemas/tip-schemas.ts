import { z } from "zod";
import { currencySchema } from "./shared";

export const recordTipSchema = z.object({
  amount: z.number().min(0.01, "Tip amount must be at least 0.01"),
  currency: currencySchema,
  percentage: z.number().positive("Tip percentage must be positive").optional(),
});

export type RecordTipFormData = z.infer<typeof recordTipSchema>;
