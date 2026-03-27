"use client";

import { useTransition } from "react";
import { useQueryStates } from "nuqs";
import type { NotificationSummaryResponse } from "@repo/features-notifications/client";
import { notificationParamsParser } from "@repo/features-notifications/client";
import { Table, TableBody } from "@repo/ui/primitives/table";
import { PaginationControls } from "@repo/ui/tables/controls/pagination-controls";
import {
  TableEmptyState,
  TableLoadingState,
} from "@repo/ui/tables/states/table-state";
import { NotificationsTableHeader } from "./notifications-table-header";
import { NotificationsTableRow } from "./notifications-table-row";

interface NotificationsTableProps {
  data: NotificationSummaryResponse[];
  pageCount: number;
  totalElements: number;
}

export function NotificationsTable({
  data,
  pageCount,
  totalElements,
}: NotificationsTableProps) {
  const [isPending, startTransition] = useTransition();
  const [params, setParams] = useQueryStates(notificationParamsParser);

  const handleSort = (field: string) => {
    const isCurrentField = params.sortBy === field;
    const newDirection =
      isCurrentField && params.sortDirection === "ASC" ? "DESC" : "ASC";

    startTransition(() => {
      void setParams({ sortBy: field, sortDirection: newDirection, page: 1 });
    });
  };

  const getSortState = (field: string): false | "asc" | "desc" => {
    if (params.sortBy !== field) return false;
    return params.sortDirection === "ASC" ? "asc" : "desc";
  };

  return (
    <div className="space-y-6">
      <div className="rounded-md border">
        <Table className="w-full min-w-160 md:table-fixed">
          <NotificationsTableHeader
            getSortState={getSortState}
            onSort={handleSort}
          />
          <TableBody>
            {isPending ? (
              <TableLoadingState columnCount={6} />
            ) : data.length > 0 ? (
              data.map((notification) => (
                <NotificationsTableRow
                  key={notification.id}
                  notification={notification}
                />
              ))
            ) : (
              <TableEmptyState
                columnCount={6}
                message="No notifications found."
              />
            )}
          </TableBody>
        </Table>
      </div>

      <PaginationControls
        canNextPage={params.page < pageCount}
        canPreviousPage={params.page > 1}
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
