"use client";

import { useCallback, useEffect } from "react";
import { Separator } from "@repo/ui/primitives/separator";
import { searchUsers } from "@repo/features-iam/actions";
import { buildQueryString } from "@repo/shared/client";

import { OrganizationWizardProgress } from "./wizard-progress";
import { OrganizationWizardNavigation } from "./wizard-navigation";
import { useOrganizationWizardStore } from "../../../store/organization-wizard-store";
import {
  canAdvanceOrganizationWizardFrom,
  ORGANIZATION_WIZARD_STEPS,
} from "../../../lib/organization-wizard-steps";
import React from "react";
import { OrganizationInfoStep } from "./steps/organization-info-step";
import { RegistrationTypeStep } from "./steps/registration-type-step";
import { OrganizationDocumentsUploadStep } from "./steps/documents-upload-step";
import { OrganizationReviewSubmitStep } from "./steps/review-submit-step";

export type OwnerAssignmentMode =
  | "GLOBAL_SEARCH"
  | "ORGANIZATION_SEARCH"
  | "BRANCH_SEARCH"
  | "FIXED_SELF";

export interface OwnerAssignmentPolicy {
  activeBranch?: string;
  activeOrganization?: string;
  initialOwnerDisplayName?: string;
  initialOwnerEmail?: string;
  initialOwnerId: string;
  mode: OwnerAssignmentMode;
}

interface CreateOrganizationWizardProps {
  ownerAssignmentPolicy: OwnerAssignmentPolicy;
  onSuccess: (organizationId: string) => void;
}

export function CreateOrganizationWizard({
  ownerAssignmentPolicy,
  onSuccess,
}: CreateOrganizationWizardProps) {
  const store = useOrganizationWizardStore();
  const { currentStep, previousStep, nextStep, setOwnerId } = store;

  useEffect(() => {
    setOwnerId(ownerAssignmentPolicy.initialOwnerId);
  }, [ownerAssignmentPolicy.initialOwnerId, setOwnerId]);

  const onOwnerSearchFetch = useCallback(
    async (query: string) => {
      const trimmedQuery = query.trim();

      const queryString = buildQueryString({
        branchId:
          ownerAssignmentPolicy.mode === "BRANCH_SEARCH"
            ? ownerAssignmentPolicy.activeBranch
            : undefined,
        email: trimmedQuery || undefined,
        firstName: trimmedQuery || undefined,
        keycloakUserId:
          ownerAssignmentPolicy.mode === "FIXED_SELF"
            ? ownerAssignmentPolicy.initialOwnerId
            : undefined,
        lastName: trimmedQuery || undefined,
        organizationId:
          ownerAssignmentPolicy.mode === "ORGANIZATION_SEARCH" ||
          ownerAssignmentPolicy.mode === "BRANCH_SEARCH" ||
          ownerAssignmentPolicy.mode === "FIXED_SELF"
            ? ownerAssignmentPolicy.activeOrganization
            : undefined,
        page: 1,
        size: 10,
        sortBy: "createdAt",
        sortDirection: "DESC",
        status: "ACTIVE",
        username: trimmedQuery || undefined,
      });

      return searchUsers(queryString);
    },
    [ownerAssignmentPolicy],
  );

  const canAdvance = canAdvanceOrganizationWizardFrom(currentStep, store);
  const isLastStep = currentStep === ORGANIZATION_WIZARD_STEPS.length - 1;

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <RegistrationTypeStep />;
      case 1:
        return (
          <OrganizationInfoStep
            ownerAssignmentPolicy={ownerAssignmentPolicy}
            onOwnerSearchFetch={
              ownerAssignmentPolicy.mode === "FIXED_SELF"
                ? undefined
                : onOwnerSearchFetch
            }
          />
        );
      case 2:
        return <OrganizationDocumentsUploadStep />;
      case 3:
        return <OrganizationReviewSubmitStep onSuccess={onSuccess} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 p-4">
      <OrganizationWizardProgress
        currentStep={currentStep}
        steps={ORGANIZATION_WIZARD_STEPS}
      />
      <Separator />
      <div className="min-h-100">{renderStep()}</div>

      {currentStep !== 0 && !isLastStep && (
        <OrganizationWizardNavigation
          canAdvance={canAdvance}
          currentStep={currentStep}
          formId={currentStep === 1 ? "organization-info-form" : undefined}
          isLastStep={isLastStep}
          onBack={previousStep}
          onNext={currentStep !== 1 ? nextStep : undefined}
          totalSteps={ORGANIZATION_WIZARD_STEPS.length}
        />
      )}

      {isLastStep && (
        <div className="flex justify-start pt-4">
          <button
            type="button"
            onClick={previousStep}
            className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
}
