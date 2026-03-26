export type NotificationPriority = "low" | "normal" | "high" | "urgent";

export type NotificationType =
  | "MAKER_CHECKER_REQUEST"
  | "APPROVAL_APPROVED"
  | "APPROVAL_REJECTED"
  | "APPROVAL_CANCELLED"
  | "SYSTEM_ALERT"
  | "INFO";

export interface SseNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  priority: NotificationPriority;
  actionUrl: string | null;
  data: NotificationData | null;
}

/**
 * Generic notification data - can be extended by specific notification types
 */
export interface NotificationData {
  [key: string]: unknown;
}

/**
 * Message format received from SSE stream
 */
export interface SSEMessage {
  id: string;
  type: string;
  title?: string;
  message: string;
  timestamp?: number;
  read?: boolean;
  priority?: string;
  actionUrl?: string | null;
  data?: Record<string, unknown> | null;
}
