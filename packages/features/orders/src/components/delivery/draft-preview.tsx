"use client";

import React from "react";
import { DraftDetailResponse, DraftItemResponse } from "../../types/drafts";

interface DraftPreviewProps {
  draft: DraftDetailResponse;
}

function DraftItemRow({ item }: { item: DraftItemResponse }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b last:border-0">
      <div className="space-y-0.5 min-w-0">
        <p className="text-sm font-medium truncate">
          {item.description ?? "No description"}
        </p>
        {item.externalReference && (
          <p className="text-xs text-muted-foreground">
            Ref: {item.externalReference}
          </p>
        )}
        <p className="text-xs text-muted-foreground">Row {item.rowNumber}</p>
      </div>
      {item.weight !== null && (
        <p className="text-sm text-muted-foreground shrink-0">
          {item.weight} kg
        </p>
      )}
    </div>
  );
}

export function DraftPreview({ draft }: DraftPreviewProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Your Delivery</h2>
        <p className="text-sm text-muted-foreground">
          Review your parcel details and confirm your delivery location below.
        </p>
      </div>

      <div className="rounded-md border p-4 space-y-1">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Pickup Location
        </p>
        <p className="text-sm">{draft.pickupAddress}</p>
      </div>

      <div className="rounded-md border divide-y">
        <div className="px-4 py-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Parcels ({draft.items.length})
          </p>
        </div>
        <div className="px-4">
          {draft.items.map((item) => (
            <DraftItemRow key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
