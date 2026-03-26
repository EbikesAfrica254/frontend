import { z } from "zod";
import { addressSchema } from "@repo/shared/client";
import { DocumentType, RegistrationType } from "../types/enums";

const registrationTypeValues = Object.values(RegistrationType) as [
  RegistrationType,
  ...RegistrationType[],
];

const KRA_PIN_PATTERN = /^[A-Z][0-9]{9}[A-Z]$/;
const PHONE_PATTERN = /^\+?[0-9]{10,15}$/;

const documentUploadInfoSchema = z.object({
  documentType: z.enum(DocumentType, {
    message: "Document type is required",
  }),
  expiryDate: z.string().optional(),
  fileName: z.string().min(1, "File name is required").max(255),
  fileSizeBytes: z.number().int().min(1),
  key: z.string().min(1, "Storage key is required").max(1000),
  mimeType: z.string().min(1, "MIME type is required").max(100),
});

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const createOrganizationSchema = z.object({
  addresses: z.array(addressSchema).min(1, "At least one address is required"),
  displayName: z.string().min(1, "Display name is required").max(255),
  documents: z
    .array(documentUploadInfoSchema)
    .min(1, "At least one document is required"),
  email: z.email("Invalid email address").max(255),
  incorporationDate: z.string().optional(),
  kraPin: z
    .string()
    .length(11, "KRA PIN must be exactly 11 characters")
    .regex(KRA_PIN_PATTERN, "KRA PIN must be in the format A001234567B")
    .optional(),
  legalName: z.string().min(1, "Legal name is required").max(255),
  ownerId: z
    .string()
    .length(36, "Owner ID must be exactly 36 characters")
    .regex(UUID_PATTERN, "Owner ID must be a valid UUID"),
  phoneNumber: z
    .string()
    .regex(PHONE_PATTERN, "Invalid phone number format")
    .max(20),
  registrationNumber: z.string().max(100).optional(),
  registrationType: z.enum(registrationTypeValues, {
    message: "Registration type is required",
  }),
});

export const updateOrganizationSchema = z.object({
  addresses: z.array(addressSchema).min(1).optional(),
  displayName: z.string().min(1).max(255).optional(),
  documents: z.array(documentUploadInfoSchema).min(1).optional(),
  email: z.email("Invalid email address").max(255).optional(),
  incorporationDate: z.string().optional(),
  kraPin: z
    .string()
    .length(11)
    .regex(KRA_PIN_PATTERN, "KRA PIN must be in the format A001234567B")
    .optional(),
  legalName: z.string().min(1).max(255).optional(),
  phoneNumber: z
    .string()
    .regex(PHONE_PATTERN, "Invalid phone number format")
    .max(20)
    .optional(),
  registrationNumber: z.string().max(100).optional(),
  registrationType: z.enum(registrationTypeValues).optional(),
});

export type CreateOrganizationFormData = z.infer<
  typeof createOrganizationSchema
>;
export type UpdateOrganizationFormData = z.infer<
  typeof updateOrganizationSchema
>;
