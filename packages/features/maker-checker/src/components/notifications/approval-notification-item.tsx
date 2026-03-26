"use client";

import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import { Badge } from "@repo/ui/primitives/badge";
import { Button } from "@repo/ui/primitives/button";

import { useApprovalActions } from "../../hooks/use-approval-actions";
import {
  canApproveRequest,
  canRejectRequest,
  getRequestStatusColor,
} from "../../utilities/status-helpers";
import React from "react";
import { RequestStatus } from "../../types/enums";
import { ApprovalNotificationData } from "../../types/notifications";

interface ApprovalNotificationItemProps {
  notification: ApprovalNotificationData;
}

export function ApprovalNotificationItem({
  notification,
}: ApprovalNotificationItemProps) {
  const router = useRouter();
  const { approveRequest, isApproving, isRejecting, rejectRequest } =
    useApprovalActions();

  const handleApprove = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const result = await approveRequest(notification.requestId);
    if (result.success) {
      router.refresh();
    }
  };

  const handleReject = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const result = await rejectRequest(
      notification.requestId,
      "Quick rejection from notification",
    );
    if (result.success) {
      router.refresh();
    }
  };

  const handleReview = () => {
    router.push(`/approvals/${notification.requestId}`);
  };

  const status = notification.requestStatus as RequestStatus;
  const canApprove = canApproveRequest(status);
  const canReject = canRejectRequest(status);
  const statusColor = getRequestStatusColor(status);

  const StatusIcon =
    {
      PENDING: Clock,
      APPROVED: CheckCircle2,
      REJECTED: XCircle,
      CANCELLED: XCircle,
    }[notification.requestStatus] || Clock;

  return (
    <div className="flex flex-col gap-2 p-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <StatusIcon className="h-4 w-4 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {notification.requesterName}
            </p>
            <p className="text-xs text-muted-foreground">
              {notification.requesterOrganization}
            </p>
          </div>
        </div>
        <Badge variant={statusColor as any}>{notification.requestStatus}</Badge>
      </div>

      <div className="text-sm text-muted-foreground">
        Updated {notification.changedFieldCount}{" "}
        {notification.changedFieldCount === 1 ? "field" : "fields"} on{" "}
        {notification.entityType}
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleReview}
          className="flex-1"
        >
          Review
        </Button>
        {canApprove && (
          <Button
            variant="default"
            size="sm"
            onClick={handleApprove}
            disabled={isApproving}
            className="flex-1"
          >
            {isApproving ? "Approving..." : "Approve"}
          </Button>
        )}
        {canReject && (
          <Button
            variant="destructive"
            size="sm"
            onClick={handleReject}
            disabled={isRejecting}
            className="flex-1"
          >
            {isRejecting ? "Rejecting..." : "Reject"}
          </Button>
        )}
      </div>
    </div>
  );
}
