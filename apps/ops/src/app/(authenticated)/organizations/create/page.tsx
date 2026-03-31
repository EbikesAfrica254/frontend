import { resolveOwnerAssignmentPolicy } from "@repo/features-workflows/server";
import { CreateOrganizationWizardClient } from "./_components/create-organization-wizard-client";

export default async function CreateOrganizationPage() {
  const ownerAssignmentPolicy = await resolveOwnerAssignmentPolicy();

  return (
    <CreateOrganizationWizardClient
      ownerAssignmentPolicy={ownerAssignmentPolicy}
    />
  );
}
