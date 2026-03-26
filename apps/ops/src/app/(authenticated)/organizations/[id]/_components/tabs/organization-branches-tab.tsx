import { getOrganizationBranchesResource } from "@repo/features-organizations/server";
import type { OrganizationResponse } from "@repo/features-organizations/client";
import { BranchActions } from "../table/branch-actions";
import { BranchesTable } from "../table/branches-table";

interface OrganizationBranchesTabProps {
  organization: OrganizationResponse;
}

export async function OrganizationBranchesTab({
  organization,
}: OrganizationBranchesTabProps) {
  const response = await getOrganizationBranchesResource(organization.id);
  const branches = response.data ?? [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {branches.length} {branches.length === 1 ? "branch" : "branches"}
        </p>
        <BranchActions organizationId={organization.id} />
      </div>

      <BranchesTable branches={branches} organizationId={organization.id} />
    </div>
  );
}
