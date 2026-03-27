import "server-only";

import { PaginatedResponse, SuccessResponse } from "@repo/shared/server";
import { authenticatedMakerCheckerFetch } from "./core/maker-checker-fetch";
import { OutboxResponse } from "../types/outbox";

export async function searchOutboxEventsResource(
  queryString: string,
): Promise<PaginatedResponse<OutboxResponse>> {
  return authenticatedMakerCheckerFetch<PaginatedResponse<OutboxResponse>>(
    `/outbox?${queryString}`,
  );
}

export async function retryOutboxEventResource(
  id: string,
): Promise<SuccessResponse<void>> {
  return authenticatedMakerCheckerFetch<SuccessResponse<void>>(
    `/outbox/${id}/retry`,
    {
      method: "PATCH",
    },
  );
}

export async function retryAllFailedOutboxEventsResource(): Promise<
  SuccessResponse<number>
> {
  return authenticatedMakerCheckerFetch<SuccessResponse<number>>(
    "/outbox/failed/retry",
    {
      method: "POST",
    },
  );
}
