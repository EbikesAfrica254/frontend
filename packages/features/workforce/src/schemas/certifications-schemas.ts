import { z } from "zod";
import { CertificationType } from "../types/enums";

const certificationTypeValues = Object.values(CertificationType) as [
  CertificationType,
  ...CertificationType[],
];

const REQUIRED_REFERENCE_NUMBER_TYPES = new Set([
  CertificationType.GOOD_CONDUCT_CERTIFICATE,
  CertificationType.NTSA_DRIVING_LICENSE_CLASS_G,
  CertificationType.NTSA_DRIVING_LICENSE_CLASS_BCE,
]);

export const createCertificationSchema = z
  .object({
    certificationType: z.enum(certificationTypeValues, {
      message: "Certification type is required",
    }),
    expiresAt: z.string().optional(),
    issuedAt: z.string().min(1, "Issue date is required"),
    issuedBy: z.string().min(1, "Issuing authority is required").max(255),
    notes: z.string().max(1000).optional(),
    referenceNumber: z.string().max(100).optional(),
  })
  .superRefine((data, ctx) => {
    if (
      REQUIRED_REFERENCE_NUMBER_TYPES.has(data.certificationType) &&
      !data.referenceNumber
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Reference number is required for this certification type",
        path: ["referenceNumber"],
      });
    }
  });

export type CreateCertificationFormData = z.infer<
  typeof createCertificationSchema
>;
