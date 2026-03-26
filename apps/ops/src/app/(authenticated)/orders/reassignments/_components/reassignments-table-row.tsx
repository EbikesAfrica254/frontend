"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import type { ReassignmentResponse } from "@repo/features-orders/client";
import { formatDateTime } from "@repo/shared/client";
import { Badge } from "@repo/ui/primitives/badge";
import { Button } from "@repo/ui/primitives/button";
import { TableCell, TableRow } from "@repo/ui/primitives/table";

interface ReassignmentsTableRowProps {
  reassignment: ReassignmentResponse;
}

const STATUS_VARIANT: Record<
  string,
  "default" | "secondary" | "destructive" | "outline"
> = {
  COMPLETED: "secondary",
  FAILED: "destructive",
  PENDING: "default",
};

export function ReassignmentsTableRow({
  reassignment,
}: ReassignmentsTableRowProps) {
  return (
    <TableRow>
      <TableCell className="font-mono text-xs">
        <Link
          href={`/orders/${reassignment.orderId}`}
          className="truncate whitespace-nowrap hover:underline"
          title={reassignment.orderId}
        >
          {reassignment.orderId}
        </Link>
      </TableCell>

      <TableCell>{reassignment.attemptNumber}</TableCell>

      <TableCell className="truncate whitespace-nowrap">
        {reassignment.reason}
      </TableCell>

      <TableCell className="font-mono text-xs text-muted-foreground truncate whitespace-nowrap">
        {reassignment.previousAgentId}
      </TableCell>

      <TableCell className="font-mono text-xs text-muted-foreground truncate whitespace-nowrap">
        {reassignment.newAgentId ?? "—"}
      </TableCell>

      <TableCell>
        <Badge variant={STATUS_VARIANT[reassignment.status] ?? "outline"}>
          {reassignment.status}
        </Badge>
      </TableCell>

      <TableCell className="truncate whitespace-nowrap">
        {reassignment.initiatedBy}
      </TableCell>

      <TableCell>{formatDateTime(reassignment.createdAt)}</TableCell>

      <TableCell>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/orders/${reassignment.orderId}`}>
            <Eye className="h-4 w-4" />
            <span className="sr-only">View order</span>
          </Link>
        </Button>
      </TableCell>
    </TableRow>
  );
}
