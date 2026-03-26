import { Badge } from "@repo/ui/primitives/badge";
import { getOrderStatusBadge } from "../../utilities/status-helpers";
import { OrderStatus } from "../../types/enums";
import React from "react";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const { label, variant } = getOrderStatusBadge(status);
  return <Badge variant={variant}>{label}</Badge>;
}
