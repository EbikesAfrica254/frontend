import React from "react";
import { Badge } from "@repo/ui/primitives/badge";
import { getDocumentStatusBadge } from "../../utilities/status-helpers";
import { DocumentStatus } from "../../types/enums";

interface DocumentStatusBadgeProps {
  status: DocumentStatus;
}

export function DocumentStatusBadge({ status }: DocumentStatusBadgeProps) {
  const { label, variant } = getDocumentStatusBadge(status);
  return <Badge variant={variant}>{label}</Badge>;
}
