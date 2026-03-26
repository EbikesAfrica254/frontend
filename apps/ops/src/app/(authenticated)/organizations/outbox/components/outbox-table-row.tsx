"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { TableCell, TableRow } from "@repo/ui/primitives/table";
import { Button } from "@repo/ui/primitives/button";
import { Badge } from "@repo/ui/primitives/badge";
import {
    getOutboxStatusBadge,
    OutboxResponse,
    OutboxStatus,
} from "@repo/features-iam/client";
import { retryFailedEvent } from "@repo/features-iam/actions";
import { formatDateTime } from "@repo/shared/client";

interface OutboxTableRowProps {
    event: OutboxResponse;
}

export function OutboxTableRow({ event }: OutboxTableRowProps) {
    const [isRetrying, setIsRetrying] = useState(false);

    const handleRetry = async () => {
        setIsRetrying(true);

        const result = await retryFailedEvent(event.id);

        if (result.success) {
            toast.success("Event queued for retry");
        } else {
            toast.error(result.error || "Failed to retry event");
        }

        setIsRetrying(false);
    };

    const isFailed = event.status === OutboxStatus.FAILED;
    const statusBadge = getOutboxStatusBadge(event.status as OutboxStatus);

    return (
        <TableRow>
            <TableCell className="max-w-52">
                <span className="block truncate font-medium">{event.eventType}</span>
            </TableCell>

            <TableCell className="hidden max-w-52 md:table-cell">
        <span className="block truncate font-mono text-xs text-muted-foreground">
          {event.routingKey}
        </span>
            </TableCell>

            <TableCell className="max-w-24">
                <Badge variant={event.retryCount > 3 ? "destructive" : "secondary"}>
                    {event.retryCount}
                </Badge>
            </TableCell>

            <TableCell className="max-w-32">
                <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
            </TableCell>

            <TableCell className="hidden max-w-45 lg:table-cell">
        <span className="block truncate text-sm text-muted-foreground">
          {formatDateTime(event.createdAt)}
        </span>
            </TableCell>

            <TableCell className="hidden max-w-45 xl:table-cell">
        <span className="block truncate text-sm text-muted-foreground">
          {event.updatedAt ? formatDateTime(event.updatedAt) : "-"}
        </span>
            </TableCell>

            <TableCell className="w-18 text-right">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRetry}
                    disabled={isRetrying || !isFailed}
                    aria-label={`Retry event ${event.id}`}
                >
                    <RotateCcw className="h-4 w-4" />
                </Button>
            </TableCell>
        </TableRow>
    );
}