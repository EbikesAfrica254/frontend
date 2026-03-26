import React from "react";
import { Badge } from "@repo/ui/primitives/badge";
import { getDecisionBadge } from "../../utilities/maker-checker-helpers";
import type { Decision } from "../../types/enums";

interface DecisionBadgeProps {
  decision: Decision;
}

export function DecisionBadge({ decision }: DecisionBadgeProps) {
  const { label, variant } = getDecisionBadge(decision);
  return <Badge variant={variant}>{label}</Badge>;
}
