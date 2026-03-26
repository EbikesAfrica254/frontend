"use client";

import { Eye } from "lucide-react";
import Link from "next/link";
import type { DraftSummaryResponse } from "@repo/features-orders/client";
import {
  ContactStatusBadge,
  DraftStatusBadge,
} from "@repo/features-orders/client";
import { Button } from "@repo/ui/primitives/button";
import { TableCell, TableRow } from "@repo/ui/primitives/table";
import { formatDateTime } from "@repo/shared/client";

interface DraftsTableRowProps {
  draft: DraftSummaryResponse;
}

export function DraftsTableRow({ draft }: DraftsTableRowProps) {
  return (
    <TableRow>
      <TableCell className="max-w-40">
        <span className="block truncate text-sm">{draft.customerPhone}</span>
      </TableCell>

      <TableCell className="max-w-30">
        <DraftStatusBadge status={draft.status} />
      </TableCell>

      <TableCell className="max-w-32.5">
        <ContactStatusBadge status={draft.contactStatus} />
      </TableCell>

      <TableCell className="hidden max-w-22.5 sm:table-cell">
        <span className="block truncate text-sm">{draft.itemCount}</span>
      </TableCell>

      <TableCell className="hidden max-w-45 md:table-cell">
        <span className="block truncate text-sm text-muted-foreground">
          {formatDateTime(draft.expiresAt)}
        </span>
      </TableCell>

      <TableCell className="max-w-45">
        <span className="block truncate text-sm text-muted-foreground">
          {formatDateTime(draft.createdAt)}
        </span>
      </TableCell>

      <TableCell className="w-18 text-right">
        <Button variant="ghost" size="sm" asChild>
          <Link
            href={`/orders/drafts/${draft.id}`}
            aria-label={`View draft ${draft.id}`}
          >
            <Eye className="h-4 w-4" />
          </Link>
        </Button>
      </TableCell>
    </TableRow>
  );
}
