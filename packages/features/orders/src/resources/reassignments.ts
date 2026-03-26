import "server-only";

import { PaginatedResponse } from "@repo/shared/server";
import { ReassignmentResponse } from "../types/reassignments";
import { authenticatedOrdersFetch } from "./core/orders-fetch";

export async function searchReassignmentsResource(
  queryString: string,
): Promise<PaginatedResponse<ReassignmentResponse>> {
  return authenticatedOrdersFetch<PaginatedResponse<ReassignmentResponse>>(
    `/orders/reassignments?${queryString}`,
  );
}
