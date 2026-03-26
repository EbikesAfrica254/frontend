import type { NotificationCategory, NotificationChannel } from "./enums";

export interface CreateOrganizationPreferenceRequest {
  category: NotificationCategory;
  channel: NotificationChannel;
  enabled?: boolean;
}

export interface CreateUserPreferenceRequest {
  category: NotificationCategory;
  channel: NotificationChannel;
  enabled?: boolean;
}

export interface OrganizationPreferenceResponse {
  category: NotificationCategory;
  channel: NotificationChannel;
  createdAt: string;
  enabled: boolean;
  id: string;
  organizationId: string;
  updatedAt: string;
  version: number;
}

export interface UpdateOrganizationPreferenceRequest {
  enabled: boolean;
}

export interface UpdateUserPreferenceRequest {
  enabled: boolean;
}

export interface UserPreferenceResponse {
  category: NotificationCategory;
  channel: NotificationChannel;
  createdAt: string;
  enabled: boolean;
  id: string;
  organizationId?: string;
  updatedAt: string;
  userId: string;
  version: number;
}
