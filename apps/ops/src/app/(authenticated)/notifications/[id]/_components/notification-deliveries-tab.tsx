import { getNotificationDeliveries } from "@repo/features-notifications/actions";
import { DeliveryStatusBadge } from "@repo/features-notifications/client";
import { Card, CardContent, CardHeader } from "@repo/ui/primitives/card";
import { formatDateTime } from "@repo/shared/client";

interface NotificationDeliveriesTabProps {
  notificationId: string;
}

export async function NotificationDeliveriesTab({
  notificationId,
}: NotificationDeliveriesTabProps) {
  const result = await getNotificationDeliveries(notificationId);
  const deliveries = result.success ? result.data : [];

  if (deliveries.length === 0) {
    return (
      <div className="rounded-md border border-dashed p-8 text-center">
        <p className="text-sm text-muted-foreground">
          No delivery attempts recorded for this notification.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {deliveries.map((delivery) => (
        <Card key={delivery.id}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                Attempt {delivery.attemptNumber}
              </span>
              <DeliveryStatusBadge status={delivery.status} />
            </div>
          </CardHeader>

          <CardContent>
            <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
              <div>
                <dt className="mb-1 font-medium text-muted-foreground">
                  Attempted At
                </dt>
                <dd>{formatDateTime(delivery.attemptedAt)}</dd>
              </div>

              <div>
                <dt className="mb-1 font-medium text-muted-foreground">
                  Completed At
                </dt>
                <dd>
                  {delivery.completedAt
                    ? formatDateTime(delivery.completedAt)
                    : "—"}
                </dd>
              </div>

              <div>
                <dt className="mb-1 font-medium text-muted-foreground">
                  Provider Message ID
                </dt>
                <dd className="font-mono text-xs">
                  {delivery.providerMessageId ?? "—"}
                </dd>
              </div>

              <div>
                <dt className="mb-1 font-medium text-muted-foreground">
                  Next Retry
                </dt>
                <dd>
                  {delivery.nextRetryAt
                    ? formatDateTime(delivery.nextRetryAt)
                    : "—"}
                </dd>
              </div>

              {delivery.costAmount !== undefined && (
                <div>
                  <dt className="mb-1 font-medium text-muted-foreground">
                    Cost
                  </dt>
                  <dd>
                    {delivery.costAmount} {delivery.costCurrency}
                  </dd>
                </div>
              )}

              {delivery.errorCode && (
                <div>
                  <dt className="mb-1 font-medium text-muted-foreground">
                    Error Code
                  </dt>
                  <dd className="font-mono text-xs">{delivery.errorCode}</dd>
                </div>
              )}

              {delivery.errorMessage && (
                <div className="col-span-2 sm:col-span-4">
                  <dt className="mb-1 font-medium text-muted-foreground">
                    Error Message
                  </dt>
                  <dd className="rounded-md bg-muted p-2 font-mono text-xs">
                    {delivery.errorMessage}
                  </dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
