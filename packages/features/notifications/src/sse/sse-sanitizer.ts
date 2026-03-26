import DOMPurify from "dompurify";
import type { SseNotification } from "../types/sse";

const PURIFY_CONFIG: DOMPurify.Config = {
  ALLOWED_ATTR: [],
  ALLOWED_TAGS: [],
};

function sanitizeText(value: string): string {
  return DOMPurify.sanitize(value, PURIFY_CONFIG);
}

function sanitizeUrl(value: string): string {
  const trimmed = value.trim();
  return trimmed.startsWith("/") || trimmed.startsWith("https://")
    ? trimmed
    : "";
}

export function sanitizeNotification(
  notification: SseNotification,
): SseNotification {
  return {
    ...notification,
    ...(notification.actionUrl && {
      actionUrl: sanitizeUrl(notification.actionUrl),
    }),
    ...(notification.message && {
      message: sanitizeText(notification.message),
    }),
    ...(notification.title && { title: sanitizeText(notification.title) }),
  };
}
