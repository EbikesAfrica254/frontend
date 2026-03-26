import { z } from "zod";
import { NotificationCategory, NotificationChannel } from "../types/enums";

const categoryValues = Object.values(NotificationCategory) as [
  NotificationCategory,
  ...NotificationCategory[],
];

const channelValues = Object.values(NotificationChannel) as [
  NotificationChannel,
  ...NotificationChannel[],
];

export const createOrganizationPreferenceSchema = z.object({
  category: z.enum(categoryValues, { message: "Category is required" }),
  channel: z.enum(channelValues, { message: "Channel is required" }),
  enabled: z.boolean(),
});

export const createUserPreferenceSchema = z.object({
  category: z.enum(categoryValues, { message: "Category is required" }),
  channel: z.enum(channelValues, { message: "Channel is required" }),
  enabled: z.boolean(),
});

export const updateOrganizationPreferenceSchema = z.object({
  enabled: z.boolean(),
});

export const updateUserPreferenceSchema = z.object({
  enabled: z.boolean(),
});

export type CreateOrganizationPreferenceFormData = z.infer<
  typeof createOrganizationPreferenceSchema
>;
export type CreateUserPreferenceFormData = z.infer<
  typeof createUserPreferenceSchema
>;
export type UpdateOrganizationPreferenceFormData = z.infer<
  typeof updateOrganizationPreferenceSchema
>;
export type UpdateUserPreferenceFormData = z.infer<
  typeof updateUserPreferenceSchema
>;
