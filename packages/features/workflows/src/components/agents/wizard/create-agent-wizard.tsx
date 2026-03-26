// create-agent-wizard.tsx
"use client";

import React, { useEffect } from "react";
import { Separator } from "@repo/ui/primitives/separator";
import { AgentWizardProgress } from "./wizard-progress";
import { AgentWizardNavigation } from "./wizard-navigation";
import { AgentInfoStep } from "./steps/agent-info-step";
import { AgentDocumentsUploadStep } from "./steps/documents-upload-step";
import { AgentReviewSubmitStep } from "./steps/review-submit-step";
import { useAgentWizardStore } from "../../../store/agent-wizard-store";
import {
  canAdvanceAgentWizardFrom,
  AGENT_WIZARD_STEPS,
} from "../../../lib/agent-wizard-steps";
import { searchUsers } from "@repo/features-iam/actions";

interface CreateAgentWizardProps {
  userId: string;
  allowUserOverride?: boolean;
  onSuccess: (agentId: string) => void;
}

export function CreateAgentWizard({
  userId,
  allowUserOverride = false,
  onSuccess,
}: CreateAgentWizardProps) {
  const store = useAgentWizardStore();
  const { currentStep, previousStep, nextStep, setUserId } = store;

  useEffect(() => {
    setUserId(userId);
  }, [userId, setUserId]);

  const canAdvance = canAdvanceAgentWizardFrom(currentStep, store);
  const isLastStep = currentStep === AGENT_WIZARD_STEPS.length - 1;

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <AgentInfoStep
            allowUserOverride={allowUserOverride}
            onUserSearchFetch={searchUsers}
          />
        );
      case 1:
        return <AgentDocumentsUploadStep />;
      case 2:
        return <AgentReviewSubmitStep onSuccess={onSuccess} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 p-4">
      <AgentWizardProgress
        currentStep={currentStep}
        steps={AGENT_WIZARD_STEPS}
      />
      <Separator />
      <div className="min-h-100">{renderStep()}</div>

      {!isLastStep && (
        <AgentWizardNavigation
          canAdvance={canAdvance}
          currentStep={currentStep}
          formId={currentStep === 0 ? "agent-info-form" : undefined}
          isLastStep={isLastStep}
          onBack={previousStep}
          onNext={currentStep !== 0 ? nextStep : undefined}
          totalSteps={AGENT_WIZARD_STEPS.length}
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
