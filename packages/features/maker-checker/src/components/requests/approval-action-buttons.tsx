"use client";

import React, { useState } from "react";
import { Button } from "@repo/ui/primitives/button";
import { Label } from "@repo/ui/primitives/label";
import { Textarea } from "@repo/ui/primitives/textarea";
import { ConfirmationDialog } from "@repo/ui/dialogs/confirmation-dialog";

import { useApprovalActions } from "../../hooks/use-approval-actions";
import { isRequestPending } from "../../utilities/maker-checker-helpers";
import type { RequestStatus } from "../../types/enums";

interface ApprovalActionButtonsProps {
  isMaker?: boolean;
  onActionComplete?: () => void;
  requestId: string;
  status: RequestStatus;
}

export function ApprovalActionButtons({
  isMaker = false,
  onActionComplete,
  requestId,
  status,
}: ApprovalActionButtonsProps) {
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const {
    approveRequest,
    cancelRequest,
    isApproving,
    isCancelling,
    isRejecting,
    rejectRequest,
  } = useApprovalActions();

  const pending = isRequestPending(status);
  const canApprove = pending && !isMaker;
  const canCancel = pending;
  const canReject = pending && !isMaker;

  const handleApprove = async () => {
    const result = await approveRequest(requestId);
    if (result.success) {
      setIsApproveDialogOpen(false);
      onActionComplete?.();
    }
  };

  const handleCancel = async () => {
    const result = await cancelRequest(requestId);
    if (result.success) {
      setIsCancelDialogOpen(false);
      onActionComplete?.();
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) return;
    const result = await rejectRequest(requestId, rejectReason);
    if (result.success) {
      setIsRejectDialogOpen(false);
      setRejectReason("");
      onActionComplete?.();
    }
  };

  if (!canApprove && !canReject && !canCancel) {
    return (
      <div className="text-sm text-muted-foreground">
        No actions available for this request
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {canApprove && (
          <Button
            disabled={isApproving}
            onClick={() => setIsApproveDialogOpen(true)}
            variant="default"
          >
            {isApproving ? "Approving..." : "Approve"}
          </Button>
        )}

        {canReject && (
          <Button
            disabled={isRejecting}
            onClick={() => setIsRejectDialogOpen(true)}
            variant="destructive"
          >
            {isRejecting ? "Rejecting..." : "Reject"}
          </Button>
        )}

        {canCancel && (
          <Button
            disabled={isCancelling}
            onClick={() => setIsCancelDialogOpen(true)}
            variant="outline"
          >
            {isCancelling ? "Cancelling..." : "Cancel Request"}
          </Button>
        )}
      </div>

      <ConfirmationDialog
        confirmText="Approve"
        description="Are you sure you want to approve this request? This action cannot be undone."
        isPending={isApproving}
        onConfirm={handleApprove}
        onOpenChange={setIsApproveDialogOpen}
        open={isApproveDialogOpen}
        title="Approve Request"
        variant="default"
      />

      <ConfirmationDialog
        confirmText="Reject"
        description="Please provide a reason for rejecting this request."
        isPending={isRejecting}
        onConfirm={handleReject}
        onOpenChange={(open) => {
          setIsRejectDialogOpen(open);
          if (!open) setRejectReason("");
        }}
        open={isRejectDialogOpen}
        title="Reject Request"
      >
        <Label htmlFor="reject-reason">Rejection Reason</Label>
        <Textarea
          className="mt-2"
          id="reject-reason"
          onChange={(e) => setRejectReason(e.target.value)}
          placeholder="Enter reason for rejection..."
          rows={4}
          value={rejectReason}
        />
      </ConfirmationDialog>

      <ConfirmationDialog
        confirmText="Cancel Request"
        description="Are you sure you want to cancel this request? This action cannot be undone."
        isPending={isCancelling}
        onConfirm={handleCancel}
        onOpenChange={setIsCancelDialogOpen}
        open={isCancelDialogOpen}
        title="Cancel Request"
      />
    </>
  );
}
