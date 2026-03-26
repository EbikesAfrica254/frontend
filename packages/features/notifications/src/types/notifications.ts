import type { NotificationChannel, NotificationStatus } from "./enums";

export interface NotificationResponse {
  branchId?: string;
  channel: NotificationChannel;
  createdAt: string;
  createdBy: string;
  id: string;
  messageBody?: string;
  messageSubject?: string;
  organizationId?: string;
  recipient: string;
  serviceReference?: string;
  status: NotificationStatus;
  templateId?: string;
  templateVersion?: number;
  updatedAt: string;
  updatedBy: string;
  variables?: Record<string, unknown>;
}

export interface NotificationSummaryResponse {
  branchId?: string;
  channel: NotificationChannel;
  createdAt: string;
  createdBy: string;
  id: string;
  organizationId?: string;
  recipient: string;
  serviceReference?: string;
  status: NotificationStatus;
  templateId: string;
  templateVersion?: number;
  updatedAt: string;
  updatedBy: string;
}
