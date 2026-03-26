import React from "react";
import { Badge } from "@repo/ui/primitives/badge";
import { getOutboxStatusBadge } from "../../utilities/status-helpers";
import type { OutboxStatus } from "../../types/enums";

interface OutboxStatusBadgeProps {
  status: OutboxStatus;
}

export function OutboxStatusBadge({ status }: OutboxStatusBadgeProps) {
  const { label, variant } = getOutboxStatusBadge(status);
  return <Badge variant={variant}>{label}</Badge>;
}
