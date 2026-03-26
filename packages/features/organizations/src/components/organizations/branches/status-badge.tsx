import React from "react";
import { Badge } from "@repo/ui/primitives/badge";
import { getBranchStatusBadge } from "../../../utilities/status-helpers";
import { BranchStatus } from "../../../types/enums";

interface BranchStatusBadgeProps {
  status: BranchStatus;
}

export function BranchStatusBadge({ status }: BranchStatusBadgeProps) {
  const { label, variant } = getBranchStatusBadge(status);
  return <Badge variant={variant}>{label}</Badge>;
}
