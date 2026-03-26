"use client";

import { cn } from "@repo/ui/utilities";
import { useOrganizationWizardStore } from "../../../../store/organization-wizard-store";
import { RegistrationType } from "@repo/features-organizations/client";
import { formatRegistrationType } from "@repo/features-organizations/client";
import React from "react";

const REGISTRATION_TYPE_DESCRIPTIONS: Record<RegistrationType, string> = {
  [RegistrationType.SOLE_PROPRIETOR]:
    "A business owned and operated by a single individual.",
  [RegistrationType.PARTNERSHIP]:
    "A business owned by two or more individuals sharing profits and liabilities.",
  [RegistrationType.LIMITED_LIABILITY_ENTITY]:
    "A flexible structure offering limited liability protection to its members.",
};

export function RegistrationTypeStep() {
  const { registrationType, setRegistrationType, nextStep } =
    useOrganizationWizardStore();

  const handleSelect = (type: RegistrationType) => {
    setRegistrationType(type);
    // Selection itself advances — no explicit Next button needed on this step.
    nextStep();
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-semibold">Select Registration Type</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose the legal structure that best describes your organization. This
          determines which compliance documents are required.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {(Object.values(RegistrationType) as RegistrationType[]).map((type) => {
          const isSelected = registrationType === type;

          return (
            <button
              key={type}
              type="button"
              onClick={() => handleSelect(type)}
              className={cn(
                "rounded-lg border p-4 text-left transition-colors hover:border-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isSelected
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-border",
              )}
            >
              <p className="text-sm font-medium">
                {formatRegistrationType(type)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {REGISTRATION_TYPE_DESCRIPTIONS[type]}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
