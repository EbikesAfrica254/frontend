"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, X } from "lucide-react";
import type { RequestSummaryResponse } from "@repo/features-maker-checker/client";
import {
  RequestStatus,
  RequestStatusBadge,
  useApprovalActions,
} from "@repo/features-maker-checker/client";
import { TableCell, TableRow } from "@repo/ui/primitives/table";
import { Button } from "@repo/ui/primitives/button";
import { ConfirmationDialog } from "@repo/ui/dialogs/confirmation-dialog";
import { formatDateTime } from "@repo/shared/client";

interface RequestsTableRowProps {
  isMaker: boolean;
  request: RequestSummaryResponse;
}

export function RequestsTableRow({ isMaker, request }: RequestsTableRowProps) {
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const { cancelRequest, isCancelling } = useApprovalActions();

  const canCancel = isMaker && request.status === RequestStatus.PENDING;

  const handleCancel = async () => {
    const result = await cancelRequest(request.id);
    if (result.success) {
      setCancelDialogOpen(false);
    }
  };

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">{request.entityType}</TableCell>
        <TableCell className="font-mono text-xs">
          {request.organizationId}
        </TableCell>
        <TableCell className="font-mono text-xs">{request.makerId}</TableCell>
        <TableCell>
          <RequestStatusBadge status={request.status} />
        </TableCell>
        <TableCell>{formatDateTime(request.createdAt)}</TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/maker-checker/requests/${request.id}`}>
                <Eye className="h-4 w-4" />
              </Link>
            </Button>
            {canCancel && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCancelDialogOpen(true)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </TableCell>
      </TableRow>

      <ConfirmationDialog
        open={cancelDialogOpen}
        onOpenChange={setCancelDialogOpen}
        onConfirm={handleCancel}
        title="Cancel Request"
        description="Are you sure you want to cancel this request? This action cannot be undone."
        isPending={isCancelling}
        confirmText="Cancel Request"
        cancelText="Go Back"
        variant="destructive"
      />
    </>
  );
}
