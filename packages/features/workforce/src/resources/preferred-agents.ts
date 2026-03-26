import "server-only";

import { PaginatedResponse, SuccessResponse } from "@repo/shared/server";
import { authenticatedWorkforceFetch } from "./core/workforce-fetch";
import type {
  CreatePreferredAgentRequest,
  PreferredAgentDetailResponse,
  UpdatePreferredAgentRequest,
} from "../types/preferred-agents";

export async function createPreferredAgentResource(
  body: CreatePreferredAgentRequest,
): Promise<SuccessResponse<PreferredAgentDetailResponse>> {
  return authenticatedWorkforceFetch<
    SuccessResponse<PreferredAgentDetailResponse>
  >(`/preferred-agents`, {
    body: JSON.stringify(body),
    method: "POST",
  });
}

export async function searchPreferredAgentsResource(
  queryString: string,
): Promise<PaginatedResponse<PreferredAgentDetailResponse>> {
  return authenticatedWorkforceFetch<
    PaginatedResponse<PreferredAgentDetailResponse>
  >(`/preferred-agents?${queryString}`);
}

export async function getPreferredAgentResource(
  preferredAgentId: string,
): Promise<SuccessResponse<PreferredAgentDetailResponse>> {
  return authenticatedWorkforceFetch<
    SuccessResponse<PreferredAgentDetailResponse>
  >(`/preferred-agents/${preferredAgentId}`);
}

export async function updatePreferredAgentResource(
  preferredAgentId: string,
  body: UpdatePreferredAgentRequest,
): Promise<SuccessResponse<void>> {
  return authenticatedWorkforceFetch<SuccessResponse<void>>(
    `/preferred-agents/${preferredAgentId}`,
    {
      body: JSON.stringify(body),
      method: "PATCH",
    },
  );
}

export async function deletePreferredAgentResource(
  preferredAgentId: string,
): Promise<SuccessResponse<void>> {
  return authenticatedWorkforceFetch<SuccessResponse<void>>(
    `/preferred-agents/${preferredAgentId}`,
    {
      method: "DELETE",
    },
  );
}
