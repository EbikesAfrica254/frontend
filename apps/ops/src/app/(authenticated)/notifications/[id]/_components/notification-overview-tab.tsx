import { Card, CardContent, CardHeader } from "@repo/ui/primitives/card";
import { formatDateTime } from "@repo/shared/client";
import {
  MessageBodyPreview,
  NotificationStatusBadge,
} from "@repo/features-notifications/client";
import { sanitize } from "@repo/features-notifications/server";
import type { NotificationResponse } from "@repo/features-notifications/client";
import { NotificationChannel } from "@repo/features-notifications/client";

interface NotificationOverviewTabProps {
  notification: NotificationResponse;
}

export function NotificationOverviewTab({
  notification,
}: NotificationOverviewTabProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">{notification.channel}</h1>
            <p className="font-mono text-sm text-muted-foreground">
              {notification.id}
            </p>
          </div>
          <NotificationStatusBadge status={notification.status} />
        </div>
      </CardHeader>

      <CardContent>
        <dl className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <dt className="mb-1 font-medium text-muted-foreground">
              Recipient
            </dt>
            <dd>{notification.recipient}</dd>
          </div>

          <div>
            <dt className="mb-1 font-medium text-muted-foreground">
              Service Reference
            </dt>
            <dd className="font-mono text-xs">
              {notification.serviceReference ?? "—"}
            </dd>
          </div>

          <div>
            <dt className="mb-1 font-medium text-muted-foreground">Template</dt>
            <dd className="font-mono text-xs">
              {notification.templateId ?? "—"}
            </dd>
          </div>

          <div>
            <dt className="mb-1 font-medium text-muted-foreground">
              Template Version
            </dt>
            <dd>{notification.templateVersion ?? "—"}</dd>
          </div>

          <div>
            <dt className="mb-1 font-medium text-muted-foreground">
              Organization
            </dt>
            <dd className="font-mono text-xs">
              {notification.organizationId ?? "—"}
            </dd>
          </div>

          <div>
            <dt className="mb-1 font-medium text-muted-foreground">Branch</dt>
            <dd className="font-mono text-xs">
              {notification.branchId ?? "—"}
            </dd>
          </div>

          {notification.messageSubject && (
            <div className="col-span-2">
              <dt className="mb-1 font-medium text-muted-foreground">
                Subject
              </dt>
              <dd>{notification.messageSubject}</dd>
            </div>
          )}

          {notification.messageBody && (
            <div className="col-span-2">
              <dt className="mb-1 font-medium text-muted-foreground">
                Message
              </dt>
              <dd>
                <MessageBodyPreview
                  sanitizedHtml={
                    notification.channel === NotificationChannel.EMAIL
                      ? sanitize(notification.messageBody)
                      : notification.messageBody
                  }
                  contentType={
                    notification.channel === NotificationChannel.EMAIL
                      ? "HTML"
                      : "PLAIN_TEXT"
                  }
                />
              </dd>
            </div>
          )}

          <div>
            <dt className="mb-1 font-medium text-muted-foreground">Created</dt>
            <dd>{formatDateTime(notification.createdAt)}</dd>
          </div>

          <div>
            <dt className="mb-1 font-medium text-muted-foreground">
              Last Updated
            </dt>
            <dd>{formatDateTime(notification.updatedAt)}</dd>
          </div>

          <div>
            <dt className="mb-1 font-medium text-muted-foreground">
              Created By
            </dt>
            <dd className="font-mono text-xs">{notification.createdBy}</dd>
          </div>

          <div>
            <dt className="mb-1 font-medium text-muted-foreground">
              Updated By
            </dt>
            <dd className="font-mono text-xs">{notification.updatedBy}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
