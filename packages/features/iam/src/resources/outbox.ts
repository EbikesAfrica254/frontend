import "server-only";

import { PaginatedResponse, SuccessResponse } from "@repo/shared/server";
import { authenticatedIamFetch } from "./core/iam-fetch";
import { OutboxResponse } from "@repo/shared/server";

export async function searchOutboxEventsResource(
  queryString: string,
): Promise<PaginatedResponse<OutboxResponse>> {
  return authenticatedIamFetch<PaginatedResponse<OutboxResponse>>(
    `/outbox?${queryString}`,
  );
}

export async function retryOutboxEventResource(
  id: string,
): Promise<SuccessResponse<void>> {
  return authenticatedIamFetch<SuccessResponse<void>>(`/outbox/${id}/retry`, {
    method: "PATCH",
  });
}

export async function retryAllFailedOutboxEventsResource(): Promise<
  SuccessResponse<number>
> {
  return authenticatedIamFetch<SuccessResponse<number>>(
    "/outbox/failed/retry",
    {
      method: "POST",
    },
  );
}
