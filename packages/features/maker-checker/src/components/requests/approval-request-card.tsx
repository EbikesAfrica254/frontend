"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/primitives/card";
import { Separator } from "@repo/ui/primitives/separator";
import { formatDateTime } from "@repo/shared/client";
import React from "react";

import { ApprovalActionButtons } from "./approval-action-buttons";
import { ApprovalChangesTable } from "./approval-changes-table";
import { DecisionBadge } from "./decision-badge";
import { RequestStatusBadge } from "./request-status-badge";
import type { RequestDetailResponse } from "../../types/requests";
import { isRequestFinalState } from "../../utilities/maker-checker-helpers";

interface ApprovalRequestCardProps {
  onActionComplete?: () => void;
  request: RequestDetailResponse;
  showActions?: boolean;
}

export function ApprovalRequestCard({
  onActionComplete,
  request,
  showActions = true,
}: ApprovalRequestCardProps) {
  const isFinal = isRequestFinalState(request.request.status);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              Request #{request.request.id}
              <RequestStatusBadge status={request.request.status} />
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Created {formatDateTime(request.request.createdAt)}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Request Information</h3>
            <dl className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-medium text-muted-foreground">
                  Requested By
                </dt>
                <dd className="font-mono text-xs">{request.request.makerId}</dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">
                  Entity Type
                </dt>
                <dd>{request.request.entityType}</dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">Entity ID</dt>
                <dd className="font-mono text-xs">
                  {request.request.entityId}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">
                  Organization ID
                </dt>
                <dd className="font-mono text-xs">
                  {request.request.organizationId}
                </dd>
              </div>
            </dl>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium mb-3">Field Changes</h3>
            <ApprovalChangesTable fieldChanges={request.fieldChanges} />
          </div>

          {isFinal && request.decision && (
            <>
              <Separator />
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-sm font-medium">Decision Information</h3>
                  <DecisionBadge decision={request.decision.outcome} />
                </div>
                <dl className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="font-medium text-muted-foreground">
                      Decided By
                    </dt>
                    <dd className="font-mono text-xs">
                      {request.decision.checkerId}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-muted-foreground">
                      Decision Date
                    </dt>
                    <dd>{formatDateTime(request.decision.createdAt)}</dd>
                  </div>
                  {request.decision.reason && (
                    <div className="sm:col-span-2">
                      <dt className="font-medium text-muted-foreground">
                        Reason
                      </dt>
                      <dd className="mt-1 text-muted-foreground">
                        {request.decision.reason}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </>
          )}
        </div>

        {showActions && (
          <>
            <Separator />
            <ApprovalActionButtons
              onActionComplete={onActionComplete}
              requestId={request.request.id}
              status={request.request.status}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}
