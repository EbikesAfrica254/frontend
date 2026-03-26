import type { OrganizationWizardState } from "../store/organization-wizard-store";
import { WizardStep } from "../types/wizards";

export const ORGANIZATION_WIZARD_STEPS: WizardStep[] = [
  {
    key: "registration-type",
    label: "Registration Type",
    description: "Select your business legal structure",
  },
  {
    key: "organization-info",
    label: "Organization Info",
    description: "Enter your business details and address",
  },
  {
    key: "documents",
    label: "Documents",
    description: "Upload required compliance documents",
  },
  {
    key: "review-submit",
    label: "Review & Submit",
    description: "Review all details before submitting",
  },
];

export const ORGANIZATION_WIZARD_LAST_STEP =
  ORGANIZATION_WIZARD_STEPS.length - 1;

export function canAdvanceOrganizationWizardFrom(
  step: number,
  store: OrganizationWizardState,
): boolean {
  switch (step) {
    case 0:
      return !!store.registrationType;
    case 1:
      return !!store.organizationInfo && store.addresses.length > 0;
    case 2:
      return (
        store.requiredDocumentTypes.length > 0 &&
        store.requiredDocumentTypes.every((type) =>
          store.documents.some((doc) => doc.documentType === type),
        )
      );
    case 3:
      return false;
    default:
      return false;
  }
}
