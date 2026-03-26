import { notFound } from "next/navigation";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/primitives/tabs";
import { getNotification } from "@repo/features-notifications/actions";
import { NotificationDeliveriesTab } from "./_components/notification-deliveries-tab";
import { NotificationDetailActions } from "./_components/notification-detail-actions";
import { NotificationOverviewTab } from "./_components/notification-overview-tab";

interface NotificationDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function NotificationDetailPage({
  params,
}: NotificationDetailPageProps) {
  const { id } = await params;
  const result = await getNotification(id).catch(() => null);

  if (!result?.success || !result.data) {
    notFound();
  }

  const notification = result.data;

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <NotificationDetailActions
          notificationId={notification.id}
          status={notification.status}
        />
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="deliveries">Delivery Attempts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <NotificationOverviewTab notification={notification} />
        </TabsContent>

        <TabsContent value="deliveries">
          <NotificationDeliveriesTab notificationId={notification.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
