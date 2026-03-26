"use client";

import { useTransition } from "react";
import { useQueryStates } from "nuqs";
import type { PreferredAgentDetailResponse } from "@repo/features-workforce/client";
import { preferredAgentParamsParser } from "@repo/features-workforce/client";
import { Table, TableBody } from "@repo/ui/primitives/table";
import { PaginationControls } from "@repo/ui/tables/controls/pagination-controls";
import {
  TableEmptyState,
  TableLoadingState,
} from "@repo/ui/tables/states/table-state";
import { PreferredAgentsTableHeader } from "./preferred-agents-table-header";
import { PreferredAgentsTableRow } from "./preferred-agents-table-row";

interface PreferredAgentsTableProps {
  data: PreferredAgentDetailResponse[];
  pageCount: number;
  totalElements: number;
}

export function PreferredAgentsTable({
  data,
  pageCount,
  totalElements,
}: PreferredAgentsTableProps) {
  const [isPending, startTransition] = useTransition();
  const [params, setParams] = useQueryStates(preferredAgentParamsParser);

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
        <Table className="table-fixed w-full">
          <PreferredAgentsTableHeader
            getSortState={getSortState}
            onSort={handleSort}
          />
          <TableBody>
            {isPending ? (
              <TableLoadingState columnCount={5} />
            ) : data.length > 0 ? (
              data.map((entry) => (
                <PreferredAgentsTableRow key={entry.id} entry={entry} />
              ))
            ) : (
              <TableEmptyState
                columnCount={5}
                message="No preferred agents found."
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
