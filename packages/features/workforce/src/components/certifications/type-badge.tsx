import React from "react";
import { Badge } from "@repo/ui/primitives/badge";
import { getCertificationTypeBadge } from "../../utilities/status-helpers";
import { CertificationType } from "../../types/enums";

interface CertificationTypeBadgeProps {
  type: CertificationType;
}

export function CertificationTypeBadge({ type }: CertificationTypeBadgeProps) {
  const { label, variant } = getCertificationTypeBadge(type);
  return <Badge variant={variant}>{label}</Badge>;
}
