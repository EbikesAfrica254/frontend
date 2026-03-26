"use client";

import { useRouter } from "next/navigation";
import { CreateOrganizationWizard } from "@repo/features-workflows/client";

interface CreateOrganizationWizardClientProps {
  ownerId: string;
}

export function CreateOrganizationWizardClient({
  ownerId,
}: CreateOrganizationWizardClientProps) {
  const router = useRouter();

  return (
    <CreateOrganizationWizard
      ownerId={ownerId}
      allowOwnerOverride={false}
      onSuccess={() => router.push("/organizations")}
    />
  );
}
