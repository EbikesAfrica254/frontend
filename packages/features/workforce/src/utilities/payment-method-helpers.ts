import { PaymentMethodType } from "../types/enums";

type BadgeVariant = "default" | "destructive" | "outline" | "secondary";

export function getPaymentMethodTypeBadge(type: PaymentMethodType): {
  label: string;
  variant: BadgeVariant;
} {
  const typeMap: Record<
    PaymentMethodType,
    { label: string; variant: BadgeVariant }
  > = {
    [PaymentMethodType.MPESA_PERSONAL]: {
      label: "M-Pesa Personal",
      variant: "default",
    },
    [PaymentMethodType.MPESA_TILL]: {
      label: "M-Pesa Till",
      variant: "secondary",
    },
    [PaymentMethodType.MPESA_PAYBILL]: {
      label: "M-Pesa Paybill",
      variant: "outline",
    },
  };

  return typeMap[type];
}

export function formatPaymentMethodType(type: PaymentMethodType): string {
  const labels: Record<PaymentMethodType, string> = {
    [PaymentMethodType.MPESA_PERSONAL]: "M-Pesa Personal",
    [PaymentMethodType.MPESA_TILL]: "M-Pesa Till",
    [PaymentMethodType.MPESA_PAYBILL]: "M-Pesa Paybill",
  };

  return labels[type] ?? type;
}
