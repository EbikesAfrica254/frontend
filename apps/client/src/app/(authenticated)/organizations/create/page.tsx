import { auth } from "@repo/features-auth/server";
import { isBaseOrganization } from "@repo/features-iam/client";
import { redirect } from "next/navigation";
import { CreateOrganizationWizardClient } from "./_components/create-organization-wizard-client";

export default async function CreateOrganizationPage() {
  const session = await auth();
  const ownerId = session?.user?.keycloakUserId;

  if (!ownerId) {
    throw new Error("User not authenticated");
  }

  if (!isBaseOrganization(session)) {
    redirect("/organizations");
  }

  return <CreateOrganizationWizardClient ownerId={ownerId} />;
}
