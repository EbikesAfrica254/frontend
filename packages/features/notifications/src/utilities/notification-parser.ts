import { SseNotification } from "../types/sse";

export function parseNotificationMessage(data: string): SseNotification | null {
  try {
    const parsed = JSON.parse(data);

    if (!parsed.id || !parsed.type || !parsed.message) {
      console.warn("Invalid notification format:", parsed);
      return null;
    }

    return {
      id: parsed.id,
      type: parsed.type,
      title: parsed.title || "",
      message: parsed.message,
      timestamp: parsed.timestamp || Date.now(),
      read: parsed.read || false,
      data: parsed.data || null,
      priority: parsed.priority || "normal",
      actionUrl: parsed.actionUrl || null,
    };
  } catch (error) {
    console.error("Error parsing notification message:", error, data);
    return null;
  }
}

export function isValidNotification(
  notification: unknown,
): notification is Notification {
  if (!notification || typeof notification !== "object") {
    return false;
  }

  const n = notification as Record<string, unknown>;

  return (
    typeof n.id === "string" &&
    typeof n.type === "string" &&
    typeof n.message === "string" &&
    typeof n.timestamp === "number" &&
    typeof n.read === "boolean"
  );
}
