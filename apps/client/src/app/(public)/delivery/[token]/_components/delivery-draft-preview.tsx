import type { DraftDetailResponse } from "@repo/features-orders/client";

interface DeliveryDraftPreviewProps {
  draft: DraftDetailResponse;
}

export function DeliveryDraftPreview({ draft }: DeliveryDraftPreviewProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold">Confirm Your Delivery</h1>
        <p className="text-sm text-muted-foreground">
          Please review your parcels below, then pin your delivery location on
          the map.
        </p>
      </div>

      <div className="rounded-md border divide-y">
        <div className="px-4 py-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {draft.items.length === 1
              ? "1 Parcel"
              : `${draft.items.length} Parcels`}
          </p>
        </div>
        {draft.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between px-4 py-3 gap-4"
          >
            <p className="text-sm">{item.description ?? "Parcel"}</p>
            {item.weight !== null && (
              <p className="text-sm text-muted-foreground shrink-0">
                {item.weight} kg
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
