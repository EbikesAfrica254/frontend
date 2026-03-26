import { Badge } from "@repo/ui/primitives/badge";
import { getDraftStatusBadge } from "../../utilities/status-helpers";
import { DraftStatus } from "../../types/enums";
import React from "react";

interface DraftStatusBadgeProps {
  status: DraftStatus;
}

export function DraftStatusBadge({ status }: DraftStatusBadgeProps) {
  const { label, variant } = getDraftStatusBadge(status);
  return <Badge variant={variant}>{label}</Badge>;
}
