import { buildQueryString } from "@repo/shared/client";
import { notificationsParamsCache } from "@repo/features-notifications/server";
import { NotificationsTable } from "./_components/notifications-table";
import { searchNotifications } from "@repo/features-notifications/actions";
import { NotificationFilters } from "@repo/features-notifications/client";

interface NotificationsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function NotificationsPage({
  searchParams,
}: NotificationsPageProps) {
  const resolvedParams = await searchParams;
  const filters = notificationsParamsCache.parse(resolvedParams);

  const queryString = buildQueryString({
    branchId: filters.branchId,
    channel: filters.channel,
    createdAtFrom: filters.createdAtFrom?.toISOString() ?? null,
    createdAtTo: filters.createdAtTo?.toISOString() ?? null,
    organizationId: filters.organizationId,
    page: filters.page ?? 1,
    recipient: filters.recipient,
    size: filters.size ?? 20,
    sortBy: filters.sortBy,
    sortDirection: filters.sortDirection,
    status: filters.status,
    templateId: filters.templateId,
  });

  const response = await searchNotifications(queryString);

  return (
    <div className="space-y-6 p-4">
      <NotificationFilters />
      <NotificationsTable
        data={response.success ? response.data.data : []}
        pageCount={response.success ? response.data.totalPages : 0}
        totalElements={response.success ? response.data.totalElements : 0}
      />
    </div>
  );
}
