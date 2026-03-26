import { z } from "zod";
import { DocumentType } from "../types/enums";

export const documentUploadInfoSchema = z.object({
  documentType: z.enum(DocumentType),
  expiryDate: z.string().optional(),
  fileName: z.string().min(1).max(255),
  fileSizeBytes: z.number().min(1),
  key: z.string().min(1).max(1000),
  mimeType: z.string().min(1).max(100),
});

export const createDraftsFromDocumentSchema = z.object({
  branchId: z.string().length(36, "Invalid branch ID format"),
  document: documentUploadInfoSchema,
  organizationId: z.string().length(36, "Invalid organization ID format"),
  organizationName: z.string().min(1, "Organization name is required").max(255),
  pickupAddress: z.string().min(1, "Pickup address is required"),
  pickupLatitude: z.number().min(-90).max(90),
  pickupLongitude: z.number().min(-180).max(180),
});

export type CreateDraftsFromDocumentFormData = z.infer<
  typeof createDraftsFromDocumentSchema
>;

export const updateDeliveryLocationSchema = z.object({
  deliveryAddress: z.string().min(1, "Delivery address is required"),
  deliveryLatitude: z.number().min(-90).max(90),
  deliveryLongitude: z.number().min(-180).max(180),
});

export type UpdateDeliveryLocationFormData = z.infer<
  typeof updateDeliveryLocationSchema
>;
