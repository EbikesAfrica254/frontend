import { Badge } from "@repo/ui/primitives/badge";
import { getContactStatusBadge } from "../../utilities/status-helpers";
import { ContactStatus } from "../../types/enums";
import React from "react";

interface ContactStatusBadgeProps {
  status: ContactStatus;
}

export function ContactStatusBadge({ status }: ContactStatusBadgeProps) {
  const { label, variant } = getContactStatusBadge(status);
  return <Badge variant={variant}>{label}</Badge>;
}
