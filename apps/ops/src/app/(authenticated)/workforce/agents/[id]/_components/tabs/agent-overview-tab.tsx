"use client";

import type { AgentDetailResponse } from "@repo/features-workforce/client";
import { formatDateTime } from "@repo/shared/client";
import { Card, CardContent, CardHeader } from "@repo/ui/primitives/card";
import { AgentDetailActions } from "../agent-detail-actions";

interface AgentOverviewTabProps {
  agent: AgentDetailResponse;
}

export function AgentOverviewTab({ agent }: AgentOverviewTabProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Agent Details</h2>
          <AgentDetailActions agent={agent} />
        </div>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <dt className="font-medium text-muted-foreground mb-1">
              First Name
            </dt>
            <dd>{agent.firstName}</dd>
          </div>

          <div>
            <dt className="font-medium text-muted-foreground mb-1">
              Last Name
            </dt>
            <dd>{agent.lastName}</dd>
          </div>

          <div>
            <dt className="font-medium text-muted-foreground mb-1">Phone</dt>
            <dd>{agent.phoneNumber}</dd>
          </div>

          <div>
            <dt className="font-medium text-muted-foreground mb-1">
              Alternate Phone
            </dt>
            <dd>{agent.alternatePhoneNumber ?? "—"}</dd>
          </div>

          <div>
            <dt className="font-medium text-muted-foreground mb-1">Email</dt>
            <dd>{agent.email ?? "—"}</dd>
          </div>

          <div>
            <dt className="font-medium text-muted-foreground mb-1">
              National ID Type
            </dt>
            <dd>{agent.nationalIdType}</dd>
          </div>

          <div>
            <dt className="font-medium text-muted-foreground mb-1">
              National ID Number
            </dt>
            <dd className="font-mono text-xs">{agent.nationalIdNumber}</dd>
          </div>

          <div>
            <dt className="font-medium text-muted-foreground mb-1">
              Max Concurrent Orders
            </dt>
            <dd>{agent.maxConcurrentOrders}</dd>
          </div>

          <div>
            <dt className="font-medium text-muted-foreground mb-1">
              Reliability Score
            </dt>
            <dd>{agent.reliabilityScore ?? "—"}</dd>
          </div>

          <div>
            <dt className="font-medium text-muted-foreground mb-1">Created</dt>
            <dd>{formatDateTime(agent.createdAt)}</dd>
          </div>

          <div>
            <dt className="font-medium text-muted-foreground mb-1">
              Last Updated
            </dt>
            <dd>{formatDateTime(agent.updatedAt)}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
