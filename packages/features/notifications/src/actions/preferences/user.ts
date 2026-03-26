"use server";

import { revalidatePath } from "next/cache";
import { withAction, withPaginatedAction } from "@repo/shared/actions";
import {
  createUserPreferenceResource,
  deleteUserPreferenceResource,
  searchUserPreferencesResource,
  updateUserPreferenceResource,
} from "../../resources/preferences/user";
import type {
  CreateUserPreferenceRequest,
  UpdateUserPreferenceRequest,
} from "../../types/preferences";
import { NotificationCategory, NotificationChannel } from "../../types/enums";

export const createUserPreference = withAction(
  async (userId: string, data: CreateUserPreferenceRequest) => {
    const result = await createUserPreferenceResource(userId, data);
    revalidatePath(`/notifications/preferences`);
    return result;
  },
);

export const deleteUserPreference = withAction(
  async (
    userId: string,
    channel: NotificationChannel,
    category: NotificationCategory,
  ) => {
    const result = await deleteUserPreferenceResource(
      userId,
      channel,
      category,
    );
    revalidatePath(`/notifications/preferences`);
    return result;
  },
);

export const searchUserPreferences = withPaginatedAction(
  async (userId: string, queryString: string) => {
    return await searchUserPreferencesResource(userId, queryString);
  },
);

export const updateUserPreference = withAction(
  async (
    userId: string,
    channel: NotificationChannel,
    category: NotificationCategory,
    data: UpdateUserPreferenceRequest,
  ) => {
    const result = await updateUserPreferenceResource(
      userId,
      channel,
      category,
      data,
    );
    revalidatePath(`/notifications/preferences`);
    return result;
  },
);
