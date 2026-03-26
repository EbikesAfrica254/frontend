// create-agent-wizard-client.tsx
"use client";

import { useRouter } from "next/navigation";
import { CreateAgentWizard } from "@repo/features-workflows/client";

interface CreateAgentWizardClientProps {
  userId: string;
  allowUserOverride: boolean;
}

export function CreateAgentWizardClient({
  userId,
  allowUserOverride,
}: CreateAgentWizardClientProps) {
  const router = useRouter();

  return (
    <CreateAgentWizard
      userId={userId}
      allowUserOverride={allowUserOverride}
      onSuccess={(id) => router.push(`/workforce/agents/${id}`)}
    />
  );
}
