import "server-only";

import { PaginatedResponse, SuccessResponse } from "@repo/shared/server";
import { authenticatedNotificationsFetch } from "./core/notifications-fetch";
import {
  NotificationResponse,
  NotificationSummaryResponse,
} from "../types/notifications";
import { DeliveryResponse } from "../types/deliveries";

export async function cancelNotificationResource(
  id: string,
): Promise<SuccessResponse<void>> {
  return await authenticatedNotificationsFetch<SuccessResponse<void>>(
    `/notifications/${id}`,
    {
      method: "DELETE",
    },
  );
}

export async function getNotificationDeliveriesResource(
  notificationId: string,
): Promise<SuccessResponse<DeliveryResponse[]>> {
  return authenticatedNotificationsFetch<SuccessResponse<DeliveryResponse[]>>(
    `/notifications/${notificationId}/deliveries`,
  );
}

export async function getNotificationResource(
  id: string,
): Promise<SuccessResponse<NotificationResponse>> {
  return authenticatedNotificationsFetch<SuccessResponse<NotificationResponse>>(
    `/notifications/${id}`,
  );
}

export async function searchNotificationsResource(
  queryString: string,
): Promise<PaginatedResponse<NotificationSummaryResponse>> {
  return authenticatedNotificationsFetch<
    PaginatedResponse<NotificationSummaryResponse>
  >(`/notifications?${queryString}`);
}
