import "server-only";

import { PaginatedResponse, SuccessResponse } from "@repo/shared/server";
import { authenticatedMakerCheckerFetch } from "./core/maker-checker-fetch";
import {
  ApproveRequestRequest,
  DecisionResponse,
  FieldChangeResponse,
  RejectRequestRequest,
  RequestDetailResponse,
  RequestSummaryResponse,
} from "../types/requests";

export async function approveRequestResource(
  id: string,
  data?: ApproveRequestRequest,
): Promise<SuccessResponse<void>> {
  return authenticatedMakerCheckerFetch<SuccessResponse<void>>(
    `/requests/${id}/approve`,
    {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    },
  );
}

export async function cancelRequestResource(
  id: string,
): Promise<SuccessResponse<void>> {
  return authenticatedMakerCheckerFetch<SuccessResponse<void>>(
    `/requests/${id}/cancel`,
    {
      method: "POST",
    },
  );
}

export async function getRequestDecisionResource(
  id: string,
): Promise<SuccessResponse<DecisionResponse>> {
  return authenticatedMakerCheckerFetch<SuccessResponse<DecisionResponse>>(
    `/requests/${id}/decision`,
  );
}

export async function getRequestDetailsResource(
  id: string,
): Promise<SuccessResponse<RequestDetailResponse>> {
  return authenticatedMakerCheckerFetch<SuccessResponse<RequestDetailResponse>>(
    `/requests/${id}/details`,
  );
}

export async function getRequestFieldChangesResource(
  id: string,
): Promise<SuccessResponse<FieldChangeResponse[]>> {
  return authenticatedMakerCheckerFetch<SuccessResponse<FieldChangeResponse[]>>(
    `/requests/${id}/field-changes`,
  );
}

export async function rejectRequestResource(
  id: string,
  data: RejectRequestRequest,
): Promise<SuccessResponse<void>> {
  return authenticatedMakerCheckerFetch<SuccessResponse<void>>(
    `/requests/${id}/reject`,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
}

export async function searchRequestsResource(
  queryString: string,
): Promise<PaginatedResponse<RequestSummaryResponse>> {
  return authenticatedMakerCheckerFetch<
    PaginatedResponse<RequestSummaryResponse>
  >(`/requests?${queryString}`);
}
