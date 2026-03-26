"use client";

import { Eye } from "lucide-react";
import Link from "next/link";
import type { AgentSummaryResponse } from "@repo/features-workforce/client";
import {
  AgentStatusBadge,
  CapabilityClassBadge,
} from "@repo/features-workforce/client";
import { Button } from "@repo/ui/primitives/button";
import { TableCell, TableRow } from "@repo/ui/primitives/table";
import { formatDateTime } from "@repo/shared/client";

interface AgentsTableRowProps {
  agent: AgentSummaryResponse;
}

export function AgentsTableRow({ agent }: AgentsTableRowProps) {
  return (
    <TableRow>
      <TableCell className="max-w-55">
        <span className="block truncate text-sm font-medium">
          {agent.firstName} {agent.lastName}
        </span>
      </TableCell>

      <TableCell className="hidden max-w-40 sm:table-cell">
        <span className="block truncate text-sm">{agent.phoneNumber}</span>
      </TableCell>

      <TableCell className="max-w-35">
        <CapabilityClassBadge capabilityClass={agent.capabilityClass} />
      </TableCell>

      <TableCell className="max-w-37.5">
        <AgentStatusBadge status={agent.availabilityStatus} />
      </TableCell>

      <TableCell className="hidden max-w-30 lg:table-cell">
        <span className="block truncate text-sm">
          {agent.reliabilityScore ?? "—"}
        </span>
      </TableCell>

      <TableCell className="hidden max-w-45 md:table-cell">
        <span className="block truncate text-sm text-muted-foreground">
          {formatDateTime(agent.createdAt)}
        </span>
      </TableCell>

      <TableCell className="w-18 text-right">
        <Button variant="ghost" size="sm" asChild>
          <Link
            href={`/workforce/agents/${agent.id}`}
            aria-label={`View agent ${agent.id}`}
          >
            <Eye className="h-4 w-4" />
          </Link>
        </Button>
      </TableCell>
    </TableRow>
  );
}
