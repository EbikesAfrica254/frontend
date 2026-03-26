import { z } from "zod";
import {
  NotificationChannel,
  TemplateContentType,
  TemplateVariableType,
} from "../types/enums";

const BODY_MAX_LENGTH: Record<NotificationChannel, number> = {
  [NotificationChannel.EMAIL]: 102400,
  [NotificationChannel.SMS]: 320,
  [NotificationChannel.SSE]: 4096,
  [NotificationChannel.WHATSAPP]: 1024,
};

const channelValues = Object.values(NotificationChannel) as [
  NotificationChannel,
  ...NotificationChannel[],
];

const contentTypeValues = Object.values(TemplateContentType) as [
  TemplateContentType,
  ...TemplateContentType[],
];

const variableTypeValues = Object.values(TemplateVariableType) as [
  TemplateVariableType,
  ...TemplateVariableType[],
];

const templateVariableSchema = z.object({
  description: z
    .string()
    .max(255, "Description must be at most 255 characters"),
  name: z
    .string()
    .regex(
      /^[a-z][a-zA-Z0-9]{1,63}$/,
      "Variable name must start with a lowercase letter and contain only alphanumeric characters",
    ),
  required: z.boolean().optional(),
  sensitive: z.boolean().optional(),
  type: z.enum(variableTypeValues, { message: "Variable type is required" }),
});

export const createTemplateSchema = z
  .object({
    bodyTemplate: z.string().min(1, "Body is required"),
    channel: z.enum(channelValues, { message: "Channel is required" }),
    contentType: z.enum(contentTypeValues, {
      message: "Content type is required",
    }),
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(100, "Name must be at most 100 characters")
      .regex(/^[A-Z][A-Z0-9_]{2,99}$/, "Name must be in SCREAMING_SNAKE_CASE"),
    subject: z.string().max(500).optional(),
    variableDefinitions: z.array(templateVariableSchema),
  })
  .superRefine((data, ctx) => {
    const maxLength = BODY_MAX_LENGTH[data.channel];
    if (data.bodyTemplate.length > maxLength) {
      ctx.addIssue({
        code: "custom",
        message: `Body must be at most ${maxLength} characters for ${data.channel}`,
        path: ["bodyTemplate"],
      });
    }

    if (data.channel === NotificationChannel.EMAIL && !data.subject) {
      ctx.addIssue({
        code: "custom",
        message: "Subject is required for EMAIL templates",
        path: ["subject"],
      });
    }

    if (data.channel !== NotificationChannel.EMAIL && data.subject) {
      ctx.addIssue({
        code: "custom",
        message: "Subject must be omitted for non-EMAIL templates",
        path: ["subject"],
      });
    }

    if (
      data.channel !== NotificationChannel.EMAIL &&
      data.contentType === TemplateContentType.HTML
    ) {
      ctx.addIssue({
        code: "custom",
        message: "HTML content type is only permitted for EMAIL templates",
        path: ["contentType"],
      });
    }
  });

export const updateTemplateSchema = z.object({
  bodyTemplate: z.string().min(1, "Body is required"),
  subject: z.string().max(500).optional(),
  variableDefinitions: z.array(templateVariableSchema),
});

export type CreateTemplateFormData = z.infer<typeof createTemplateSchema>;
export type UpdateTemplateFormData = z.infer<typeof updateTemplateSchema>;
