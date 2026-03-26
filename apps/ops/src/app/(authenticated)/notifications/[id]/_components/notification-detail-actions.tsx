"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@repo/ui/primitives/button";
import { ConfirmationDialog } from "@repo/ui/dialogs/confirmation-dialog";
import { cancelNotification } from "@repo/features-notifications/actions";
import { NotificationStatus } from "@repo/features-notifications/client";

interface NotificationDetailActionsProps {
  notificationId: string;
  status: NotificationStatus;
}

export function NotificationDetailActions({
  notificationId,
  status,
}: NotificationDetailActionsProps) {
  const router = useRouter();
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const canCancel =
    status === NotificationStatus.PENDING ||
    status === NotificationStatus.PROCESSING;

  if (!canCancel) {
    return null;
  }

  const handleCancelConfirm = async () => {
    setIsCancelling(true);
    const result = await cancelNotification(notificationId);

    if (result && !result.success) {
      toast.error(result.error ?? "Failed to cancel notification");
      setIsCancelling(false);
    } else {
      toast.success("Notification cancelled");
      router.refresh();
      setCancelDialogOpen(false);
      setIsCancelling(false);
    }
  };

  return (
    <>
      <Button
        disabled={isCancelling}
        onClick={() => setCancelDialogOpen(true)}
        variant="destructive"
      >
        Cancel Notification
      </Button>

      <ConfirmationDialog
        confirmText="Cancel Notification"
        description="This will cancel the notification. It will not be delivered."
        isPending={isCancelling}
        onConfirm={handleCancelConfirm}
        onOpenChange={(open) => {
          if (!isCancelling && !open) {
            setCancelDialogOpen(false);
          }
        }}
        open={cancelDialogOpen}
        title="Cancel Notification"
        variant="destructive"
      />
    </>
  );
}
