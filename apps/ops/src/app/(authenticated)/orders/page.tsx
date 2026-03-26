import { buildQueryString } from "@repo/shared/client";
import {
  ordersParamsCache,
  searchOrdersResource,
} from "@repo/features-orders/server";
import { OrderFilters } from "@repo/features-orders/client";
import { OrdersTable } from "./_components/orders-table";
import { CreateOrderDialog } from "./_components/create-order-dialog";

interface OrdersPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const resolvedParams = await searchParams;
  const filters = ordersParamsCache.parse(resolvedParams);

  const queryString = buildQueryString({
    agentId: filters.agentId,
    cancelledFromStatus: filters.cancelledFromStatus,
    createdDateFrom: filters.createdDateFrom,
    createdDateTo: filters.createdDateTo,
    customerId: filters.customerId,
    orderType: filters.orderType,
    page: filters.page ?? 1,
    paymentVerified: filters.paymentVerified,
    size: filters.size ?? 20,
    sortBy: filters.sortBy,
    sortDirection: filters.sortDirection,
    status: filters.status,
    updatedDateFrom: filters.updatedDateFrom,
    updatedDateTo: filters.updatedDateTo,
  });

  const response = await searchOrdersResource(queryString);
  const orders = response.data;

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div></div>
        <CreateOrderDialog />
      </div>

      <OrderFilters />
      <OrdersTable
        data={orders}
        pageCount={response.totalPages}
        totalElements={response.totalElements}
      />
    </div>
  );
}
