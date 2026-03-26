import type { AgentWizardState } from "../store/agent-wizard-store";
import { WizardStep } from "../types/wizards";

export const AGENT_WIZARD_STEPS: WizardStep[] = [
  {
    key: "agent-info",
    label: "Agent Info",
    description:
      "Enter personal details, contact information and capability class",
  },
  {
    key: "documents",
    label: "Documents",
    description: "Upload required identity and compliance documents",
  },
  {
    key: "review-submit",
    label: "Review & Submit",
    description: "Review all details before submitting",
  },
];

export const AGENT_WIZARD_LAST_STEP = AGENT_WIZARD_STEPS.length - 1;

export function canAdvanceAgentWizardFrom(
  step: number,
  store: AgentWizardState,
): boolean {
  switch (step) {
    case 0:
      return !!store.agentInfo;
    case 1:
      return (
        store.requiredDocumentTypes.length > 0 &&
        store.requiredDocumentTypes.every((type) =>
          store.documents.some((doc) => doc.documentType === type),
        )
      );
    case 2:
      return false;
    default:
      return false;
  }
}
