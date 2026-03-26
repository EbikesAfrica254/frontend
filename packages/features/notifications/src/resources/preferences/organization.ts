import "server-only";

import { PaginatedResponse, SuccessResponse } from "@repo/shared/server";
import { authenticatedNotificationsFetch } from "../core/notifications-fetch";
import {
  CreateOrganizationPreferenceRequest,
  OrganizationPreferenceResponse,
  UpdateOrganizationPreferenceRequest,
} from "../../types/preferences";

export async function createOrganizationPreferenceResource(
  data: CreateOrganizationPreferenceRequest,
): Promise<SuccessResponse<OrganizationPreferenceResponse>> {
  return authenticatedNotificationsFetch<
    SuccessResponse<OrganizationPreferenceResponse>
  >(`/organizations/preferences`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deleteOrganizationPreferenceResource(
  id: string,
): Promise<SuccessResponse<void>> {
  return await authenticatedNotificationsFetch<SuccessResponse<void>>(
    `/organizations/preferences/${id}`,
    {
      method: "DELETE",
    },
  );
}

export async function getOrganizationPreferenceResource(
  id: string,
): Promise<SuccessResponse<OrganizationPreferenceResponse>> {
  return authenticatedNotificationsFetch<
    SuccessResponse<OrganizationPreferenceResponse>
  >(`/organizations/preferences/${id}`);
}

export async function searchOrganizationPreferencesResource(
  queryString: string,
): Promise<PaginatedResponse<OrganizationPreferenceResponse>> {
  return authenticatedNotificationsFetch<
    PaginatedResponse<OrganizationPreferenceResponse>
  >(`/organizations/preferences?${queryString}`);
}

export async function updateOrganizationPreferenceResource(
  id: string,
  data: UpdateOrganizationPreferenceRequest,
): Promise<SuccessResponse<OrganizationPreferenceResponse>> {
  return authenticatedNotificationsFetch<
    SuccessResponse<OrganizationPreferenceResponse>
  >(`/organizations/preferences/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
