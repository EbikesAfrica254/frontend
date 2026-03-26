import type { DraftDetailResponse } from "@repo/features-orders/client";
import {
  ContactStatusBadge,
  DraftStatusBadge,
} from "@repo/features-orders/client";
import { formatDateTime } from "@repo/shared/client";

interface DraftOverviewTabProps {
  draft: DraftDetailResponse;
}

export function DraftOverviewTab({ draft }: DraftOverviewTabProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="space-y-4 rounded-lg border p-4">
        <h2 className="font-medium">Customer Details</h2>
        <dl className="space-y-3">
          <div className="flex justify-between text-sm">
            <dt className="text-muted-foreground">Phone</dt>
            <dd className="font-medium">{draft.customerPhone}</dd>
          </div>
          <div className="flex justify-between text-sm">
            <dt className="text-muted-foreground">Customer ID</dt>
            <dd className="font-medium">{draft.customerId ?? "Unresolved"}</dd>
          </div>
          <div className="flex justify-between text-sm">
            <dt className="text-muted-foreground">Currency</dt>
            <dd className="font-medium">{draft.currency}</dd>
          </div>
          <div className="flex justify-between text-sm">
            <dt className="text-muted-foreground">Document ID</dt>
            <dd className="font-medium">{draft.documentId ?? "—"}</dd>
          </div>
        </dl>
      </div>

      <div className="space-y-4 rounded-lg border p-4">
        <h2 className="font-medium">Status & Timing</h2>
        <dl className="space-y-3">
          <div className="flex justify-between text-sm">
            <dt className="text-muted-foreground">Status</dt>
            <dd className="font-medium">
              <DraftStatusBadge status={draft.status} />
            </dd>
          </div>
          <div className="flex justify-between text-sm">
            <dt className="text-muted-foreground">Contact Status</dt>
            <dd className="font-medium">
              <ContactStatusBadge status={draft.contactStatus} />
            </dd>
          </div>
          <div className="flex justify-between text-sm">
            <dt className="text-muted-foreground">Created At</dt>
            <dd className="font-medium">{formatDateTime(draft.createdAt)}</dd>
          </div>
          <div className="flex justify-between text-sm">
            <dt className="text-muted-foreground">Expires At</dt>
            <dd className="font-medium">{formatDateTime(draft.expiresAt)}</dd>
          </div>
          <div className="flex justify-between text-sm">
            <dt className="text-muted-foreground">Version</dt>
            <dd className="font-medium">{draft.version}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
