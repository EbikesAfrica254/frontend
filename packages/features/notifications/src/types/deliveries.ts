import type { DeliveryStatus } from "./enums";

export interface DeliveryResponse {
  attemptNumber: number;
  attemptedAt: string;
  completedAt?: string;
  costAmount?: number;
  costCurrency?: string;
  errorCode?: string;
  errorMessage?: string;
  id: string;
  nextRetryAt?: string;
  notificationId: string;
  providerMessageId?: string;
  status: DeliveryStatus;
}
