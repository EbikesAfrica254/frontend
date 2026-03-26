import "server-only";

import { PaginatedResponse, SuccessResponse } from "@repo/shared/server";
import {
  CreateDraftsFromDocumentRequest,
  DraftDetailResponse,
  DraftSummaryResponse,
  UpdateDeliveryLocationRequest,
} from "../types/drafts";
import { authenticatedOrdersFetch } from "./core/orders-fetch";
import { OrderDetailResponse } from "../types/orders";

export async function convertDraftToOrderResource(
  id: string,
): Promise<SuccessResponse<OrderDetailResponse>> {
  return authenticatedOrdersFetch<SuccessResponse<OrderDetailResponse>>(
    `/drafts/${id}/convert`,
    { method: "POST" },
  );
}

export async function createDraftsFromDocumentResource(
  data: CreateDraftsFromDocumentRequest,
): Promise<SuccessResponse<void>> {
  return authenticatedOrdersFetch<SuccessResponse<void>>(`/drafts`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getDraftByIdResource(
  id: string,
): Promise<SuccessResponse<DraftDetailResponse>> {
  return authenticatedOrdersFetch<SuccessResponse<DraftDetailResponse>>(
    `/drafts/${id}`,
  );
}

export async function searchDraftsResource(
  queryString: string,
): Promise<PaginatedResponse<DraftSummaryResponse>> {
  return authenticatedOrdersFetch<PaginatedResponse<DraftSummaryResponse>>(
    `/drafts?${queryString}`,
  );
}

export async function updateDraftDeliveryLocationResource(
  id: string,
  data: UpdateDeliveryLocationRequest,
): Promise<SuccessResponse<DraftDetailResponse>> {
  return authenticatedOrdersFetch<SuccessResponse<DraftDetailResponse>>(
    `/drafts/${id}/delivery-location`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    },
  );
}
