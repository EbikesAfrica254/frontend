import { auth } from "@repo/features-auth/server";
import { buildQueryString } from "@repo/shared/client";
import {
  preferredAgentsParamsCache,
  searchPreferredAgentsResource,
} from "@repo/features-workforce/server";
import { PreferredAgentFilters } from "@repo/features-workforce/client";
import { PreferredAgentsTable } from "./_components/preferred-agents-table";
import { CreatePreferredAgentButton } from "./_components/create-preferred-agent-button";

interface PreferredAgentsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function PreferredAgentsPage({
  searchParams,
}: PreferredAgentsPageProps) {
  const resolvedParams = await searchParams;
  const filters = preferredAgentsParamsCache.parse(resolvedParams);
  const session = await auth();

  const queryString = buildQueryString({
    agentId: filters.agentId,
    branchId: filters.branchId,
    organizationId: filters.organizationId,
    page: filters.page ?? 1,
    size: filters.size ?? 20,
    sortBy: filters.sortBy,
    sortDirection: filters.sortDirection,
  });

  const response = await searchPreferredAgentsResource(queryString);
  const preferredAgents = response.data;

  const organizationId = session?.user.activeOrganization ?? null;

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div></div>
        <CreatePreferredAgentButton organizationId={organizationId} />
      </div>

      <PreferredAgentFilters />
      <PreferredAgentsTable
        data={preferredAgents}
        pageCount={response.totalPages}
        totalElements={response.totalElements}
      />
    </div>
  );
}
