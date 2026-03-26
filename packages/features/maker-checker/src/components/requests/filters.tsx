"use client";

import { useQueryStates } from "nuqs";
import { useTransition } from "react";
import { FilterSelect } from "@repo/ui/tables/filter-select";
import { FilterDateRangePicker } from "@repo/ui/tables/filter-date-range-picker";
import { FilterInput } from "@repo/ui/tables/filter-input";
import { requestsParamsParser } from "../../lib/requests-params-parser";
import { RequestStatus } from "../../types/enums";
import React from "react";

const STATUS_OPTIONS = Object.values(RequestStatus).map((status) => ({
  label: status.charAt(0) + status.slice(1).toLowerCase(),
  value: status,
}));

export function RequestFilters() {
  const [isPending, startTransition] = useTransition();

  const [filters, setFilters] = useQueryStates(
    {
      createdAtFrom: requestsParamsParser.createdAtFrom,
      createdAtTo: requestsParamsParser.createdAtTo,
      entityId: requestsParamsParser.entityId,
      entityType: requestsParamsParser.entityType,
      makerId: requestsParamsParser.makerId,
      organizationId: requestsParamsParser.organizationId,
      status: requestsParamsParser.status,
      updatedAtFrom: requestsParamsParser.updatedAtFrom,
      updatedAtTo: requestsParamsParser.updatedAtTo,
    },
    {
      shallow: false,
      startTransition,
    },
  );

  const handleClearFilters = () => {
    void setFilters({
      createdAtFrom: null,
      createdAtTo: null,
      entityId: null,
      entityType: null,
      makerId: null,
      organizationId: null,
      status: null,
      updatedAtFrom: null,
      updatedAtTo: null,
    });
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
          label="Entity Type"
          onChange={(value) => void setFilters({ entityType: value || null })}
          placeholder="Filter by entity type..."
          value={filters.entityType ?? ""}
        />

        <FilterInput
          debounceMs={300}
          disabled={isPending}
          label="Entity ID"
          onChange={(value) => void setFilters({ entityId: value || null })}
          placeholder="Filter by entity ID..."
          value={filters.entityId ?? ""}
        />

        <FilterInput
          debounceMs={300}
          disabled={isPending}
          label="Maker ID"
          onChange={(value) => void setFilters({ makerId: value || null })}
          placeholder="Filter by maker..."
          value={filters.makerId ?? ""}
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

        <FilterSelect
          disabled={isPending}
          label="Status"
          onChange={(value) =>
            void setFilters({ status: (value as RequestStatus) || null })
          }
          options={STATUS_OPTIONS}
          placeholder="All statuses"
          value={filters.status ?? ""}
        />

        <FilterDateRangePicker
          disabled={isPending}
          label="Created At"
          onChange={({ from, to }) =>
            void setFilters({
              createdAtFrom: from ? from.toISOString().split("T")[0] : null,
              createdAtTo: to ? to.toISOString().split("T")[0] : null,
            })
          }
          value={{
            from: filters.createdAtFrom
              ? new Date(filters.createdAtFrom)
              : null,
            to: filters.createdAtTo ? new Date(filters.createdAtTo) : null,
          }}
        />

        <FilterDateRangePicker
          disabled={isPending}
          label="Updated At"
          onChange={({ from, to }) =>
            void setFilters({
              updatedAtFrom: from ? from.toISOString().split("T")[0] : null,
              updatedAtTo: to ? to.toISOString().split("T")[0] : null,
            })
          }
          value={{
            from: filters.updatedAtFrom
              ? new Date(filters.updatedAtFrom)
              : null,
            to: filters.updatedAtTo ? new Date(filters.updatedAtTo) : null,
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
