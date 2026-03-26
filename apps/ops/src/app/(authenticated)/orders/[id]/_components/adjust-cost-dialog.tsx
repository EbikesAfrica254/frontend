"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@repo/ui/primitives/sheet";
import { Button } from "@repo/ui/primitives/button";
import { adjustOrderCost } from "@repo/features-orders/actions";
import type { AdjustCostFormData } from "@repo/features-orders/client";
import { AdjustCostForm } from "@repo/features-orders/client";

interface AdjustCostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId: string;
}

export function AdjustCostDialog({
  open,
  onOpenChange,
  orderId,
}: AdjustCostDialogProps) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (data: AdjustCostFormData) => {
    startTransition(async () => {
      const result = await adjustOrderCost(orderId, {
        adjustedAmount: data.adjustedAmount,
        reason: data.reason,
      });

      if (result.success) {
        toast.success("Cost adjusted successfully");
        onOpenChange(false);
      } else {
        toast.error(result.error || "Failed to adjust cost");
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
          <SheetTitle>Adjust Order Cost</SheetTitle>
          <SheetDescription>
            Adjust the cost for this order. Only allowed for orders in
            READY_FOR_BROADCAST status.
          </SheetDescription>
        </SheetHeader>

        <AdjustCostForm onSubmit={handleSubmit} />

        <SheetFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" form="adjust-cost-form" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Saving..." : "Adjust Cost"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
