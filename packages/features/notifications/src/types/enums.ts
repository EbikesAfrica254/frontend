export enum DeliveryStatus {
  CHANNEL_DISABLED = "CHANNEL_DISABLED",
  DELIVERED = "DELIVERED",
  FAILED = "FAILED",
  INVALID_RECIPIENT = "INVALID_RECIPIENT",
  PENDING = "PENDING",
  RATE_LIMITED = "RATE_LIMITED",
  SUCCESS = "SUCCESS",
  TIMEOUT = "TIMEOUT",
}

export enum NotificationCategory {
  MARKETING = "MARKETING",
  OPERATIONAL = "OPERATIONAL",
  SECURITY = "SECURITY",
  TRANSACTIONAL = "TRANSACTIONAL",
}

export enum NotificationChannel {
  EMAIL = "EMAIL",
  SMS = "SMS",
  SSE = "SSE",
  WHATSAPP = "WHATSAPP",
}

export enum NotificationStatus {
  CANCELLED = "CANCELLED",
  DELIVERED = "DELIVERED",
  FAILED = "FAILED",
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
}

export enum OutboxStatus {
  FAILED = "FAILED",
  PENDING = "PENDING",
  SENT = "SENT",
}

export enum TemplateContentType {
  HTML = "HTML",
  PLAIN_TEXT = "PLAIN_TEXT",
}

export enum TemplateVariableType {
  BOOLEAN = "BOOLEAN",
  DATE = "DATE",
  NUMBER = "NUMBER",
  STRING = "STRING",
}
