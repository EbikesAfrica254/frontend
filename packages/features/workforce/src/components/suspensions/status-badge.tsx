import React from "react";
import { Badge } from "@repo/ui/primitives/badge";
import { getSuspensionStatusBadge } from "../../utilities/status-helpers";

interface SuspensionStatusBadgeProps {
  isActive: boolean;
}

export function SuspensionStatusBadge({
  isActive,
}: SuspensionStatusBadgeProps) {
  const { label, variant } = getSuspensionStatusBadge(isActive);
  return <Badge variant={variant}>{label}</Badge>;
}
