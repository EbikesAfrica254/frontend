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
import { updateDraftDeliveryLocation } from "@repo/features-orders/actions";
import type {
  DraftDetailResponse,
  UpdateDeliveryLocationFormData,
} from "@repo/features-orders/client";
import {
  DraftItemCard,
  UpdateDeliveryLocationForm,
} from "@repo/features-orders/client";

interface UpdateDeliveryLocationSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  draft: DraftDetailResponse;
}

export function UpdateDeliveryLocationSheet({
  open,
  onOpenChange,
  draft,
}: UpdateDeliveryLocationSheetProps) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (data: UpdateDeliveryLocationFormData) => {
    startTransition(async () => {
      const result = await updateDraftDeliveryLocation(draft.id, {
        deliveryAddress: data.deliveryAddress,
        deliveryLatitude: data.deliveryLatitude,
        deliveryLongitude: data.deliveryLongitude,
      });

      if (result.success) {
        toast.success("Delivery location updated successfully");
        onOpenChange(false);
      } else {
        toast.error(result.error || "Failed to update delivery location");
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
          <SheetTitle>Update Delivery Location</SheetTitle>
          <SheetDescription>
            Update the delivery location for this draft. Only allowed for drafts
            in CREATED status.
          </SheetDescription>
        </SheetHeader>

        {draft.items.length > 0 && (
          <div className="space-y-2">
            {draft.items.map((item) => (
              <DraftItemCard key={item.id} item={item} />
            ))}
          </div>
        )}

        <UpdateDeliveryLocationForm draft={draft} onSubmit={handleSubmit} />

        <SheetFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="update-delivery-location-form"
            disabled={isPending}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Saving..." : "Save Location"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
