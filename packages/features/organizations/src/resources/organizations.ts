import "server-only";

import { PaginatedResponse, SuccessResponse } from "@repo/shared/server";
import { authenticatedOrganizationsFetch } from "./core/organizations-fetch";
import type {
  CreateOrganizationRequest,
  DeactivateOrganizationRequest,
  OrganizationResponse,
  OrganizationSummaryResponse,
  UpdateOrganizationRequest,
} from "../types/organizations";
import type { BranchSummaryResponse } from "../types/branches";
import type {
  DocumentPreviewResponse,
  DocumentSummaryResponse,
} from "../types/documents";

export async function createOrganizationResource(
  body: CreateOrganizationRequest,
): Promise<SuccessResponse<OrganizationResponse>> {
  return authenticatedOrganizationsFetch<SuccessResponse<OrganizationResponse>>(
    `/organizations`,
    {
      body: JSON.stringify(body),
      method: "POST",
    },
  );
}

export async function deactivateOrganizationResource(
  organizationId: string,
  body: DeactivateOrganizationRequest,
): Promise<SuccessResponse<OrganizationResponse>> {
  return authenticatedOrganizationsFetch<SuccessResponse<OrganizationResponse>>(
    `/organizations/${organizationId}/deactivate`,
    {
      body: JSON.stringify(body),
      method: "PATCH",
    },
  );
}

export async function getOrganizationBranchesResource(
  organizationId: string,
  includeInactive = false,
): Promise<SuccessResponse<BranchSummaryResponse[]>> {
  return authenticatedOrganizationsFetch<
    SuccessResponse<BranchSummaryResponse[]>
  >(
    `/organizations/${organizationId}/branches?includeInactive=${includeInactive}`,
  );
}

export async function getOrganizationDocumentPreviewsResource(
  organizationId: string,
  includeInactive = false,
): Promise<SuccessResponse<DocumentPreviewResponse[]>> {
  return authenticatedOrganizationsFetch<
    SuccessResponse<DocumentPreviewResponse[]>
  >(
    `/organizations/${organizationId}/documents/previews?includeInactive=${includeInactive}`,
  );
}

export async function getOrganizationDocumentsResource(
  organizationId: string,
  includeInactive = true,
): Promise<SuccessResponse<DocumentSummaryResponse[]>> {
  return authenticatedOrganizationsFetch<
    SuccessResponse<DocumentSummaryResponse[]>
  >(
    `/organizations/${organizationId}/documents?includeInactive=${includeInactive}`,
  );
}

export async function getOrganizationResource(
  organizationId: string,
): Promise<SuccessResponse<OrganizationResponse>> {
  return authenticatedOrganizationsFetch<SuccessResponse<OrganizationResponse>>(
    `/organizations/${organizationId}`,
  );
}

export async function searchOrganizationsResource(
  queryString: string,
): Promise<PaginatedResponse<OrganizationSummaryResponse>> {
  return authenticatedOrganizationsFetch<
    PaginatedResponse<OrganizationSummaryResponse>
  >(`/organizations?${queryString}`);
}

export async function updateOrganizationResource(
  organizationId: string,
  body: UpdateOrganizationRequest,
): Promise<SuccessResponse<void>> {
  return authenticatedOrganizationsFetch<SuccessResponse<void>>(
    `/organizations/${organizationId}`,
    {
      body: JSON.stringify(body),
      method: "PUT",
    },
  );
}
