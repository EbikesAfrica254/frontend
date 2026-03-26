import React from "react";
import { Badge } from "@repo/ui/primitives/badge";
import { getAvailabilityStatusBadge } from "../../utilities/status-helpers";
import { AvailabilityStatus } from "../../types/enums";

interface AgentStatusBadgeProps {
  status: AvailabilityStatus;
}

export function AgentStatusBadge({ status }: AgentStatusBadgeProps) {
  const { label, variant } = getAvailabilityStatusBadge(status);
  return <Badge variant={variant}>{label}</Badge>;
}
