"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
  createCertificationSchema,
  type CreateCertificationFormData,
} from "../../schemas/certifications-schemas";
import { CertificationType } from "../../types/enums";
import { formatCertificationType } from "../../utilities/status-helpers";

interface CreateCertificationFormProps {
  onSubmit: (data: CreateCertificationFormData) => void | Promise<void>;
}

const certificationTypeValues = Object.values(CertificationType);

export function CreateCertificationForm({
  onSubmit,
}: CreateCertificationFormProps) {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    watch,
  } = useForm<CreateCertificationFormData>({
    defaultValues: {
      certificationType: undefined,
      expiresAt: undefined,
      issuedAt: "",
      issuedBy: "",
      notes: undefined,
      referenceNumber: undefined,
    },
    resolver: zodResolver(createCertificationSchema),
  });

  const selectedType = watch("certificationType");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="certificationType" className="text-sm font-medium">
          Certification Type <span className="text-red-500">*</span>
        </label>
        <select
          id="certificationType"
          {...register("certificationType")}
          disabled={isSubmitting}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          aria-invalid={!!errors.certificationType}
        >
          <option value="">Select certification type</option>
          {certificationTypeValues.map((type) => (
            <option key={type} value={type}>
              {formatCertificationType(type)}
            </option>
          ))}
        </select>
        {errors.certificationType && (
          <p className="text-sm text-red-600">
            {errors.certificationType.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="issuedAt" className="text-sm font-medium">
            Issue Date <span className="text-red-500">*</span>
          </label>
          <input
            id="issuedAt"
            type="date"
            {...register("issuedAt")}
            disabled={isSubmitting}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            aria-invalid={!!errors.issuedAt}
          />
          {errors.issuedAt && (
            <p className="text-sm text-red-600">{errors.issuedAt.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="expiresAt" className="text-sm font-medium">
            Expiry Date
          </label>
          <input
            id="expiresAt"
            type="date"
            {...register("expiresAt")}
            disabled={isSubmitting}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="issuedBy" className="text-sm font-medium">
          Issuing Authority <span className="text-red-500">*</span>
        </label>
        <input
          id="issuedBy"
          type="text"
          {...register("issuedBy")}
          disabled={isSubmitting}
          placeholder="National Transport and Safety Authority"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          aria-invalid={!!errors.issuedBy}
        />
        {errors.issuedBy && (
          <p className="text-sm text-red-600">{errors.issuedBy.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="referenceNumber" className="text-sm font-medium">
          Reference Number{" "}
          {selectedType &&
            [
              CertificationType.GOOD_CONDUCT_CERTIFICATE,
              CertificationType.NTSA_DRIVING_LICENSE_CLASS_BCE,
              CertificationType.NTSA_DRIVING_LICENSE_CLASS_G,
            ].includes(selectedType) && <span className="text-red-500">*</span>}
        </label>
        <input
          id="referenceNumber"
          type="text"
          {...register("referenceNumber")}
          disabled={isSubmitting}
          placeholder="DL-2024-001234"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          aria-invalid={!!errors.referenceNumber}
        />
        {errors.referenceNumber && (
          <p className="text-sm text-red-600">
            {errors.referenceNumber.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="notes" className="text-sm font-medium">
          Notes
        </label>
        <textarea
          id="notes"
          {...register("notes")}
          disabled={isSubmitting}
          placeholder="Verified against original document"
          rows={3}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save Certification"}
        </button>
      </div>
    </form>
  );
}
