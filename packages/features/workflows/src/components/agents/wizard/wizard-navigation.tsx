"use client";

import { Button } from "@repo/ui/primitives/button";
import React from "react";

interface WizardNavigationProps {
  canAdvance: boolean;
  currentStep: number;
  formId?: string;
  isLastStep: boolean;
  isSubmitting?: boolean;
  totalSteps: number;
  onBack: () => void;
  onNext?: () => void;
}

export function AgentWizardNavigation({
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

      {formId ? (
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
      ) : null}
    </div>
  );
}
