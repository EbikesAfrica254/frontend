import { Suspense } from "react";
import { Skeleton } from "@repo/ui/primitives/skeleton";
import { buildQueryString } from "@repo/shared/client";
import {
  incidentsParamsCache,
  searchIncidentsResource,
} from "@repo/features-orders/server";
import { IncidentFilters } from "@repo/features-orders/client";
import { IncidentsTable } from "./_components/incidents-table";

interface IncidentsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function IncidentsPage({
  searchParams,
}: IncidentsPageProps) {
  const resolvedParams = await searchParams;
  const filters = incidentsParamsCache.parse(resolvedParams);

  const queryString = buildQueryString({
    agentId: filters.agentId,
    incidentType: filters.incidentType,
    notes: filters.notes,
    orderId: filters.orderId,
    page: filters.page ?? 1,
    reportedBy: filters.reportedBy,
    reportedDateFrom: filters.reportedDateFrom,
    reportedDateTo: filters.reportedDateTo,
    size: filters.size ?? 20,
    sortBy: filters.sortBy,
    sortDirection: filters.sortDirection,
  });

  const response = await searchIncidentsResource(queryString);
  const incidents = response.data;

  return (
    <div className="space-y-6 p-4">
      <IncidentFilters />

      <Suspense fallback={<TableSkeleton />}>
        <IncidentsTable
          data={incidents}
          pageCount={response.totalPages}
          totalElements={response.totalElements}
        />
      </Suspense>
    </div>
  );
}

function TableSkeleton() {
  return <Skeleton className="h-150 w-full rounded-lg" />;
}
