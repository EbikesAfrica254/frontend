import { buildQueryString } from "@repo/shared/client";
import {
  agentsParamsCache,
  searchAgentsResource,
} from "@repo/features-workforce/server";
import { AgentFilters } from "@repo/features-workforce/client";
import { AgentsTable } from "./_components/agents-table";
import { CreateAgentButton } from "./_components/create-agent-button";

interface AgentsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function AgentsPage({ searchParams }: AgentsPageProps) {
  const resolvedParams = await searchParams;
  const filters = agentsParamsCache.parse(resolvedParams);

  const queryString = buildQueryString({
    availabilityStatus: filters.availabilityStatus,
    capabilityClass: filters.capabilityClass,
    createdAtFrom: filters.createdAtFrom,
    createdAtTo: filters.createdAtTo,
    firstName: filters.firstName,
    hasActiveSuspension: filters.hasActiveSuspension,
    lastName: filters.lastName,
    nationalIdNumber: filters.nationalIdNumber,
    page: filters.page ?? 1,
    phoneNumber: filters.phoneNumber,
    reliabilityScoreMax: filters.reliabilityScoreMax,
    reliabilityScoreMin: filters.reliabilityScoreMin,
    size: filters.size ?? 20,
    sortBy: filters.sortBy,
    sortDirection: filters.sortDirection,
  });

  const response = await searchAgentsResource(queryString);
  const agents = response.data;

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div></div>
        <CreateAgentButton />
      </div>

      <AgentFilters />
      <AgentsTable
        data={agents}
        pageCount={response.totalPages}
        totalElements={response.totalElements}
      />
    </div>
  );
}
