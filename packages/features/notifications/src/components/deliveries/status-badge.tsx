import React from "react";
import { DeliveryStatus } from "../../types/enums";

interface DeliveryStatusBadgeProps {
  status: DeliveryStatus;
}

export function DeliveryStatusBadge({ status }: DeliveryStatusBadgeProps) {
  const config = {
    [DeliveryStatus.CHANNEL_DISABLED]: {
      className:
        "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
      label: "Channel Disabled",
    },
    [DeliveryStatus.DELIVERED]: {
      className:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      label: "Delivered",
    },
    [DeliveryStatus.FAILED]: {
      className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      label: "Failed",
    },
    [DeliveryStatus.INVALID_RECIPIENT]: {
      className:
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      label: "Invalid Recipient",
    },
    [DeliveryStatus.PENDING]: {
      className:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      label: "Pending",
    },
    [DeliveryStatus.RATE_LIMITED]: {
      className:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      label: "Rate Limited",
    },
    [DeliveryStatus.SUCCESS]: {
      className:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      label: "Success",
    },
    [DeliveryStatus.TIMEOUT]: {
      className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      label: "Timeout",
    },
  };

  const { className, label } = config[status];

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}
    >
      {label}
    </span>
  );
}
