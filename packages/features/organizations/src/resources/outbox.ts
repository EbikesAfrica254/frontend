import "server-only";

import { PaginatedResponse, SuccessResponse } from "@repo/shared/server";
import { authenticatedOrganizationsFetch } from "./core/organizations-fetch";
import type { OutboxResponse } from "../types/outbox";

export async function searchOutboxEventsResource(
  queryString: string,
): Promise<PaginatedResponse<OutboxResponse>> {
  return authenticatedOrganizationsFetch<PaginatedResponse<OutboxResponse>>(
    `/outbox?${queryString}`,
  );
}

export async function retryOutboxEventResource(
  id: string,
): Promise<SuccessResponse<void>> {
  return authenticatedOrganizationsFetch<SuccessResponse<void>>(
    `/outbox/${id}/retry`,
    {
      method: "PATCH",
    },
  );
}

export async function retryAllFailedOutboxEventsResource(): Promise<
  SuccessResponse<number>
> {
  return authenticatedOrganizationsFetch<SuccessResponse<number>>(
    `/outbox/failed/retry`,
    {
      method: "POST",
    },
  );
}
