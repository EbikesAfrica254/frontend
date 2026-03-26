import { getPaymentMethodsResource } from "@repo/features-workforce/server";
import { PaymentMethodTypeBadge } from "@repo/features-workforce/client";
import { Badge } from "@repo/ui/primitives/badge";
import { Card, CardContent } from "@repo/ui/primitives/card";

interface AgentPaymentMethodsTabProps {
  agentId: string;
}

export async function AgentPaymentMethodsTab({
  agentId,
}: AgentPaymentMethodsTabProps) {
  const response = await getPaymentMethodsResource(agentId).catch(() => null);
  const paymentMethods = response?.data ?? [];

  if (paymentMethods.length === 0) {
    return (
      <div className="rounded-md border border-dashed p-8 text-center">
        <p className="text-sm text-muted-foreground">
          No payment methods on record for this agent.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {paymentMethods.map((method) => (
        <Card key={method.id}>
          <CardContent className="pt-4">
            <dl className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <dt className="font-medium text-muted-foreground">Type</dt>
                <dd>
                  <PaymentMethodTypeBadge type={method.paymentMethodType} />
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="font-medium text-muted-foreground">
                  Account Name
                </dt>
                <dd>{method.accountName}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="font-medium text-muted-foreground">
                  Identifier
                </dt>
                <dd className="font-mono text-xs">{method.maskedIdentifier}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="font-medium text-muted-foreground">Primary</dt>
                <dd>
                  {method.isPrimary ? (
                    <Badge variant="default">Primary</Badge>
                  ) : (
                    <Badge variant="outline">Secondary</Badge>
                  )}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
