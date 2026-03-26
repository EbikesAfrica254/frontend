"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Separator } from "@repo/ui/primitives/separator";
import React from "react";
import {
  formatCapabilityClass,
  formatDocumentType,
  NationalIdType,
} from "@repo/features-workforce/client";
import { createAgent } from "@repo/features-workforce/actions";
import { useAgentWizardStore } from "../../../../store/agent-wizard-store";

interface ReviewSubmitStepProps {
  onSuccess: (agentId: string) => void;
}

export function AgentReviewSubmitStep({ onSuccess }: ReviewSubmitStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { agentInfo, documents, toFormData, reset } = useAgentWizardStore();

  const handleSubmit = async () => {
    const formData = toFormData();

    if (!formData) {
      toast.error("Incomplete form data. Please review all steps.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createAgent(formData);

      if (!result.success) {
        toast.error(result.error ?? "Failed to register agent.");
        return;
      }

      toast.success("Agent registered successfully.");
      reset();
      onSuccess(result.data.id);
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold">Review & Submit</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Review all details before submitting. The agent will be registered
          immediately upon submission.
        </p>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Personal Details
        </h4>
        <Separator />
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <ReviewField label="First Name" value={agentInfo?.firstName} />
          <ReviewField label="Last Name" value={agentInfo?.lastName} />
          <ReviewField
            label="Capability Class"
            value={
              agentInfo?.capabilityClass
                ? formatCapabilityClass(agentInfo.capabilityClass)
                : undefined
            }
          />
        </dl>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Contact Information
        </h4>
        <Separator />
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <ReviewField label="Phone Number" value={agentInfo?.phoneNumber} />
          <ReviewField
            label="Alternate Phone"
            value={agentInfo?.alternatePhoneNumber}
            optional
          />
          <ReviewField label="Email" value={agentInfo?.email} optional />
        </dl>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Identity
        </h4>
        <Separator />
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <ReviewField
            label="ID Type"
            value={
              agentInfo?.nationalIdType === NationalIdType.NATIONAL_ID
                ? "National ID"
                : "Passport"
            }
          />
          <ReviewField label="ID Number" value={agentInfo?.nationalIdNumber} />
        </dl>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Documents
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
          {isSubmitting ? "Submitting..." : "Register Agent"}
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
