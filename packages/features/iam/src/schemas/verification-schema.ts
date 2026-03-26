import { z } from "zod";

export const PASSWORD_CRITERIA = [
  {
    id: "length",
    label: "At least 8 characters",
    test: (value: string) => value.length >= 8,
  },
  {
    id: "uppercase",
    label: "At least one uppercase letter",
    test: (value: string) => /[A-Z]/.test(value),
  },
  {
    id: "lowercase",
    label: "At least one lowercase letter",
    test: (value: string) => /[a-z]/.test(value),
  },
  {
    id: "number",
    label: "At least one number",
    test: (value: string) => /[0-9]/.test(value),
  },
  {
    id: "special",
    label: "At least one special character",
    test: (value: string) => /[^A-Za-z0-9]/.test(value),
  },
] as const;

export const ActivationRequestSchema = z
  .object({
    password: z.string().superRefine((val, ctx) => {
      PASSWORD_CRITERIA.forEach((criterion) => {
        if (!criterion.test(val)) {
          ctx.addIssue({
            code: "custom",
            message: criterion.label,
          });
        }
      });
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
