import React from "react";
import { Badge } from "@repo/ui/primitives/badge";
import { getOrganizationStatusBadge } from "../../utilities/status-helpers";
import { OrganizationStatus } from "../../types/enums";

interface OrganizationStatusBadgeProps {
  status: OrganizationStatus;
}

export function OrganizationStatusBadge({
  status,
}: OrganizationStatusBadgeProps) {
  const { label, variant } = getOrganizationStatusBadge(status);
  return <Badge variant={variant}>{label}</Badge>;
}
