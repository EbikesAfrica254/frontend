"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ConfirmationDialog } from "@repo/ui/dialogs/confirmation-dialog";
import { convertDraftToOrder } from "@repo/features-orders/actions";

interface ConvertToOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  draftId: string;
}

export function ConvertToOrderDialog({
  open,
  onOpenChange,
  draftId,
}: ConvertToOrderDialogProps) {
  const router = useRouter();
  const [isConverting, startTransition] = useTransition();

  const handleConfirm = () => {
    startTransition(async () => {
      const result = await convertDraftToOrder(draftId);

      if (result && !result.success) {
        toast.error(result.error || "Failed to convert draft to order");
      } else {
        toast.success("Draft converted to order successfully");
        onOpenChange(false);
        router.push("/orders");
      }
    });
  };

  return (
    <ConfirmationDialog
      open={open}
      onOpenChange={(newOpen) => {
        if (!isConverting) {
          onOpenChange(newOpen);
        }
      }}
      onConfirm={handleConfirm}
      title="Convert Draft to Order"
      description="Are you sure you want to convert this draft to an active order? This action cannot be undone."
      confirmText="Convert to Order"
      isPending={isConverting}
      variant="default"
    />
  );
}
