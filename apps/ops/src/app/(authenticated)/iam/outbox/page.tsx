import { OutboxFilters, OutboxTable } from "@repo/shared/client";
import { resolveOutboxQueryString } from "@repo/shared/server";
import { searchOutboxEventsResource } from "@repo/features-iam/server";
import {
  retryAllFailedEvents,
  retryFailedEvent,
} from "@repo/features-iam/actions";

interface OutboxPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function OutboxPage({ searchParams }: OutboxPageProps) {
  const queryString = await resolveOutboxQueryString(searchParams);
  const response = await searchOutboxEventsResource(queryString);

  return (
    <div className="space-y-6 p-4">
      <OutboxFilters />
      <OutboxTable
        data={response.data}
        pageCount={response.totalPages}
        totalElements={response.totalElements}
        onRetry={retryFailedEvent}
        onRetryAll={retryAllFailedEvents}
      />
    </div>
  );
}
