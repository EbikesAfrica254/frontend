import "server-only";

import { PaginatedResponse, SuccessResponse } from "@repo/shared/server";
import { authenticatedNotificationsFetch } from "./core/notifications-fetch";
import {
  CreateTemplateRequest,
  TemplateResponse,
  TemplateSummaryResponse,
  UpdateTemplateRequest,
} from "../types/templates";

export async function activateTemplateResource(
  id: string,
): Promise<SuccessResponse<TemplateResponse>> {
  return authenticatedNotificationsFetch<SuccessResponse<TemplateResponse>>(
    `/templates/${id}/activate`,
    {
      method: "PUT",
    },
  );
}

export async function createTemplateResource(
  data: CreateTemplateRequest,
): Promise<SuccessResponse<TemplateResponse>> {
  return authenticatedNotificationsFetch<SuccessResponse<TemplateResponse>>(
    `/templates`,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
}

export async function deactivateTemplateResource(
  id: string,
): Promise<SuccessResponse<TemplateResponse>> {
  return authenticatedNotificationsFetch<SuccessResponse<TemplateResponse>>(
    `/templates/${id}/deactivate`,
    {
      method: "PUT",
    },
  );
}

export async function getTemplateResource(
  id: string,
): Promise<SuccessResponse<TemplateResponse>> {
  return authenticatedNotificationsFetch<SuccessResponse<TemplateResponse>>(
    `/templates/${id}`,
  );
}

export async function searchTemplatesResource(
  queryString: string,
): Promise<PaginatedResponse<TemplateSummaryResponse>> {
  return authenticatedNotificationsFetch<
    PaginatedResponse<TemplateSummaryResponse>
  >(`/templates?${queryString}`);
}

export async function updateTemplateResource(
  id: string,
  data: UpdateTemplateRequest,
): Promise<SuccessResponse<TemplateResponse>> {
  return authenticatedNotificationsFetch<SuccessResponse<TemplateResponse>>(
    `/templates/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
  );
}
