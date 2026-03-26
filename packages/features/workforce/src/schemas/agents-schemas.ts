import { z } from "zod";
import { CapabilityClass, NationalIdType } from "../types/enums";
import { documentUploadInfoSchema } from "./documents-schemas";

const capabilityClassValues = Object.values(CapabilityClass) as [
  CapabilityClass,
  ...CapabilityClass[],
];

const nationalIdTypeValues = Object.values(NationalIdType) as [
  NationalIdType,
  ...NationalIdType[],
];

const PHONE_PATTERN = /^\+?[0-9]{10,15}$/;
const NATIONAL_ID_PATTERN = /^[0-9]{1,8}$/;
const ALIEN_CERTIFICATE_PATTERN = /^A[0-9]{7}$/;
const PASSPORT_PATTERN = /^[A-Z0-9]{6,9}$/;

export const baseCreateAgentSchema = z.object({
  alternatePhoneNumber: z
    .string()
    .regex(PHONE_PATTERN, "Invalid phone number format")
    .max(20)
    .optional(),
  capabilityClass: z.enum(capabilityClassValues, {
    message: "Capability class is required",
  }),
  documents: z
    .array(documentUploadInfoSchema)
    .min(1, "At least one document is required"),
  email: z.email("Invalid email address").max(255).optional(),
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  maxConcurrentOrders: z.number().int().positive().optional(),
  nationalIdNumber: z.string().min(1, "National ID number is required").max(50),
  nationalIdType: z.enum(nationalIdTypeValues, {
    message: "National ID type is required",
  }),
  phoneNumber: z
    .string()
    .regex(PHONE_PATTERN, "Invalid phone number format")
    .max(20),
  userId: z.string().min(1, "User ID is required").max(36),
});

export const refineAgentNationalId = (
  data: { nationalIdType: NationalIdType; nationalIdNumber: string },
  ctx: z.RefinementCtx,
) => {
  if (data.nationalIdType === NationalIdType.NATIONAL_ID) {
    if (!NATIONAL_ID_PATTERN.test(data.nationalIdNumber)) {
      ctx.addIssue({
        code: "custom",
        message: "National ID must be up to 8 digits",
        path: ["nationalIdNumber"],
      });
    }
  }

  if (data.nationalIdType === NationalIdType.PASSPORT) {
    if (
      !PASSPORT_PATTERN.test(data.nationalIdNumber) &&
      !ALIEN_CERTIFICATE_PATTERN.test(data.nationalIdNumber)
    ) {
      ctx.addIssue({
        code: "custom",
        message:
          "Passport must be 6–9 alphanumeric characters, or alien certificate must be in the format A1234567",
        path: ["nationalIdNumber"],
      });
    }
  }
};

export const createAgentSchema = baseCreateAgentSchema.superRefine(
  refineAgentNationalId,
);

export const updateAgentSchema = z.object({
  alternatePhoneNumber: z
    .string()
    .regex(PHONE_PATTERN, "Invalid phone number format")
    .max(20)
    .optional(),
  capabilityClass: z.enum(capabilityClassValues).optional(),
  email: z.email("Invalid email address").max(255).optional(),
  maxConcurrentOrders: z.number().int().positive().optional(),
});

export type CreateAgentFormData = z.infer<typeof createAgentSchema>;
export type UpdateAgentFormData = z.infer<typeof updateAgentSchema>;
