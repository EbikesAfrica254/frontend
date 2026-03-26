import { notFound } from "next/navigation";
import { getOrderByIdResource } from "@repo/features-orders/server";
import { OrderDetailActions } from "./_components/order-detail-actions";
import { OrderOverviewTab } from "./_components/order-overview-tab";
import { IncidentsTab } from "./_components/incidents-tab";
import { ReassignmentsTab } from "./_components/reassignments-tab";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/primitives/tabs";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
}

export default async function OrderDetailPage({
  params,
  searchParams,
}: OrderDetailPageProps) {
  const { id } = await params;
  const { tab = "overview" } = await searchParams;

  const orderResponse = await getOrderByIdResource(id);

  if (!orderResponse.data) {
    notFound();
  }

  const order = orderResponse.data;

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <OrderDetailActions
          orderId={order.id}
          orderStatus={order.status}
          reassignmentCount={order.reassignmentCount}
        />
      </div>

      <Tabs defaultValue={tab} className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="incidents">
            Incidents{" "}
            {order.incidents.length > 0 && `(${order.incidents.length})`}
          </TabsTrigger>
          <TabsTrigger value="reassignments">
            Reassignments{" "}
            {order.reassignments.length > 0 &&
              `(${order.reassignments.length})`}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <OrderOverviewTab order={order} />
        </TabsContent>

        <TabsContent value="incidents" className="mt-6">
          <IncidentsTab order={order} />
        </TabsContent>

        <TabsContent value="reassignments" className="mt-6">
          <ReassignmentsTab order={order} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
