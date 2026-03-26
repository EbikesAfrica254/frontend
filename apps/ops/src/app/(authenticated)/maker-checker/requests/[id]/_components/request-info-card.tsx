import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/primitives/card";
import { formatDateTime } from "@repo/shared/client";
import type { RequestSummaryResponse } from "@repo/features-maker-checker/client";

interface RequestInfoCardProps {
  request: RequestSummaryResponse;
}

export function RequestInfoCard({ request }: RequestInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Request Information</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-medium text-muted-foreground">Request ID</dt>
            <dd className="font-mono text-xs">{request.id}</dd>
          </div>
          <div>
            <dt className="font-medium text-muted-foreground">Submitted By</dt>
            <dd className="font-mono text-xs">{request.makerId}</dd>
          </div>
          <div>
            <dt className="font-medium text-muted-foreground">Entity ID</dt>
            <dd className="font-mono text-xs">{request.entityId}</dd>
          </div>
          <div>
            <dt className="font-medium text-muted-foreground">
              Organization ID
            </dt>
            <dd className="font-mono text-xs">{request.organizationId}</dd>
          </div>
          {request.serviceReference && (
            <div>
              <dt className="font-medium text-muted-foreground">
                Service Reference
              </dt>
              <dd className="font-mono text-xs">{request.serviceReference}</dd>
            </div>
          )}
          {request.decidedAt && (
            <div>
              <dt className="font-medium text-muted-foreground">Decided At</dt>
              <dd>{formatDateTime(request.decidedAt)}</dd>
            </div>
          )}
          <div>
            <dt className="font-medium text-muted-foreground">Last Updated</dt>
            <dd>
              {request.updatedAt ? formatDateTime(request.updatedAt) : "—"}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
