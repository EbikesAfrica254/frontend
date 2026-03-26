import { Suspense } from "react";
import { Skeleton } from "@repo/ui/primitives/skeleton";
import { buildQueryString } from "@repo/shared/client";
import {
  reassignmentsParamsCache,
  searchReassignmentsResource,
} from "@repo/features-orders/server";
import { ReassignmentsTable } from "./_components/reassignments-table";
import { ReassignmentFilters } from "@repo/features-orders/client";

interface ReassignmentsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ReassignmentsPage({
  searchParams,
}: ReassignmentsPageProps) {
  const resolvedParams = await searchParams;
  const filters = reassignmentsParamsCache.parse(resolvedParams);

  const queryString = buildQueryString({
    initiatedBy: filters.initiatedBy,
    orderId: filters.orderId,
    page: filters.page ?? 1,
    reason: filters.reason,
    size: filters.size ?? 20,
    sortBy: filters.sortBy ?? "createdAt",
    sortDirection: filters.sortDirection ?? "DESC",
    status: filters.status,
  });

  const response = await searchReassignmentsResource(queryString);

  return (
    <div className="space-y-6 p-4">
      <ReassignmentFilters />

      <Suspense fallback={<Skeleton className="h-125 w-full rounded-lg" />}>
        <ReassignmentsTable
          data={response.data}
          pageCount={response.totalPages}
          totalElements={response.totalElements}
        />
      </Suspense>
    </div>
  );
}
