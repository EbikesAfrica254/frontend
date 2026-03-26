"use client";

import { useTransition } from "react";
import type { OrderSummaryResponse } from "@repo/features-orders/client";
import { useOrdersParams } from "@repo/features-orders/client";
import { Table, TableBody } from "@repo/ui/primitives/table";
import { PaginationControls } from "@repo/ui/tables/controls/pagination-controls";
import {
  TableEmptyState,
  TableLoadingState,
} from "@repo/ui/tables/states/table-state";
import { OrdersTableHeader } from "./orders-table-header";
import { OrdersTableRow } from "./orders-table-row";

interface OrdersTableProps {
  data: OrderSummaryResponse[];
  pageCount: number;
  totalElements: number;
}

export function OrdersTable({
  data,
  pageCount,
  totalElements,
}: OrdersTableProps) {
  const [isPending, startTransition] = useTransition();
  const { params, setParams } = useOrdersParams();

  const handleSort = (field: string) => {
    const isCurrentField = params.sortBy === field;
    const newDirection =
      isCurrentField && params.sortDirection === "ASC" ? "DESC" : "ASC";

    startTransition(() => {
      void setParams({ sortBy: field, sortDirection: newDirection });
    });
  };

  const getSortState = (field: string): false | "asc" | "desc" => {
    if (params.sortBy !== field) return false;
    return params.sortDirection === "ASC" ? "asc" : "desc";
  };

  const canPreviousPage = params.page > 1;
  const canNextPage = params.page < pageCount;

  return (
    <div className="space-y-6">
      <div className="rounded-md border">
        <Table className="w-full min-w-180 md:table-fixed">
          <OrdersTableHeader getSortState={getSortState} onSort={handleSort} />
          <TableBody>
            {isPending ? (
              <TableLoadingState columnCount={7} />
            ) : data.length > 0 ? (
              data.map((order) => (
                <OrdersTableRow key={order.id} order={order} />
              ))
            ) : (
              <TableEmptyState columnCount={7} message="No orders found." />
            )}
          </TableBody>
        </Table>
      </div>

      <PaginationControls
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
        currentPage={params.page}
        disabled={isPending}
        onPageChange={(page: number) => {
          startTransition(() => {
            void setParams({ page });
          });
        }}
        onPageSizeChange={(size: number) => {
          startTransition(() => {
            void setParams({ page: 1, size });
          });
        }}
        pageCount={pageCount}
        pageSize={params.size}
        totalElements={totalElements}
      />
    </div>
  );
}
