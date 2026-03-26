import React from "react";
import { Badge } from "@repo/ui/primitives/badge";
import { getCapabilityClassBadge } from "../../utilities/capability-class-helpers";
import { CapabilityClass } from "../../types/enums";

interface CapabilityClassBadgeProps {
  capabilityClass: CapabilityClass;
}

export function CapabilityClassBadge({
  capabilityClass,
}: CapabilityClassBadgeProps) {
  const { label, variant } = getCapabilityClassBadge(capabilityClass);
  return <Badge variant={variant}>{label}</Badge>;
}
