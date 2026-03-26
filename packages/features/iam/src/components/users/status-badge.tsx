import React from "react";
import { Badge } from "@repo/ui/primitives/badge";
import { getUserStatusBadge } from "../../utilities/status-helpers";
import { UserStatus } from "../../types/enums";

interface UserStatusBadgeProps {
  status: UserStatus;
}

export function UserStatusBadge({ status }: UserStatusBadgeProps) {
  const { label, variant } = getUserStatusBadge(status);
  return <Badge variant={variant}>{label}</Badge>;
}
