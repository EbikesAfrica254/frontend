"use client";

import { useState } from "react";
import { ArrowRightCircle, MapPin } from "lucide-react";
import type { DraftDetailResponse } from "@repo/features-orders/client";
import {
  ContactStatusBadge,
  DraftStatus,
  DraftStatusBadge,
} from "@repo/features-orders/client";
import { Button } from "@repo/ui/primitives/button";
import { ConvertToOrderDialog } from "../../_components/dialogs/convert-to-order-dialog";
import { UpdateDeliveryLocationSheet } from "../../_components/sheets/update-delivery-location-sheet";

interface DraftPageHeaderProps {
  draft: DraftDetailResponse;
}

export function DraftPageHeader({ draft }: DraftPageHeaderProps) {
  const [convertOpen, setConvertOpen] = useState(false);
  const [updateLocationOpen, setUpdateLocationOpen] = useState(false);

  const isExpired = new Date(draft.expiresAt) < new Date();
  const canConvert = draft.status === DraftStatus.CONFIRMED && !isExpired;
  const canUpdateLocation = draft.status === DraftStatus.CREATED && !isExpired;

  return (
    <div className="flex items-start justify-between">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">{draft.customerPhone}</h1>
        <p className="text-sm text-muted-foreground">
          {draft.items.length} {draft.items.length === 1 ? "parcel" : "parcels"}
        </p>
        <div className="flex items-center gap-2">
          <DraftStatusBadge status={draft.status} />
          <ContactStatusBadge status={draft.contactStatus} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {canUpdateLocation && (
          <Button variant="outline" onClick={() => setUpdateLocationOpen(true)}>
            <MapPin className="mr-2 h-4 w-4" />
            Update Delivery Location
          </Button>
        )}
        {canConvert && (
          <Button onClick={() => setConvertOpen(true)}>
            <ArrowRightCircle className="mr-2 h-4 w-4" />
            Convert to Order
          </Button>
        )}
      </div>

      <ConvertToOrderDialog
        draftId={draft.id}
        onOpenChange={setConvertOpen}
        open={convertOpen}
      />
      <UpdateDeliveryLocationSheet
        draft={draft}
        onOpenChange={setUpdateLocationOpen}
        open={updateLocationOpen}
      />
    </div>
  );
}
