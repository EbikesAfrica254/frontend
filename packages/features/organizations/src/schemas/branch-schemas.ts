import { z } from "zod";
import { DayOfWeek } from "../types/enums";

const dayOfWeekValues = Object.values(DayOfWeek) as [DayOfWeek, ...DayOfWeek[]];

const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

const branchAddressSchema = z.object({
  city: z.string().min(1, "City is required").max(100),
  country: z.string().min(1, "Country is required").max(100),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  postalCode: z.string().max(20).optional(),
  streetAddress: z.string().min(1, "Street address is required").max(500),
});

const dayScheduleSchema = z
  .object({
    closes: z
      .string()
      .regex(TIME_PATTERN, "Closing time must be in HH:MM format"),
    dayOfWeek: z.enum(dayOfWeekValues, { message: "Day of week is required" }),
    opens: z
      .string()
      .regex(TIME_PATTERN, "Opening time must be in HH:MM format"),
  })
  .superRefine((data, ctx) => {
    if (data.opens >= data.closes) {
      ctx.addIssue({
        code: "custom",
        message: "Opening time must be before closing time",
        path: ["opens"],
      });
    }
  });

export const createBranchSchema = z.object({
  address: branchAddressSchema,
  branchName: z.string().min(1, "Branch name is required").max(255),
  displayName: z.string().min(1, "Display name is required").max(255),
  email: z.email("Invalid email address").max(255),
  operatingHours: z.array(dayScheduleSchema).optional(),
  phoneNumber: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, "Invalid phone number format")
    .max(20),
});

export const updateBranchSchema = z.object({
  address: branchAddressSchema.optional(),
  branchName: z.string().min(1).max(255).optional(),
  displayName: z.string().min(1).max(255).optional(),
  email: z.email("Invalid email address").max(255).optional(),
  operatingHours: z.array(dayScheduleSchema).optional(),
  phoneNumber: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, "Invalid phone number format")
    .max(20)
    .optional(),
});

export type CreateBranchFormData = z.infer<typeof createBranchSchema>;
export type UpdateBranchFormData = z.infer<typeof updateBranchSchema>;
