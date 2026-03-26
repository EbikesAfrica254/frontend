import "server-only";
import {
  CreateMembershipRequest,
  MembershipResponse,
  UpdateMembershipRolesRequest,
} from "../types/membership";
import { authenticatedIamFetch } from "./core/iam-fetch";
import { SuccessResponse } from "@repo/shared/server";

export async function createMembershipResource(
  keycloakUserId: string,
  data: CreateMembershipRequest,
): Promise<SuccessResponse<MembershipResponse>> {
  return authenticatedIamFetch<SuccessResponse<MembershipResponse>>(
    `/memberships/${keycloakUserId}`,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
}

export async function getMembershipsResource(
  keycloakUserId: string,
): Promise<SuccessResponse<MembershipResponse[]>> {
  return authenticatedIamFetch<SuccessResponse<MembershipResponse[]>>(
    `/memberships/${keycloakUserId}`,
  );
}

export async function removeMembershipResource(
  keycloakUserId: string,
  organizationId: string,
  keycloakGroupPath: string,
  branchId?: string,
): Promise<SuccessResponse<void>> {
  const branchParam = branchId ? `&branchId=${branchId}` : "";
  return authenticatedIamFetch<SuccessResponse<void>>(
    `/memberships/${keycloakUserId}?organizationId=${organizationId}&keycloakGroupPath=${encodeURIComponent(keycloakGroupPath)}${branchParam}`,
    {
      method: "DELETE",
    },
  );
}

export async function removeFromOrganizationResource(
  keycloakUserId: string,
  organizationId: string,
  keycloakGroupPath: string,
): Promise<SuccessResponse<void>> {
  return authenticatedIamFetch<SuccessResponse<void>>(
    `/memberships/${keycloakUserId}/organizations/${organizationId}?keycloakGroupPath=${encodeURIComponent(keycloakGroupPath)}`,
    {
      method: "DELETE",
    },
  );
}

export async function setPrimaryMembershipResource(
  keycloakUserId: string,
  organizationId: string,
): Promise<SuccessResponse<void>> {
  return authenticatedIamFetch<SuccessResponse<void>>(
    `/memberships/${keycloakUserId}/primary?organizationId=${organizationId}`,
    {
      method: "PUT",
    },
  );
}

export async function updateMembershipRolesResource(
  keycloakUserId: string,
  organizationId: string,
  branchId: string | undefined,
  data: UpdateMembershipRolesRequest,
): Promise<SuccessResponse<void>> {
  const branchParam = branchId ? `&branchId=${branchId}` : "";
  return authenticatedIamFetch<SuccessResponse<void>>(
    `/memberships/${keycloakUserId}/roles?organizationId=${organizationId}${branchParam}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    },
  );
}
