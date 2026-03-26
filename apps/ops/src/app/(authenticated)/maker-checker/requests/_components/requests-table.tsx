"use client";

import { useTransition } from "react";
import type { RequestSummaryResponse } from "@repo/features-maker-checker/client";
import { useRequestParams } from "@repo/features-maker-checker/client";
import { Table, TableBody } from "@repo/ui/primitives/table";
import { PaginationControls } from "@repo/ui/tables/controls/pagination-controls";
import {
  TableEmptyState,
  TableLoadingState,
} from "@repo/ui/tables/states/table-state";
import { RequestsTableHeader } from "./requests-table-header";
import { RequestsTableRow } from "./requests-table-row";

interface RequestsTableProps {
  currentUserId: string;
  data: RequestSummaryResponse[];
  pageCount: number;
  totalElements: number;
}

export function RequestsTable({
  currentUserId,
  data,
  pageCount,
  totalElements,
}: RequestsTableProps) {
  const [isPending, startTransition] = useTransition();
  const { params, setParams } = useRequestParams();

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
        <Table>
          <RequestsTableHeader
            getSortState={getSortState}
            onSort={handleSort}
          />
          <TableBody>
            {isPending ? (
              <TableLoadingState columnCount={6} />
            ) : data.length > 0 ? (
              data.map((request) => (
                <RequestsTableRow
                  key={request.id}
                  isMaker={currentUserId === request.makerId}
                  request={request}
                />
              ))
            ) : (
              <TableEmptyState
                columnCount={6}
                message="No approval requests found."
              />
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
