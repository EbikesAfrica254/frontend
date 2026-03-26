import "server-only";

import { PaginatedResponse, SuccessResponse } from "@repo/shared/server";
import { authenticatedNotificationsFetch } from "../core/notifications-fetch";
import {
  CreateUserPreferenceRequest,
  UpdateUserPreferenceRequest,
  UserPreferenceResponse,
} from "../../types/preferences";
import { NotificationCategory, NotificationChannel } from "../../types/enums";

export async function createUserPreferenceResource(
  userId: string,
  data: CreateUserPreferenceRequest,
): Promise<SuccessResponse<UserPreferenceResponse>> {
  return authenticatedNotificationsFetch<
    SuccessResponse<UserPreferenceResponse>
  >(`/users/${userId}/preferences`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deleteUserPreferenceResource(
  userId: string,
  channel: NotificationChannel,
  category: NotificationCategory,
): Promise<SuccessResponse<void>> {
  return authenticatedNotificationsFetch<SuccessResponse<void>>(
    `/users/${userId}/preferences?channel=${channel}&category=${category}`,
    { method: "DELETE" },
  );
}

export async function getUserPreferenceResource(
  userId: string,
  channel: NotificationChannel,
  category: NotificationCategory,
): Promise<SuccessResponse<UserPreferenceResponse>> {
  return authenticatedNotificationsFetch<
    SuccessResponse<UserPreferenceResponse>
  >(
    `/users/${userId}/preferences/find?channel=${channel}&category=${category}`,
  );
}

export async function searchUserPreferencesResource(
  userId: string,
  queryString: string,
): Promise<PaginatedResponse<UserPreferenceResponse>> {
  return authenticatedNotificationsFetch<
    PaginatedResponse<UserPreferenceResponse>
  >(`/users/${userId}/preferences?${queryString}`);
}

export async function updateUserPreferenceResource(
  userId: string,
  channel: NotificationChannel,
  category: NotificationCategory,
  data: UpdateUserPreferenceRequest,
): Promise<SuccessResponse<UserPreferenceResponse>> {
  return authenticatedNotificationsFetch<
    SuccessResponse<UserPreferenceResponse>
  >(`/users/${userId}/preferences?channel=${channel}&category=${category}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
