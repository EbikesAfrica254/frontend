import { Suspense } from "react";
import { Skeleton } from "@repo/ui/primitives/skeleton";
import { buildQueryString } from "@repo/shared/client";
import {
  draftsParamsCache,
  searchDraftsResource,
} from "@repo/features-orders/server";
import { auth } from "@repo/features-auth/server";
import { DraftFilters } from "@repo/features-orders/client";
import { getOrganization } from "@repo/features-organizations/actions";
import { DraftsTable } from "./_components/table/drafts-table";
import { CreateDraftSheet } from "./_components/sheets/create-draft-sheet";

interface DraftsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function DraftsPage({ searchParams }: DraftsPageProps) {
  const resolvedParams = await searchParams;
  const filters = draftsParamsCache.parse(resolvedParams);
  const session = await auth();

  const queryString = buildQueryString({
    branchId: filters.branchId,
    contactStatus: filters.contactStatus,
    createdDateFrom: filters.createdDateFrom,
    createdDateTo: filters.createdDateTo,
    customerId: filters.customerId,
    customerPhone: filters.customerPhone,
    expiresDateFrom: filters.expiresDateFrom,
    expiresDateTo: filters.expiresDateTo,
    organizationId: filters.organizationId,
    page: filters.page ?? 1,
    size: filters.size ?? 20,
    sortBy: filters.sortBy,
    sortDirection: filters.sortDirection,
    status: filters.status,
  });

  const isSystemAdmin = session?.user.roles.includes("SYSTEM_ADMIN");

  const [response, organizationResult] = await Promise.all([
    searchDraftsResource(queryString),
    !isSystemAdmin && session?.user.activeOrganization
      ? getOrganization(session.user.activeOrganization)
      : Promise.resolve(null),
  ]);

  const drafts = response.data;
  const organizationName = organizationResult?.success
    ? organizationResult.data.displayName
    : undefined;

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div></div>
        <CreateDraftSheet organizationName={organizationName} />
      </div>

      <DraftFilters />

      <Suspense fallback={<TableSkeleton />}>
        <DraftsTable
          data={drafts}
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
