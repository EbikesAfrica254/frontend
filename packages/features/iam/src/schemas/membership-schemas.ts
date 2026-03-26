import { z } from "zod";
import { UserRole } from "@repo/shared/client";

const userRoleValues = Object.values(UserRole) as [UserRole, ...UserRole[]];

export const createMembershipSchema = z.object({
  organizationId: z.string().min(1, "Organization is required"),
  organizationName: z.string().min(1, "Organization name is required"),
  branchId: z.string().optional(),
  branchName: z.string().min(1, "Branch name is required"),
  roles: z
    .array(
      z.enum(userRoleValues, {
        message: "Role is required",
      }),
    )
    .min(1, "At least one role is required")
    .refine((roles) => new Set(roles).size === roles.length, {
      message: "Roles must be unique",
    }),
  isPrimary: z.boolean(),
});

export const updateMembershipRolesSchema = z.object({
  roles: z
    .array(
      z.enum(userRoleValues, {
        message: "Role is required",
      }),
    )
    .min(1, "At least one role is required")
    .refine((roles) => new Set(roles).size === roles.length, {
      message: "Roles must be unique",
    }),
});

export type CreateMembershipFormData = z.infer<typeof createMembershipSchema>;
export type UpdateMembershipRolesFormData = z.infer<
  typeof updateMembershipRolesSchema
>;
