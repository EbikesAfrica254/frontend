"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { cancelOrder } from "@repo/features-orders/actions";
import type { CancelOrderFormData } from "@repo/features-orders/client";
import { CancelOrderForm } from "@repo/features-orders/client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@repo/ui/primitives/sheet";
import { Button } from "@repo/ui/primitives/button";
import { Loader2 } from "lucide-react";

interface CancelOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId: string;
}

export function CancelOrderDialog({
  open,
  onOpenChange,
  orderId,
}: CancelOrderDialogProps) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (data: CancelOrderFormData) => {
    startTransition(async () => {
      const result = await cancelOrder(orderId, { reason: data.reason });

      if (result.success) {
        toast.success("Order cancelled successfully");
        onOpenChange(false);
      } else {
        toast.error(result.error || "Failed to cancel order");
      }
    });
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!isPending) {
      onOpenChange(newOpen);
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent className="sm:max-w-150 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Cancel Order</SheetTitle>
          <SheetDescription>
            Provide a reason for cancelling this order. This action cannot be
            undone.
          </SheetDescription>
        </SheetHeader>

        <CancelOrderForm onSubmit={handleSubmit} />

        <SheetFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isPending}
          >
            Back
          </Button>
          <Button
            type="submit"
            form="cancel-order-form"
            variant="destructive"
            disabled={isPending}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Cancelling..." : "Cancel Order"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
