"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ActionResult } from "@repo/shared/client";

import {
  approveRequestAction,
  cancelRequestAction,
  rejectRequestAction,
} from "../actions/requests";

export function useApprovalActions() {
  const router = useRouter();
  const [isApproving, setIsApproving] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  const approveRequest = async (
    requestId: string,
    reason?: string,
  ): Promise<ActionResult<void>> => {
    setIsApproving(true);
    try {
      const result = await approveRequestAction(requestId, { reason });

      if (result.success) {
        toast.success("Request approved successfully");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to approve requests");
      }

      return result;
    } finally {
      setIsApproving(false);
    }
  };

  const cancelRequest = async (
    requestId: string,
  ): Promise<ActionResult<void>> => {
    setIsCancelling(true);
    try {
      const result = await cancelRequestAction(requestId);

      if (result.success) {
        toast.success("Request cancelled successfully");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to cancel requests");
      }

      return result;
    } finally {
      setIsCancelling(false);
    }
  };

  const rejectRequest = async (
    requestId: string,
    reason: string,
  ): Promise<ActionResult<void>> => {
    setIsRejecting(true);
    try {
      const result = await rejectRequestAction(requestId, { reason });

      if (result.success) {
        toast.success("Request rejected successfully");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to reject requests");
      }

      return result;
    } finally {
      setIsRejecting(false);
    }
  };

  return {
    approveRequest,
    cancelRequest,
    isApproving,
    isCancelling,
    isRejecting,
    rejectRequest,
  };
}
