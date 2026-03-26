"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@repo/ui/primitives/button";
import { ConfirmationDialog } from "@repo/ui/dialogs/confirmation-dialog";
import { OrderStatus } from "@repo/features-orders/client";
import { initiateReassignment } from "@repo/features-orders/actions";

interface OrderDetailActionsProps {
  orderId: string;
  orderStatus: OrderStatus;
  reassignmentCount: number;
}

export function OrderDetailActions({
  orderId,
  orderStatus,
  reassignmentCount,
}: OrderDetailActionsProps) {
  const router = useRouter();
  const [reassignDialogOpen, setReassignDialogOpen] = useState(false);
  const [isReassigning, setIsReassigning] = useState(false);

  const canReassign =
    (orderStatus === OrderStatus.IN_TRANSIT ||
      orderStatus === OrderStatus.DELIVERED) &&
    reassignmentCount < 3;

  const handleReassignConfirm = async () => {
    setIsReassigning(true);
    const result = await initiateReassignment(orderId, {
      reason: "Manual reassignment initiated by operator",
    });

    if (result && !result.success) {
      toast.error(result.error || "Failed to initiate reassignment");
      setIsReassigning(false);
    } else {
      toast.success("Reassignment initiated successfully");
      setReassignDialogOpen(false);
      setIsReassigning(false);
      router.refresh();
    }
  };

  if (!canReassign) {
    return null;
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={() => setReassignDialogOpen(true)}
          disabled={isReassigning}
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reassign Order
        </Button>
      </div>

      <ConfirmationDialog
        open={reassignDialogOpen}
        onOpenChange={(open) => {
          if (!isReassigning && !open) {
            setReassignDialogOpen(false);
          }
        }}
        onConfirm={handleReassignConfirm}
        title="Reassign Order"
        description={
          <>
            Are you sure you want to reassign this order? This will initiate a
            new agent assignment. Attempt{" "}
            <strong>{reassignmentCount + 1} of 3</strong>.
          </>
        }
        confirmText="Reassign Order"
        isPending={isReassigning}
        variant="default"
      />
    </>
  );
}
