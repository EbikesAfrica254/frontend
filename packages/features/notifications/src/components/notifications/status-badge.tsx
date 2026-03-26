import React from "react";
import { Badge } from "@repo/ui/primitives/badge";
import { getNotificationStatusBadge } from "../../utilities/status-helpers";
import { NotificationStatus } from "../../types/enums";

interface NotificationStatusBadgeProps {
  status: NotificationStatus;
}

export function NotificationStatusBadge({
  status,
}: NotificationStatusBadgeProps) {
  const { label, variant } = getNotificationStatusBadge(status);
  return <Badge variant={variant}>{label}</Badge>;
}
