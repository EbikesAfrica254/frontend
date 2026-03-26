"use client";

import { useTransition } from "react";
import type { DraftSummaryResponse } from "@repo/features-orders/client";
import { useDraftsParams } from "@repo/features-orders/client";
import { Table, TableBody } from "@repo/ui/primitives/table";
import { PaginationControls } from "@repo/ui/tables/controls/pagination-controls";
import {
  TableEmptyState,
  TableLoadingState,
} from "@repo/ui/tables/states/table-state";
import { DraftsTableHeader } from "./drafts-table-header";
import { DraftsTableRow } from "./drafts-table-row";

interface DraftsTableProps {
  data: DraftSummaryResponse[];
  pageCount: number;
  totalElements: number;
}

export function DraftsTable({
  data,
  pageCount,
  totalElements,
}: DraftsTableProps) {
  const [isPending, startTransition] = useTransition();
  const { params, setParams } = useDraftsParams();

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
        <Table className="w-full min-w-170 md:table-fixed">
          <DraftsTableHeader getSortState={getSortState} onSort={handleSort} />
          <TableBody>
            {isPending ? (
              <TableLoadingState columnCount={7} />
            ) : data.length > 0 ? (
              data.map((draft) => (
                <DraftsTableRow key={draft.id} draft={draft} />
              ))
            ) : (
              <TableEmptyState columnCount={7} message="No drafts found." />
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
