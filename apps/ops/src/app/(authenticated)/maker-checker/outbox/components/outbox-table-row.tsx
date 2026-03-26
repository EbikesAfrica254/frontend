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
} from "@repo/features-iam/client";
import { OutboxStatus } from "@repo/features-iam/client";
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

  return (
    <TableRow>
      <TableCell className="font-medium">{event.eventType}</TableCell>
      <TableCell className="font-mono text-xs">{event.routingKey}</TableCell>
      <TableCell>
        <Badge variant={event.retryCount > 3 ? "destructive" : "secondary"}>
          {event.retryCount}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge
          variant={getOutboxStatusBadge(event.status as OutboxStatus).variant}
        >
          {getOutboxStatusBadge(event.status as OutboxStatus).label}
        </Badge>
      </TableCell>
      <TableCell>{formatDateTime(event.createdAt)}</TableCell>
      <TableCell>
        {event.updatedAt ? formatDateTime(event.updatedAt) : "-"}
      </TableCell>
      <TableCell>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRetry}
          disabled={isRetrying || !isFailed}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
