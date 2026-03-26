import type { DraftDetailResponse } from "@repo/features-orders/client";

interface DraftLocationTabProps {
  draft: DraftDetailResponse;
}

export function DraftLocationTab({ draft }: DraftLocationTabProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="space-y-4 rounded-lg border p-4">
        <h2 className="font-medium">Pickup Location</h2>
        <dl className="space-y-3">
          <div className="flex justify-between text-sm">
            <dt className="text-muted-foreground">Address</dt>
            <dd className="font-medium">{draft.pickupAddress}</dd>
          </div>
          <div className="flex justify-between text-sm">
            <dt className="text-muted-foreground">Latitude</dt>
            <dd className="font-medium">{draft.pickupLatitude}</dd>
          </div>
          <div className="flex justify-between text-sm">
            <dt className="text-muted-foreground">Longitude</dt>
            <dd className="font-medium">{draft.pickupLongitude}</dd>
          </div>
        </dl>
      </div>

      <div className="space-y-4 rounded-lg border p-4">
        <h2 className="font-medium">Delivery Location</h2>
        {draft.deliveryAddress ? (
          <dl className="space-y-3">
            <div className="flex justify-between text-sm">
              <dt className="text-muted-foreground">Address</dt>
              <dd className="font-medium">{draft.deliveryAddress}</dd>
            </div>
            <div className="flex justify-between text-sm">
              <dt className="text-muted-foreground">Latitude</dt>
              <dd className="font-medium">{draft.deliveryLatitude}</dd>
            </div>
            <div className="flex justify-between text-sm">
              <dt className="text-muted-foreground">Longitude</dt>
              <dd className="font-medium">{draft.deliveryLongitude}</dd>
            </div>
          </dl>
        ) : (
          <p className="text-sm text-muted-foreground">
            No delivery location set. Update the delivery location to confirm
            this draft.
          </p>
        )}
      </div>
    </div>
  );
}
