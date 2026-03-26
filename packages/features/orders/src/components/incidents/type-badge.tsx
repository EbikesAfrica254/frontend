import { Badge } from "@repo/ui/primitives/badge";
import { getIncidentTypeBadge } from "../../utilities/status-helpers";
import { IncidentType } from "../../types/enums";
import React from "react";

interface IncidentTypeBadgeProps {
  type: IncidentType;
}

export function IncidentTypeBadge({ type }: IncidentTypeBadgeProps) {
  const { label, variant } = getIncidentTypeBadge(type);
  return <Badge variant={variant}>{label}</Badge>;
}
