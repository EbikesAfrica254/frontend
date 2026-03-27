"use client";

import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@repo/ui/primitives/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/primitives/select";

interface PaginationControlsProps {
  canNextPage: boolean;
  canPreviousPage: boolean;
  currentPage: number;
  disabled?: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  pageCount: number;
  pageSize: number;
  totalElements: number;
}

export function PaginationControls({
  canNextPage,
  canPreviousPage,
  currentPage,
  disabled = false,
  onPageChange,
  onPageSizeChange,
  pageCount,
  pageSize,
  totalElements,
}: PaginationControlsProps) {
  const safeTotalElements = Math.max(totalElements, 0);
  const safePageCount = Math.max(pageCount, 1);
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), safePageCount);

  const startItem =
    safeTotalElements === 0 ? 0 : (safeCurrentPage - 1) * pageSize + 1;
  const endItem =
    safeTotalElements === 0
      ? 0
      : Math.min(safeCurrentPage * pageSize, safeTotalElements);

  return (
    <div className="flex flex-col gap-3 px-2 py-2 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Showing {startItem} to {endItem} of {safeTotalElements} results
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
        <div className="flex items-center justify-between gap-2 sm:justify-start">
          <p className="shrink-0 text-sm font-medium">Rows per page</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => onPageSizeChange(Number(value))}
            disabled={disabled}
          >
            <SelectTrigger className="h-8 w-[72px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
          <p className="min-w-0 text-sm font-medium text-muted-foreground">
            Page {safeCurrentPage} of {safePageCount}
          </p>

          <div className="ml-auto flex items-center gap-1 sm:ml-0">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 shrink-0"
              onClick={() => onPageChange(1)}
              disabled={!canPreviousPage || disabled}
            >
              <ChevronsLeft className="h-4 w-4" />
              <span className="sr-only">First page</span>
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 shrink-0"
              onClick={() => onPageChange(safeCurrentPage - 1)}
              disabled={!canPreviousPage || disabled}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous page</span>
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 shrink-0"
              onClick={() => onPageChange(safeCurrentPage + 1)}
              disabled={!canNextPage || disabled}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next page</span>
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 shrink-0"
              onClick={() => onPageChange(safePageCount)}
              disabled={!canNextPage || disabled}
            >
              <ChevronsRight className="h-4 w-4" />
              <span className="sr-only">Last page</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
