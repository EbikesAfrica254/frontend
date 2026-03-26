import { z } from "zod";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const createPreferredAgentSchema = z.object({
  agentId: z.string().regex(UUID_PATTERN, "Agent ID must be a valid UUID"),
  branchId: z.string().max(36).optional(),
  notes: z.string().max(1000).optional(),
  organizationId: z.string().min(1, "Organization ID is required").max(36),
  priority: z.number().int().min(1, "Priority must be a positive integer"),
});

export const updatePreferredAgentSchema = z
  .object({
    notes: z.string().max(1000).optional(),
    organizationId: z.string().min(1, "Organization ID is required").max(36),
    priority: z
      .number()
      .int()
      .min(1, "Priority must be a positive integer")
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.priority === undefined && data.notes === undefined) {
      ctx.addIssue({
        code: "custom",
        message: "At least one of priority or notes must be provided",
        path: ["priority"],
      });
    }
  });

export type CreatePreferredAgentFormData = z.infer<
  typeof createPreferredAgentSchema
>;
export type UpdatePreferredAgentFormData = z.infer<
  typeof updatePreferredAgentSchema
>;
