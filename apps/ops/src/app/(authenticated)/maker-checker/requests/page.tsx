import { buildQueryString } from "@repo/shared/client";
import { auth } from "@repo/features-auth/server";
import {
  requestsParamsCache,
  searchRequestsResource,
} from "@repo/features-maker-checker/server";
import { RequestFilters } from "@repo/features-maker-checker/client";
import { RequestsTable } from "./_components/requests-table";

interface RequestsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function RequestsPage({
  searchParams,
}: RequestsPageProps) {
  const resolvedParams = await searchParams;
  const filters = requestsParamsCache.parse(resolvedParams);

  const session = await auth();
  const currentUserId = session?.user?.keycloakUserId ?? "";

  const queryString = buildQueryString({
    createdAtFrom: filters.createdAtFrom,
    createdAtTo: filters.createdAtTo,
    entityId: filters.entityId,
    entityType: filters.entityType,
    makerId: filters.makerId,
    organizationId: filters.organizationId,
    page: filters.page ?? 1,
    size: filters.size ?? 20,
    sortBy: filters.sortBy,
    sortDirection: filters.sortDirection,
    status: filters.status,
    updatedAtFrom: filters.updatedAtFrom,
    updatedAtTo: filters.updatedAtTo,
  });

  const response = await searchRequestsResource(queryString);

  return (
    <div className="space-y-6 p-4">
      <RequestFilters />
      <RequestsTable
        currentUserId={currentUserId}
        data={response.data}
        pageCount={response.totalPages}
        totalElements={response.totalElements}
      />
    </div>
  );
}
