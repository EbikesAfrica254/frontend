import "server-only";

import { PaginatedResponse, SuccessResponse } from "@repo/shared/server";
import { authenticatedWorkforceFetch } from "./core/workforce-fetch";
import type {
  AgentDetailResponse,
  AgentSummaryResponse,
  CreateAgentRequest,
  UpdateAgentRequest,
} from "../types/agents";
import type { AvailabilityLogEntry } from "../types/agents";
import type {
  LocationHistoryEntry,
  UpdateLocationRequest,
} from "../types/location";
import type {
  DocumentPreviewResponse,
  DocumentSummaryResponse,
} from "../types/documents";

export async function createAgentResource(
  body: CreateAgentRequest,
): Promise<SuccessResponse<AgentDetailResponse>> {
  return authenticatedWorkforceFetch<SuccessResponse<AgentDetailResponse>>(
    `/agents`,
    {
      body: JSON.stringify(body),
      method: "POST",
    },
  );
}

export async function getAgentResource(
  agentId: string,
): Promise<SuccessResponse<AgentDetailResponse>> {
  return authenticatedWorkforceFetch<SuccessResponse<AgentDetailResponse>>(
    `/agents/${agentId}`,
  );
}

export async function searchAgentsResource(
  queryString: string,
): Promise<PaginatedResponse<AgentSummaryResponse>> {
  return authenticatedWorkforceFetch<PaginatedResponse<AgentSummaryResponse>>(
    `/agents?${queryString}`,
  );
}

export async function updateAgentResource(
  agentId: string,
  body: UpdateAgentRequest,
): Promise<SuccessResponse<void>> {
  return authenticatedWorkforceFetch<SuccessResponse<void>>(
    `/agents/${agentId}`,
    {
      body: JSON.stringify(body),
      method: "PATCH",
    },
  );
}

export async function deactivateAgentResource(
  agentId: string,
): Promise<SuccessResponse<void>> {
  return authenticatedWorkforceFetch<SuccessResponse<void>>(
    `/agents/${agentId}`,
    {
      method: "DELETE",
    },
  );
}

export async function updateAvailabilityResource(
  agentId: string,
  status: string,
  reason?: string,
): Promise<SuccessResponse<void>> {
  const params = new URLSearchParams({ status });
  if (reason) params.set("reason", reason);
  return authenticatedWorkforceFetch<SuccessResponse<void>>(
    `/agents/${agentId}/availability?${params.toString()}`,
    {
      method: "PATCH",
    },
  );
}

export async function getAvailabilityLogResource(
  agentId: string,
  queryString: string,
): Promise<PaginatedResponse<AvailabilityLogEntry>> {
  return authenticatedWorkforceFetch<PaginatedResponse<AvailabilityLogEntry>>(
    `/agents/${agentId}/availability-log?${queryString}`,
  );
}

export async function updateLocationResource(
  agentId: string,
  data: UpdateLocationRequest,
): Promise<SuccessResponse<void>> {
  return authenticatedWorkforceFetch<SuccessResponse<void>>(
    `/agents/${agentId}/location`,
    {
      body: JSON.stringify(data),
      method: "PATCH",
    },
  );
}

export async function getLocationHistoryResource(
  agentId: string,
  queryString: string,
): Promise<PaginatedResponse<LocationHistoryEntry>> {
  return authenticatedWorkforceFetch<PaginatedResponse<LocationHistoryEntry>>(
    `/agents/${agentId}/location-history?${queryString}`,
  );
}

export async function resubmitAgentResource(
  agentId: string,
): Promise<SuccessResponse<void>> {
  return authenticatedWorkforceFetch<SuccessResponse<void>>(
    `/agents/${agentId}/resubmit`,
    {
      method: "POST",
    },
  );
}

export async function getAgentDocumentPreviewsResource(
  agentId: string,
  includeInactive = false,
): Promise<SuccessResponse<DocumentPreviewResponse[]>> {
  return authenticatedWorkforceFetch<
    SuccessResponse<DocumentPreviewResponse[]>
  >(`/agents/${agentId}/documents/previews?includeInactive=${includeInactive}`);
}

export async function getAgentDocumentsResource(
  agentId: string,
  includeInactive = true,
): Promise<SuccessResponse<DocumentSummaryResponse[]>> {
  return authenticatedWorkforceFetch<
    SuccessResponse<DocumentSummaryResponse[]>
  >(`/agents/${agentId}/documents?includeInactive=${includeInactive}`);
}
