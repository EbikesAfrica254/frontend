import { buildQueryString } from "@repo/shared/client";
import { templateParamsCache } from "@repo/features-notifications/server";
import { searchTemplates } from "@repo/features-notifications/actions";
import { TemplateFilters } from "@repo/features-notifications/client";
import { TemplatesTable } from "./_components/templates-table";

interface TemplatesPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function TemplatesPage({
  searchParams,
}: TemplatesPageProps) {
  const resolvedParams = await searchParams;
  const filters = templateParamsCache.parse(resolvedParams);

  const queryString = buildQueryString({
    channel: filters.channel,
    contentType: filters.contentType,
    isActive: filters.isActive,
    name: filters.name,
    page: filters.page ?? 1,
    size: filters.size ?? 20,
    sortBy: filters.sortBy,
    sortDirection: filters.sortDirection,
  });

  const response = await searchTemplates(queryString);

  return (
    <div className="space-y-6 p-4">
      <TemplateFilters />
      <TemplatesTable
        data={response.success ? response.data.data : []}
        pageCount={response.success ? response.data.totalPages : 0}
        totalElements={response.success ? response.data.totalElements : 0}
      />
    </div>
  );
}
