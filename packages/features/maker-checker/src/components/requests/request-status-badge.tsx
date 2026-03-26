import React from "react";
import { Badge } from "@repo/ui/primitives/badge";
import { getRequestStatusBadge } from "../../utilities/maker-checker-helpers";
import type { RequestStatus } from "../../types/enums";

interface RequestStatusBadgeProps {
  status: RequestStatus;
}

export function RequestStatusBadge({ status }: RequestStatusBadgeProps) {
  const { label, variant } = getRequestStatusBadge(status);
  return <Badge variant={variant}>{label}</Badge>;
}
