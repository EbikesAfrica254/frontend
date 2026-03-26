import "server-only";

import { PaginatedResponse, SuccessResponse } from "@repo/shared/server";
import { authenticatedWorkforceFetch } from "./core/workforce-fetch";
import type {
  LiftSuspensionRequest,
  SuspendAgentRequest,
  SuspensionDetailResponse,
} from "../types/suspensions";

export async function suspendAgentResource(
  agentId: string,
  body: SuspendAgentRequest,
): Promise<SuccessResponse<SuspensionDetailResponse>> {
  return authenticatedWorkforceFetch<SuccessResponse<SuspensionDetailResponse>>(
    `/agents/${agentId}/suspensions`,
    {
      body: JSON.stringify(body),
      method: "POST",
    },
  );
}

export async function liftSuspensionResource(
  agentId: string,
  body: LiftSuspensionRequest,
): Promise<SuccessResponse<void>> {
  return authenticatedWorkforceFetch<SuccessResponse<void>>(
    `/agents/${agentId}/suspensions/active/lift`,
    {
      body: JSON.stringify(body),
      method: "PATCH",
    },
  );
}

export async function searchSuspensionsResource(
  agentId: string,
  queryString: string,
): Promise<PaginatedResponse<SuspensionDetailResponse>> {
  return authenticatedWorkforceFetch<
    PaginatedResponse<SuspensionDetailResponse>
  >(`/agents/${agentId}/suspensions?${queryString}`);
}

export async function getSuspensionResource(
  suspensionId: string,
): Promise<SuccessResponse<SuspensionDetailResponse>> {
  return authenticatedWorkforceFetch<SuccessResponse<SuspensionDetailResponse>>(
    `/agents/suspensions/${suspensionId}`,
  );
}
