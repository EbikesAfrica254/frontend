"use client";

import { useTransition } from "react";
import { useQueryStates } from "nuqs";
import type { TemplateSummaryResponse } from "@repo/features-notifications/client";
import { templateParamsParser } from "@repo/features-notifications/client";
import { Table, TableBody } from "@repo/ui/primitives/table";
import { PaginationControls } from "@repo/ui/tables/controls/pagination-controls";
import {
  TableEmptyState,
  TableLoadingState,
} from "@repo/ui/tables/states/table-state";
import { TemplatesTableHeader } from "./templates-table-header";
import { TemplatesTableRow } from "./templates-table-row";

interface TemplatesTableProps {
  data: TemplateSummaryResponse[];
  pageCount: number;
  totalElements: number;
}

export function TemplatesTable({
  data,
  pageCount,
  totalElements,
}: TemplatesTableProps) {
  const [isPending, startTransition] = useTransition();
  const [params, setParams] = useQueryStates(templateParamsParser);

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

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TemplatesTableHeader
            getSortState={getSortState}
            onSort={handleSort}
          />
          <TableBody>
            {isPending ? (
              <TableLoadingState columnCount={6} />
            ) : data.length > 0 ? (
              data.map((template) => (
                <TemplatesTableRow key={template.id} template={template} />
              ))
            ) : (
              <TableEmptyState columnCount={6} message="No templates found." />
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
