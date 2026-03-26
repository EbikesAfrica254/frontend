import { z } from "zod";

export const suspendAgentSchema = z.object({
  expiresAt: z.string().optional(),
  notes: z.string().max(1000).optional(),
  reason: z.string().min(1, "Reason is required").max(255),
});

export const liftSuspensionSchema = z.object({
  notes: z.string().max(1000).optional(),
});

export type SuspendAgentFormData = z.infer<typeof suspendAgentSchema>;
export type LiftSuspensionFormData = z.infer<typeof liftSuspensionSchema>;
