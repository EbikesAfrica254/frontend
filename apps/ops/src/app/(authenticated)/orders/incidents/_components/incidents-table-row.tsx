"use client";

import Link from "next/link";
import type { IncidentResponse } from "@repo/features-orders/client";
import { IncidentTypeBadge } from "@repo/features-orders/client";
import { formatDateTime } from "@repo/shared/client";
import { Button } from "@repo/ui/primitives/button";
import { TableCell, TableRow } from "@repo/ui/primitives/table";

interface IncidentsTableRowProps {
  incident: IncidentResponse;
}

export function IncidentsTableRow({ incident }: IncidentsTableRowProps) {
  return (
    <TableRow>
      <TableCell className="font-mono text-xs">
        <Button variant="link" size="sm" asChild className="h-auto p-0">
          <Link
            href={`/orders/${incident.orderId}`}
            className="truncate whitespace-nowrap"
            title={incident.orderId}
          >
            {incident.orderId}
          </Link>
        </Button>
      </TableCell>

      <TableCell>
        <IncidentTypeBadge type={incident.incidentType} />
      </TableCell>

      <TableCell className="font-mono text-xs truncate whitespace-nowrap">
        {incident.agentId}
      </TableCell>

      <TableCell className="truncate whitespace-nowrap">
        {incident.reportedBy}
      </TableCell>

      <TableCell className="max-w-0 truncate whitespace-nowrap">
        {incident.notes || "—"}
      </TableCell>

      <TableCell>{formatDateTime(incident.createdAt)}</TableCell>
    </TableRow>
  );
}
