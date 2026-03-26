import { z } from "zod";

export const initiateReassignmentSchema = z.object({
  reason: z.string().min(1, "Reassignment reason is required"),
});

export type InitiateReassignmentFormData = z.infer<
  typeof initiateReassignmentSchema
>;
