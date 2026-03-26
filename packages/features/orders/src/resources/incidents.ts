import "server-only";

import { PaginatedResponse } from "@repo/shared/server";
import { IncidentResponse } from "../types/incidents";
import { authenticatedOrdersFetch } from "./core/orders-fetch";

export async function searchIncidentsResource(
  queryString: string,
): Promise<PaginatedResponse<IncidentResponse>> {
  return authenticatedOrdersFetch<PaginatedResponse<IncidentResponse>>(
    `/orders/incidents?${queryString}`,
  );
}
