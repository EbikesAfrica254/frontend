import React from "react";
import { Badge } from "@repo/ui/primitives/badge";
import { getPaymentMethodTypeBadge } from "../../utilities/payment-method-helpers";
import { PaymentMethodType } from "../../types/enums";

interface PaymentMethodTypeBadgeProps {
  type: PaymentMethodType;
}

export function PaymentMethodTypeBadge({ type }: PaymentMethodTypeBadgeProps) {
  const { label, variant } = getPaymentMethodTypeBadge(type);
  return <Badge variant={variant}>{label}</Badge>;
}
