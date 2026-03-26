"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import type { OrderSummaryResponse } from "@repo/features-orders/client";
import { OrderStatusBadge } from "@repo/features-orders/client";
import { TableCell, TableRow } from "@repo/ui/primitives/table";
import { Button } from "@repo/ui/primitives/button";
import { formatDateTime } from "@repo/shared/client";

interface OrdersTableRowProps {
  order: OrderSummaryResponse;
}

export function OrdersTableRow({ order }: OrdersTableRowProps) {
  return (
    <TableRow>
      <TableCell className="max-w-40">
        <span className="block truncate font-mono text-xs">
          {order.customerId}
        </span>
      </TableCell>

      <TableCell className="max-w-60">
        <span className="block truncate text-sm">{order.pickupAddress}</span>
      </TableCell>

      <TableCell className="hidden max-w-60 md:table-cell">
        <span className="block truncate text-sm">{order.deliveryAddress}</span>
      </TableCell>

      <TableCell className="hidden max-w-35 xl:table-cell">
        <span className="block truncate text-sm">
          {order.orderType.replace(/_/g, " ")}
        </span>
      </TableCell>

      <TableCell className="max-w-32.5">
        <OrderStatusBadge status={order.status} />
      </TableCell>

      <TableCell className="max-w-45">
        <span className="block truncate text-sm text-muted-foreground">
          {formatDateTime(order.createdAt)}
        </span>
      </TableCell>

      <TableCell className="w-18 text-right">
        <Button variant="ghost" size="sm" asChild>
          <Link
            href={`/orders/${order.id}`}
            aria-label={`View order ${order.id}`}
          >
            <Eye className="h-4 w-4" />
          </Link>
        </Button>
      </TableCell>
    </TableRow>
  );
}
