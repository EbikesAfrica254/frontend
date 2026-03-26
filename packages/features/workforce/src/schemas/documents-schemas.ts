import { z } from "zod";
import { DocumentType } from "../types/enums";

const documentTypeValues = Object.values(DocumentType) as [
  DocumentType,
  ...DocumentType[],
];

const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
] as const;

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

export const documentUploadInitiationSchema = z.object({
  contentType: z.enum(ALLOWED_MIME_TYPES, {
    message: "File must be a PDF, JPEG, or PNG",
  }),
  documentType: z.enum(documentTypeValues, {
    message: "Document type is required",
  }),
  fileName: z.string().min(1, "File name is required").max(255),
});

export const documentUploadConfirmationSchema = z.object({
  expiryDate: z.string().optional(),
  fileSizeBytes: z
    .number()
    .int()
    .min(1, "File size must be at least 1 byte")
    .max(MAX_FILE_SIZE_BYTES, "File size must not exceed 10 MB"),
  mimeType: z.enum(ALLOWED_MIME_TYPES, {
    message: "File must be a PDF, JPEG, or PNG",
  }),
});

export const documentUploadInfoSchema = z.object({
  documentType: z.enum(documentTypeValues, {
    message: "Document type is required",
  }),
  expiryDate: z.string().optional(),
  fileName: z.string().min(1, "File name is required").max(255),
  fileSizeBytes: z.number().int().min(1),
  key: z.string().min(1, "Storage key is required").max(1000),
  mimeType: z.string().min(1, "MIME type is required").max(100),
});

export type DocumentUploadInitiationFormData = z.infer<
  typeof documentUploadInitiationSchema
>;
export type DocumentUploadConfirmationFormData = z.infer<
  typeof documentUploadConfirmationSchema
>;
export type DocumentUploadInfoData = z.infer<typeof documentUploadInfoSchema>;
