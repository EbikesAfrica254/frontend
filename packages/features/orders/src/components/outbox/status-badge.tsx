import { Badge } from "@repo/ui/primitives/badge";
import { getOutboxStatusBadge } from "../../utilities/status-helpers";
import { OutboxStatus } from "../../types/enums";
import React from "react";

interface OutboxStatusBadgeProps {
  status: OutboxStatus;
}

export function OutboxStatusBadge({ status }: OutboxStatusBadgeProps) {
  const { label, variant } = getOutboxStatusBadge(status);
  return <Badge variant={variant}>{label}</Badge>;
}
