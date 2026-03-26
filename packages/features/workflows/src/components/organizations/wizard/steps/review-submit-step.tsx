"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Separator } from "@repo/ui/primitives/separator";

import { formatRegistrationType } from "@repo/features-organizations/client";
import { formatDocumentType } from "@repo/features-organizations/client";
import { createOrganization } from "@repo/features-organizations/actions";
import { useOrganizationWizardStore } from "../../../../store/organization-wizard-store";
import React from "react";

interface ReviewSubmitStepProps {
  onSuccess: (organizationId: string) => void;
}

export function OrganizationReviewSubmitStep({
  onSuccess,
}: ReviewSubmitStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    registrationType,
    organizationInfo,
    addresses,
    documents,
    toFormData,
    reset,
  } = useOrganizationWizardStore();

  const handleSubmit = async () => {
    const formData = toFormData();

    if (!formData) {
      toast.error("Incomplete form data. Please review all steps.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createOrganization(formData);

      if (!result.success) {
        toast.error(result.error ?? "Failed to submit organization.");
        return;
      }

      toast.success("Organization submitted for approval.");
      reset();
      onSuccess(result.data.id);
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const primaryAddress = addresses[0];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold">Review & Submit</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Review all details before submitting for approval. Once submitted, the
          organization will enter a pending review state.
        </p>
      </div>

      {/* Registration Type */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Registration Type
        </h4>
        <Separator />
        <p className="text-sm">
          {registrationType ? formatRegistrationType(registrationType) : "—"}
        </p>
      </div>

      {/* Organization Details */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Organization Details
        </h4>
        <Separator />
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <ReviewField label="Legal Name" value={organizationInfo?.legalName} />
          <ReviewField
            label="Display Name"
            value={organizationInfo?.displayName}
          />
          <ReviewField label="Email" value={organizationInfo?.email} />
          <ReviewField
            label="Phone Number"
            value={organizationInfo?.phoneNumber}
          />
          <ReviewField
            label="KRA PIN"
            value={organizationInfo?.kraPin}
            optional
          />
          <ReviewField
            label="Registration Number"
            value={organizationInfo?.registrationNumber}
            optional
          />
          <ReviewField
            label="Incorporation Date"
            value={organizationInfo?.incorporationDate}
            optional
          />
        </dl>
      </div>

      {/* Primary Address */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Primary Address
        </h4>
        <Separator />
        {primaryAddress ? (
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <ReviewField
              label="Street Address"
              value={primaryAddress.streetAddress}
            />
            <ReviewField label="City" value={primaryAddress.city} />
            <ReviewField label="Country" value={primaryAddress.country} />
            <ReviewField
              label="Postal Code"
              value={primaryAddress.postalCode}
              optional
            />
          </dl>
        ) : (
          <p className="text-sm text-muted-foreground">No address provided.</p>
        )}
      </div>

      {/* Documents */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Compliance Documents
        </h4>
        <Separator />
        {documents.length > 0 ? (
          <ul className="space-y-2">
            {documents.map((doc) => (
              <li
                key={doc.documentType}
                className="flex items-center justify-between rounded-md border px-3 py-2"
              >
                <span className="text-sm font-medium">
                  {formatDocumentType(doc.documentType)}
                </span>
                <span className="text-xs text-muted-foreground">
                  {doc.fileName}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">
            No documents uploaded.
          </p>
        )}
      </div>

      <Separator />

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit for Approval"}
        </button>
      </div>
    </div>
  );
}

interface ReviewFieldProps {
  label: string;
  value?: string;
  optional?: boolean;
}

function ReviewField({ label, value, optional = false }: ReviewFieldProps) {
  if (!value && optional) return null;

  return (
    <div className="space-y-1">
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className="text-sm">{value ?? "—"}</dd>
    </div>
  );
}
