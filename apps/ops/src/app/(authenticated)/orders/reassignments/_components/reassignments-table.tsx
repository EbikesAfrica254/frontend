"use client";

import { useTransition } from "react";
import type { ReassignmentResponse } from "@repo/features-orders/client";
import { useReassignmentsParams } from "@repo/features-orders/client";
import { Table, TableBody } from "@repo/ui/primitives/table";
import { PaginationControls } from "@repo/ui/tables/controls/pagination-controls";
import {
  TableEmptyState,
  TableLoadingState,
} from "@repo/ui/tables/states/table-state";
import { ReassignmentsTableHeader } from "./reassignments-table-header";
import { ReassignmentsTableRow } from "./reassignments-table-row";

interface ReassignmentsTableProps {
  data: ReassignmentResponse[];
  pageCount: number;
  totalElements: number;
}

export function ReassignmentsTable({
  data,
  pageCount,
  totalElements,
}: ReassignmentsTableProps) {
  const [isPending, startTransition] = useTransition();
  const { params, setParams } = useReassignmentsParams();

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
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <ReassignmentsTableHeader
            getSortState={getSortState}
            onSort={handleSort}
          />
          <TableBody>
            {isPending ? (
              <TableLoadingState columnCount={10} />
            ) : data.length > 0 ? (
              data.map((reassignment) => (
                <ReassignmentsTableRow
                  key={reassignment.id}
                  reassignment={reassignment}
                />
              ))
            ) : (
              <TableEmptyState
                columnCount={10}
                message="No reassignments found."
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
