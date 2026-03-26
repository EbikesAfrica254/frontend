"use client";

import { useTransition } from "react";
import type { UserExtensionSummaryResponse } from "@repo/features-iam/client";
import { useUserParams } from "@repo/features-iam/client";
import { Table, TableBody } from "@repo/ui/primitives/table";
import { PaginationControls } from "@repo/ui/tables/controls/pagination-controls";
import {
  TableEmptyState,
  TableLoadingState,
} from "@repo/ui/tables/states/table-state";
import { UsersTableRow } from "./users-table-row";
import { UsersTableHeader } from "../_components/users-table-header";

interface UsersTableProps {
  data: UserExtensionSummaryResponse[];
  pageCount: number;
  totalElements: number;
}

export function UsersTable({
  data,
  pageCount,
  totalElements,
}: UsersTableProps) {
  const [isPending, startTransition] = useTransition();
  const { params, setParams } = useUserParams();

  const handleSort = (field: string) => {
    const isCurrentField = params.sortBy === field;
    const newDirection =
      isCurrentField && params.sortDirection === "ASC" ? "DESC" : "ASC";

    startTransition(() => {
      void setParams({
        sortBy: field,
        sortDirection: newDirection,
      });
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
          <UsersTableHeader getSortState={getSortState} onSort={handleSort} />
          <TableBody>
            {isPending ? (
              <TableLoadingState columnCount={6} />
            ) : data.length > 0 ? (
              data.map((user) => <UsersTableRow key={user.id} user={user} />)
            ) : (
              <TableEmptyState columnCount={6} message="No users found." />
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
