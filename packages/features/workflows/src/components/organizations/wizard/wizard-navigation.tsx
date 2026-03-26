import { Button } from "@repo/ui/primitives/button";
import React from "react";

interface WizardNavigationProps {
  canAdvance: boolean;
  currentStep: number;
  /**
   * The form id to submit when on the organization-info step.
   * Navigation triggers RHF validation via form submission rather than
   * calling nextStep directly — this keeps the form's submit handler
   * as the single validation entry point for that step.
   */
  formId?: string;
  isLastStep: boolean;
  isSubmitting?: boolean;
  totalSteps: number;
  onBack: () => void;
  /**
   * Only provided for steps that advance without form submission
   * (steps 0, 2, 3). Step 1 uses formId instead.
   */
  onNext?: () => void;
}

export function OrganizationWizardNavigation({
  canAdvance,
  currentStep,
  formId,
  isLastStep,
  isSubmitting = false,
  onBack,
  onNext,
}: WizardNavigationProps) {
  const isFirstStep = currentStep === 0;

  return (
    <div className="flex items-center justify-between pt-4">
      <Button
        type="button"
        variant="outline"
        onClick={onBack}
        disabled={isFirstStep || isSubmitting}
      >
        Back
      </Button>

      {/* Step 1 submits via RHF — button targets the form by id */}
      {
        formId ? (
          <Button type="submit" form={formId} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Next"}
          </Button>
        ) : !isLastStep ? (
          <Button
            type="button"
            onClick={onNext}
            disabled={!canAdvance || isSubmitting}
          >
            Next
          </Button>
        ) : null /* The last step renders its own Submit button inside the step */
      }
    </div>
  );
}
