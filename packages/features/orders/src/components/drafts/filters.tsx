"use client";

import { useQueryStates } from "nuqs";
import { useTransition } from "react";
import { draftsParamsParser } from "../../lib/drafts-params-parser";
import { ContactStatus, DraftStatus } from "../../types/enums";
import { FilterInput } from "@repo/ui/tables/filter-input";
import { FilterSelect } from "@repo/ui/tables/filter-select";
import { FilterDateRangePicker } from "@repo/ui/tables/filter-date-range-picker";
import React from "react";

const CONTACT_STATUS_OPTIONS = Object.values(ContactStatus).map((status) => ({
  label: status.charAt(0) + status.slice(1).toLowerCase(),
  value: status,
}));

const DRAFT_STATUS_OPTIONS = Object.values(DraftStatus).map((status) => ({
  label: status.charAt(0) + status.slice(1).toLowerCase(),
  value: status,
}));

interface DraftFiltersProps {
  onFilterChange?: () => void;
}

export function DraftFilters({ onFilterChange }: DraftFiltersProps) {
  const [isPending, startTransition] = useTransition();

  const [filters, setFilters] = useQueryStates(
    {
      branchId: draftsParamsParser.branchId,
      contactStatus: draftsParamsParser.contactStatus,
      createdDateFrom: draftsParamsParser.createdDateFrom,
      createdDateTo: draftsParamsParser.createdDateTo,
      customerId: draftsParamsParser.customerId,
      customerPhone: draftsParamsParser.customerPhone,
      expiresDateFrom: draftsParamsParser.expiresDateFrom,
      expiresDateTo: draftsParamsParser.expiresDateTo,
      organizationId: draftsParamsParser.organizationId,
      status: draftsParamsParser.status,
    },
    {
      shallow: false,
      startTransition,
    },
  );

  const handleClearFilters = () => {
    void setFilters({
      branchId: null,
      contactStatus: null,
      createdDateFrom: null,
      createdDateTo: null,
      customerId: null,
      customerPhone: null,
      expiresDateFrom: null,
      expiresDateTo: null,
      organizationId: null,
      status: null,
    });
    onFilterChange?.();
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== null,
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Filters</h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleClearFilters}
            disabled={isPending}
            className="text-sm text-muted-foreground hover:text-foreground disabled:opacity-50"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <FilterInput
          debounceMs={300}
          disabled={isPending}
          label="Customer Phone"
          onChange={(value) =>
            void setFilters({ customerPhone: value || null })
          }
          placeholder="Filter by phone..."
          value={filters.customerPhone ?? ""}
        />

        <FilterInput
          debounceMs={300}
          disabled={isPending}
          label="Customer ID"
          onChange={(value) => void setFilters({ customerId: value || null })}
          placeholder="Filter by customer ID..."
          value={filters.customerId ?? ""}
        />

        <FilterInput
          debounceMs={300}
          disabled={isPending}
          label="Organization ID"
          onChange={(value) =>
            void setFilters({ organizationId: value || null })
          }
          placeholder="Filter by organization..."
          value={filters.organizationId ?? ""}
        />

        <FilterInput
          debounceMs={300}
          disabled={isPending}
          label="Branch ID"
          onChange={(value) => void setFilters({ branchId: value || null })}
          placeholder="Filter by branch..."
          value={filters.branchId ?? ""}
        />

        <FilterSelect
          disabled={isPending}
          label="Status"
          onChange={(value) =>
            void setFilters({ status: (value as DraftStatus) || null })
          }
          options={DRAFT_STATUS_OPTIONS}
          placeholder="All statuses"
          value={filters.status ?? ""}
        />

        <FilterSelect
          disabled={isPending}
          label="Contact Status"
          onChange={(value) =>
            void setFilters({ contactStatus: (value as ContactStatus) || null })
          }
          options={CONTACT_STATUS_OPTIONS}
          placeholder="All contact statuses"
          value={filters.contactStatus ?? ""}
        />

        <FilterDateRangePicker
          disabled={isPending}
          label="Created Date"
          onChange={({ from, to }) =>
            void setFilters({
              createdDateFrom: from ? from.toISOString().split("T")[0] : null,
              createdDateTo: to ? to.toISOString().split("T")[0] : null,
            })
          }
          value={{
            from: filters.createdDateFrom
              ? new Date(filters.createdDateFrom)
              : null,
            to: filters.createdDateTo ? new Date(filters.createdDateTo) : null,
          }}
        />

        <FilterDateRangePicker
          disabled={isPending}
          label="Expires Date"
          onChange={({ from, to }) =>
            void setFilters({
              expiresDateFrom: from ? from.toISOString().split("T")[0] : null,
              expiresDateTo: to ? to.toISOString().split("T")[0] : null,
            })
          }
          value={{
            from: filters.expiresDateFrom
              ? new Date(filters.expiresDateFrom)
              : null,
            to: filters.expiresDateTo ? new Date(filters.expiresDateTo) : null,
          }}
        />
      </div>

      {isPending && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          <span>Updating results...</span>
        </div>
      )}
    </div>
  );
}
