import { buildQueryString } from "@repo/shared/client";
import {
  outboxParamsCache,
  searchOutboxEventsResource,
} from "@repo/features-iam/server";
import { OutboxFilters } from "@repo/features-iam/client";
import { OutboxTable } from "./components/outbox-table";

interface OutboxPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function OutboxPage({ searchParams }: OutboxPageProps) {
  const resolvedParams = await searchParams;
  const filters = outboxParamsCache.parse(resolvedParams);

  const queryString = buildQueryString({
    eventType: filters.eventType,
    maxRetryCount: filters.maxRetryCount,
    minRetryCount: filters.minRetryCount,
    page: filters.page ?? 1,
    size: filters.size ?? 20,
    sortBy: filters.sortBy,
    sortDirection: filters.sortDirection,
    status: filters.status,
  });

  const response = await searchOutboxEventsResource(queryString);
  const events = response.data;

  return (
    <div className="space-y-6 p-4">
      <OutboxFilters />
      <OutboxTable
        data={events}
        pageCount={response.totalPages}
        totalElements={response.totalElements}
      />
    </div>
  );
}
