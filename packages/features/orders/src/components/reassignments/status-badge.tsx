import { Badge } from "@repo/ui/primitives/badge";
import { getReassignmentStatusBadge } from "../../utilities/status-helpers";
import { ReassignmentStatus } from "../../types/enums";
import React from "react";

interface ReassignmentStatusBadgeProps {
  status: ReassignmentStatus;
}

export function ReassignmentStatusBadge({
  status,
}: ReassignmentStatusBadgeProps) {
  const { label, variant } = getReassignmentStatusBadge(status);
  return <Badge variant={variant}>{label}</Badge>;
}
