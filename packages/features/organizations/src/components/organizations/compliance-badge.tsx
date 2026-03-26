import React from "react";
import { Badge } from "@repo/ui/primitives/badge";
import { getComplianceStatusBadge } from "../../utilities/status-helpers";
import type { ComplianceStatus } from "../../types/enums";

interface ComplianceStatusBadgeProps {
  status: ComplianceStatus;
}

export function ComplianceStatusBadge({ status }: ComplianceStatusBadgeProps) {
  const { label, variant } = getComplianceStatusBadge(status);
  return <Badge variant={variant}>{label}</Badge>;
}
