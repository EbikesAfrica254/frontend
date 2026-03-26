import { z } from "zod";

export const approveRequestSchema = z.object({
  reason: z.string().max(1000).optional(),
});

export const rejectRequestSchema = z.object({
  reason: z
    .string()
    .min(1, "Rejection reason is required")
    .max(1000, "Reason must not exceed 1000 characters"),
});

export type ApproveRequestFormData = z.infer<typeof approveRequestSchema>;
export type RejectRequestFormData = z.infer<typeof rejectRequestSchema>;
