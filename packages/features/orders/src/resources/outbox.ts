import "server-only";

import { PaginatedResponse, SuccessResponse } from "@repo/shared/server";
import { authenticatedOrdersFetch } from "./core/orders-fetch";
import { OutboxResponse } from "../types/outbox";

export async function searchOutboxEventsResource(
  queryString: string,
): Promise<PaginatedResponse<OutboxResponse>> {
  return authenticatedOrdersFetch<PaginatedResponse<OutboxResponse>>(
    `/outbox?${queryString}`,
  );
}

export async function retryOutboxEventResource(
  id: string,
): Promise<SuccessResponse<void>> {
  return authenticatedOrdersFetch<SuccessResponse<void>>(
    `/outbox/${id}/retry`,
    {
      method: "PATCH",
    },
  );
}

export async function retryAllFailedOutboxEventsResource(): Promise<
  SuccessResponse<number>
> {
  return authenticatedOrdersFetch<SuccessResponse<number>>(
    "/outbox/failed/retry",
    {
      method: "POST",
    },
  );
}
