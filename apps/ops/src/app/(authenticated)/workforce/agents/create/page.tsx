import { notFound } from "next/navigation";
import { auth } from "@repo/features-auth/server";
import { UserRole } from "@repo/shared/client";
import { hasRole } from "@repo/features-auth/client";
import { CreateAgentWizardClient } from "./_components/create-agent-wizard-client";

export default async function CreateAgentPage() {
  const session = await auth();

  const isSystemAdmin = hasRole(session, UserRole.SYSTEM_ADMIN);
  const isCustomer = hasRole(session, UserRole.CUSTOMER);

  if (!isSystemAdmin && !isCustomer) {
    notFound();
  }

  const userId = session?.user?.keycloakUserId;

  if (!userId) {
    notFound();
  }

  return (
    <div className="p-4">
      <CreateAgentWizardClient
        userId={userId}
        allowUserOverride={isSystemAdmin}
      />
    </div>
  );
}
