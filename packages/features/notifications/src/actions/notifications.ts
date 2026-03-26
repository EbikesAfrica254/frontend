"use server";

import { revalidatePath } from "next/cache";
import { withAction, withPaginatedAction } from "@repo/shared/actions";
import {
  cancelNotificationResource,
  getNotificationDeliveriesResource,
  getNotificationResource,
  searchNotificationsResource,
} from "../resources/notifications";

export const cancelNotification = withAction(async (id: string) => {
  const result = await cancelNotificationResource(id);

  revalidatePath(`/notifications/${id}`);
  revalidatePath("/notifications");

  return result;
});

export const getNotification = withAction(async (id: string) => {
  return getNotificationResource(id);
});

export const getNotificationDeliveries = withAction(
  async (notificationId: string) => {
    return getNotificationDeliveriesResource(notificationId);
  },
);

export const searchNotifications = withPaginatedAction(
  async (queryString: string) => {
    return searchNotificationsResource(queryString);
  },
);
