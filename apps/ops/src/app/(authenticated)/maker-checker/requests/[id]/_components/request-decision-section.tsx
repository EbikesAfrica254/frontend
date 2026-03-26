import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/primitives/card";
import { Separator } from "@repo/ui/primitives/separator";
import { formatDateTime } from "@repo/shared/client";
import {
  DecisionBadge,
  DecisionResponse,
} from "@repo/features-maker-checker/client";

interface RequestDecisionSectionProps {
  decision: DecisionResponse;
}

export function RequestDecisionSection({
  decision,
}: RequestDecisionSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Decision</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-medium text-muted-foreground">Outcome</dt>
            <dd>
              <DecisionBadge decision={decision.outcome} />
            </dd>
          </div>
          <div>
            <dt className="font-medium text-muted-foreground">Decided By</dt>
            <dd className="font-mono text-xs">{decision.checkerId}</dd>
          </div>
          <div>
            <dt className="font-medium text-muted-foreground">Decided At</dt>
            <dd>{formatDateTime(decision.createdAt)}</dd>
          </div>
        </dl>

        {decision.reason && (
          <>
            <Separator />
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Reason
              </p>
              <p className="text-sm">{decision.reason}</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
