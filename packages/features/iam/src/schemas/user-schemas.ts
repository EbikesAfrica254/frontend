import { z } from "zod";
import { UserStatus } from "../types/enums";
import { UserRole } from "@repo/shared/client";
import { isValidPhoneNumber } from "libphonenumber-js";

export const BRANCH_ROLES: readonly string[] = [
  UserRole.AGENT,
  UserRole.BRANCH_ADMIN,
  UserRole.BRANCH_CHECKER,
  UserRole.BRANCH_FLEET_MANAGER,
  UserRole.BRANCH_FLEET_SUPPORT,
  UserRole.BRANCH_INVENTORY_MANAGER,
  UserRole.BRANCH_MAKER,
  UserRole.BRANCH_OPERATOR,
  UserRole.CUSTOMER,
];

const userRoleValues = Object.values(UserRole) as [UserRole, ...UserRole[]];
const userStatusValues = Object.values(UserStatus) as [
  UserStatus,
  ...UserStatus[],
];

export const createUserSchema = z
  .object({
    branchId: z.uuid().optional(),
    branchName: z.string().max(255).optional(),
    countryCode: z
      .string()
      .length(2, "Country code must be exactly 2 characters")
      .toUpperCase(),
    email: z.email().max(255, "Email must be at most 255 characters"),
    firstName: z
      .string()
      .min(1, "First name is required")
      .max(255, "First name must be at most 255 characters"),
    isPrimary: z.boolean().nullable().optional(),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .max(255, "Last name must be at most 255 characters"),
    organizationId: z.uuid().optional(),
    phoneNumber: z
      .string()
      .regex(/^\+?[1-9]\d{1,14}$/, "Phone number must be in E.164 format")
      .max(20, "Phone number must be at most 20 characters"),
    roles: z
      .array(z.enum(userRoleValues))
      .min(1, "At least one role is required"),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(255, "Username must be at most 255 characters")
      .regex(
        /^[a-zA-Z0-9_-]+$/,
        "Username can only contain letters, numbers, hyphens and underscores",
      ),
  })
  .superRefine((data, ctx) => {
    const isBranchRole = data.roles.some((r) => BRANCH_ROLES.includes(r));

    if (isBranchRole && !data.branchId) {
      ctx.addIssue({
        code: "custom",
        message: "Branch is required for branch-level roles",
        path: ["branchId"],
      });
    }

    if (data.branchId && !data.branchName) {
      ctx.addIssue({
        code: "custom",
        message: "Branch name is required when branch is selected",
        path: ["branchName"],
      });
    }

    if (isBranchRole && !data.organizationId) {
      ctx.addIssue({
        code: "custom",
        message: "Organization is required for branch-level roles",
        path: ["organizationId"],
      });
    }
  });

export const signupSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(255, "First name must not exceed 255 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "First name contains invalid characters"),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(255, "Last name must not exceed 255 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Last name contains invalid characters"),

  email: z.email().max(255, { error: "Email must be at most 255 characters" }),

  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .refine(isValidPhoneNumber, {
      message: "Please enter a valid phone number",
    }),

  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(255, "Username must not exceed 255 characters")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Username can only contain letters, numbers, underscores, and hyphens",
    )
    .toLowerCase()
    .trim(),

  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

export const updateUserSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(255, "First name must be at most 255 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(255, "Last name must be at most 255 characters"),
  email: z.email().max(255, "Email must be at most 255 characters"),
  phoneNumber: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Phone number must be in E.164 format")
    .max(20, "Phone number must be at most 20 characters"),
  status: z.enum(userStatusValues, {
    message: "Status is required",
  }),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type UpdateUserFormData = z.infer<typeof updateUserSchema>;

export const COUNTRY_OPTIONS = [
  { flag: "🇰🇪", label: "Kenya", value: "KE" },
] as const;
