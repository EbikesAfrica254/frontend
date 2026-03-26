import "server-only";

import { SuccessResponse } from "@repo/shared/server";
import { authenticatedOrganizationsFetch } from "./core/organizations-fetch";
import type {
  BranchResponse,
  DeactivateBranchRequest,
  UpdateBranchRequest,
} from "../types/branches";

export async function createBranchResource(
  organizationId: string,
  body: import("../types/branches").CreateBranchRequest,
): Promise<SuccessResponse<BranchResponse>> {
  return authenticatedOrganizationsFetch<SuccessResponse<BranchResponse>>(
    `/organizations/${organizationId}/branches`,
    {
      body: JSON.stringify(body),
      method: "POST",
    },
  );
}

export async function deactivateBranchResource(
  organizationId: string,
  branchId: string,
  body: DeactivateBranchRequest,
): Promise<SuccessResponse<BranchResponse>> {
  return authenticatedOrganizationsFetch<SuccessResponse<BranchResponse>>(
    `/organizations/${organizationId}/branches/${branchId}/deactivate`,
    {
      body: JSON.stringify(body),
      method: "PATCH",
    },
  );
}

export async function getBranchResource(
  organizationId: string,
  branchId: string,
): Promise<SuccessResponse<BranchResponse>> {
  return authenticatedOrganizationsFetch<SuccessResponse<BranchResponse>>(
    `/organizations/${organizationId}/branches/${branchId}`,
  );
}

export async function reinstateBranchResource(
  organizationId: string,
  branchId: string,
): Promise<SuccessResponse<BranchResponse>> {
  return authenticatedOrganizationsFetch<SuccessResponse<BranchResponse>>(
    `/organizations/${organizationId}/branches/${branchId}/reinstate`,
    { method: "PATCH" },
  );
}

export async function suspendBranchResource(
  organizationId: string,
  branchId: string,
): Promise<SuccessResponse<BranchResponse>> {
  return authenticatedOrganizationsFetch<SuccessResponse<BranchResponse>>(
    `/organizations/${organizationId}/branches/${branchId}/suspend`,
    { method: "PATCH" },
  );
}

export async function updateBranchResource(
  organizationId: string,
  branchId: string,
  body: UpdateBranchRequest,
): Promise<SuccessResponse<void>> {
  return authenticatedOrganizationsFetch<SuccessResponse<void>>(
    `/organizations/${organizationId}/branches/${branchId}`,
    {
      body: JSON.stringify(body),
      method: "PUT",
    },
  );
}
