"use client";

import { useTransition } from "react";
import type { IncidentResponse } from "@repo/features-orders/client";
import { useIncidentsParams } from "@repo/features-orders/client";
import { Table, TableBody } from "@repo/ui/primitives/table";
import { PaginationControls } from "@repo/ui/tables/controls/pagination-controls";
import {
  TableEmptyState,
  TableLoadingState,
} from "@repo/ui/tables/states/table-state";
import { IncidentsTableHeader } from "./incidents-table-header";
import { IncidentsTableRow } from "./incidents-table-row";

interface IncidentsTableProps {
  data: IncidentResponse[];
  pageCount: number;
  totalElements: number;
}

export function IncidentsTable({
  data,
  pageCount,
  totalElements,
}: IncidentsTableProps) {
  const [isPending, startTransition] = useTransition();
  const { params, setParams } = useIncidentsParams();

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
          <IncidentsTableHeader
            getSortState={getSortState}
            onSort={handleSort}
          />
          <TableBody>
            {isPending ? (
              <TableLoadingState columnCount={6} />
            ) : data.length > 0 ? (
              data.map((incident) => (
                <IncidentsTableRow key={incident.id} incident={incident} />
              ))
            ) : (
              <TableEmptyState columnCount={6} message="No incidents found." />
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
