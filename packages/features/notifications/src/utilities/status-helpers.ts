import {
  DeliveryStatus,
  NotificationStatus,
  OutboxStatus,
} from "../types/enums";

type BadgeVariant = "default" | "destructive" | "outline" | "secondary";

export function getDeliveryStatusBadge(status: DeliveryStatus): {
  label: string;
  variant: BadgeVariant;
} {
  const statusMap: Record<
    DeliveryStatus,
    { label: string; variant: BadgeVariant }
  > = {
    [DeliveryStatus.CHANNEL_DISABLED]: {
      label: "Channel Disabled",
      variant: "secondary",
    },
    [DeliveryStatus.DELIVERED]: { label: "Delivered", variant: "default" },
    [DeliveryStatus.FAILED]: { label: "Failed", variant: "destructive" },
    [DeliveryStatus.INVALID_RECIPIENT]: {
      label: "Invalid Recipient",
      variant: "destructive",
    },
    [DeliveryStatus.PENDING]: { label: "Pending", variant: "outline" },
    [DeliveryStatus.RATE_LIMITED]: {
      label: "Rate Limited",
      variant: "secondary",
    },
    [DeliveryStatus.SUCCESS]: { label: "Success", variant: "default" },
    [DeliveryStatus.TIMEOUT]: { label: "Timeout", variant: "destructive" },
  };

  return statusMap[status];
}

export function getNotificationStatusBadge(status: NotificationStatus): {
  label: string;
  variant: BadgeVariant;
} {
  const statusMap: Record<
    NotificationStatus,
    { label: string; variant: BadgeVariant }
  > = {
    [NotificationStatus.CANCELLED]: {
      label: "Cancelled",
      variant: "secondary",
    },
    [NotificationStatus.DELIVERED]: { label: "Delivered", variant: "default" },
    [NotificationStatus.FAILED]: { label: "Failed", variant: "destructive" },
    [NotificationStatus.PENDING]: { label: "Pending", variant: "outline" },
    [NotificationStatus.PROCESSING]: {
      label: "Processing",
      variant: "secondary",
    },
  };

  return statusMap[status];
}

export function getOutboxStatusBadge(status: OutboxStatus): {
  label: string;
  variant: BadgeVariant;
} {
  const statusMap: Record<
    OutboxStatus,
    { label: string; variant: BadgeVariant }
  > = {
    [OutboxStatus.FAILED]: { label: "Failed", variant: "destructive" },
    [OutboxStatus.PENDING]: { label: "Pending", variant: "outline" },
    [OutboxStatus.SENT]: { label: "Sent", variant: "default" },
  };

  return statusMap[status];
}
