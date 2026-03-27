"use client";

import { useRouter } from "next/navigation";
import { CreateOrganizationWizard } from "@repo/features-workflows/client";

type OwnerAssignmentMode =
  | "GLOBAL_SEARCH"
  | "ORGANIZATION_SEARCH"
  | "BRANCH_SEARCH"
  | "FIXED_SELF";

interface OwnerAssignmentPolicy {
  activeBranch?: string;
  activeOrganization?: string;
  initialOwnerDisplayName?: string;
  initialOwnerEmail?: string;
  initialOwnerId: string;
  mode: OwnerAssignmentMode;
}

interface CreateOrganizationWizardClientProps {
  ownerAssignmentPolicy: OwnerAssignmentPolicy;
}

export function CreateOrganizationWizardClient({
  ownerAssignmentPolicy,
}: CreateOrganizationWizardClientProps) {
  const router = useRouter();

  return (
    <CreateOrganizationWizard
      ownerAssignmentPolicy={ownerAssignmentPolicy}
      onSuccess={() => router.push("/organizations")}
    />
  );
}
