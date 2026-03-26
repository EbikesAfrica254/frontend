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
import { recordOrderTip } from "@repo/features-orders/actions";
import type { RecordTipFormData } from "@repo/features-orders/client";
import { RecordTipForm } from "@repo/features-orders/client";

interface RecordTipDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId: string;
}

export function RecordTipDialog({
  open,
  onOpenChange,
  orderId,
}: RecordTipDialogProps) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (data: RecordTipFormData) => {
    startTransition(async () => {
      const result = await recordOrderTip(orderId, {
        amount: data.amount,
        currency: data.currency,
        percentage: data.percentage,
      });

      if (result.success) {
        toast.success("Tip recorded successfully");
        onOpenChange(false);
      } else {
        toast.error(result.error || "Failed to record tip");
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
          <SheetTitle>Record Tip</SheetTitle>
          <SheetDescription>
            Record a tip for this order. Only allowed for orders in DELIVERED or
            COMPLETED status.
          </SheetDescription>
        </SheetHeader>

        <RecordTipForm onSubmit={handleSubmit} />

        <SheetFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" form="record-tip-form" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Recording..." : "Record Tip"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
