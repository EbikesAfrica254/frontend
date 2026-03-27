"use client";

import Link from "next/link";
import { ExternalLink, Eye } from "lucide-react";
import type { NotificationSummaryResponse } from "@repo/features-notifications/client";
import { NotificationStatusBadge } from "@repo/features-notifications/client";
import { Button } from "@repo/ui/primitives/button";
import { TableCell, TableRow } from "@repo/ui/primitives/table";
import { formatDateTime } from "@repo/shared/client";

interface NotificationsTableRowProps {
  notification: NotificationSummaryResponse;
}

export function NotificationsTableRow({
  notification,
}: NotificationsTableRowProps) {
  return (
    <TableRow>
      <TableCell className="max-w-28">
        <span className="block truncate text-sm">{notification.channel}</span>
      </TableCell>

      <TableCell className="max-w-56">
        <span className="block truncate text-sm">{notification.recipient}</span>
      </TableCell>

      <TableCell className="max-w-32">
        <NotificationStatusBadge status={notification.status} />
      </TableCell>

      <TableCell className="hidden max-w-52 md:table-cell">
        {notification.templateId ? (
          <Link
            className="inline-flex max-w-full items-center gap-1 font-mono text-xs text-muted-foreground hover:text-foreground hover:underline"
            href={`/notifications/templates/${notification.templateId}`}
          >
            <span className="truncate">{notification.templateId}</span>
            <ExternalLink className="h-3 w-3 shrink-0" />
          </Link>
        ) : (
          <span className="block truncate font-mono text-xs text-muted-foreground">
            —
          </span>
        )}
      </TableCell>

      <TableCell className="hidden max-w-45 lg:table-cell">
        <span className="block truncate text-sm text-muted-foreground">
          {formatDateTime(notification.createdAt)}
        </span>
      </TableCell>

      <TableCell className="w-18 text-right">
        <Button asChild size="sm" variant="ghost">
          <Link
            href={`/notifications/${notification.id}`}
            aria-label={`View notification ${notification.id}`}
          >
            <Eye className="h-4 w-4" />
          </Link>
        </Button>
      </TableCell>
    </TableRow>
  );
}
