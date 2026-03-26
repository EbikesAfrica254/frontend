// outbox-table.tsx
"use client";

import { useState, useTransition } from "react";
import { RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@repo/ui/primitives/button";
import { Table, TableBody } from "@repo/ui/primitives/table";
import {
  TableEmptyState,
  TableLoadingState,
} from "@repo/ui/tables/states/table-state";
import { ConfirmationDialog } from "@repo/ui/dialogs/confirmation-dialog";
import {
  OutboxResponse,
  OutboxStatus,
  useOutboxParams,
} from "@repo/features-iam/client";
import { retryAllFailedEvents } from "@repo/features-iam/actions";
import { PaginationControls } from "@repo/ui/tables/controls/pagination-controls";
import { OutboxTableHeader } from "./outbox-table-header";
import { OutboxTableRow } from "./outbox-table-row";

interface OutboxTableProps {
  data: OutboxResponse[];
  pageCount: number;
  totalElements: number;
}

export function OutboxTable({
                              data,
                              pageCount,
                              totalElements,
                            }: OutboxTableProps) {
  const [isPending, startTransition] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);
  const { params, setParams } = useOutboxParams();

  const failedCount = data.filter(
      (event) => event.status === OutboxStatus.FAILED,
  ).length;

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

  const canPreviousPage = params.page > 1;
  const canNextPage = params.page < pageCount;

  const handleRetryAll = async () => {
    startTransition(async () => {
      const result = await retryAllFailedEvents();

      if (result.success) {
        toast.success(`Retrying ${result.data} failed events`);
      } else {
        toast.error(result.error || "Failed to retry events");
      }

      setShowConfirm(false);
    });
  };

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {failedCount} failed {failedCount === 1 ? "event" : "events"}
          </p>

          {failedCount > 0 && (
              <Button
                  onClick={() => setShowConfirm(true)}
                  disabled={isPending}
                  size="sm"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Retry All
              </Button>
          )}
        </div>

        <ConfirmationDialog
            open={showConfirm}
            onOpenChange={setShowConfirm}
            onConfirm={handleRetryAll}
            title="Retry all failed events?"
            description={
              <>
                This will requeue{" "}
                <strong>
                  {failedCount} failed {failedCount === 1 ? "event" : "events"}
                </strong>{" "}
                for processing. Events will be reset to PENDING and processed on the
                next cycle.
              </>
            }
            confirmText="Retry"
            cancelText="Cancel"
            variant="default"
            isPending={isPending}
        />

        <div className="rounded-md border">
          <Table className="w-full min-w-170 md:table-fixed">
            <OutboxTableHeader getSortState={getSortState} onSort={handleSort} />
            <TableBody>
              {isPending ? (
                  <TableLoadingState columnCount={7} />
              ) : data.length > 0 ? (
                  data.map((event) => (
                      <OutboxTableRow key={event.id} event={event} />
                  ))
              ) : (
                  <TableEmptyState
                      columnCount={7}
                      message="No outbox events found."
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