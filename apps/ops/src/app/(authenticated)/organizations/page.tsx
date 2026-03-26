import Link from "next/link";
import { Button } from "@repo/ui/primitives/button";
import { buildQueryString } from "@repo/shared/client";
import {
  organizationsParamsCache,
  searchOrganizationsResource,
} from "@repo/features-organizations/server";
import { OrganizationFilters } from "@repo/features-organizations/client";
import { OrganizationsTable } from "./_components/organizations-table";

interface OrganizationsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function OrganizationsPage({
  searchParams,
}: OrganizationsPageProps) {
  const resolvedParams = await searchParams;
  const filters = organizationsParamsCache.parse(resolvedParams);

  const queryString = buildQueryString({
    activatedDateFrom:
      filters.activatedDateFrom?.toISOString().split("T")[0] ?? null,
    activatedDateTo:
      filters.activatedDateTo?.toISOString().split("T")[0] ?? null,
    complianceStatus: filters.complianceStatus,
    createdDateFrom:
      filters.createdDateFrom?.toISOString().split("T")[0] ?? null,
    createdDateTo: filters.createdDateTo?.toISOString().split("T")[0] ?? null,
    legalName: filters.legalName,
    page: filters.page ?? 1,
    registrationType: filters.registrationType,
    size: filters.size ?? 20,
    sortBy: filters.sortBy,
    sortDirection: filters.sortDirection,
    status: filters.status,
  });

  const response = await searchOrganizationsResource(queryString);

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div />
        <Button asChild>
          <Link href="/organizations/create">Create Organization</Link>
        </Button>
      </div>

      <OrganizationFilters />

      <OrganizationsTable
        data={response.data}
        pageCount={response.totalPages}
        totalElements={response.totalElements}
      />
    </div>
  );
}
