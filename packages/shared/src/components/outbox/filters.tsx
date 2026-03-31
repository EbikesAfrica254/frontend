"use client";

import { useQueryStates } from "nuqs";
import { useTransition } from "react";
import { FilterInput } from "@repo/ui/tables/filter-input";
import { FilterSelect } from "@repo/ui/tables/filter-select";
import { FilterDateTimePicker } from "@repo/ui/tables/filter-date-time-picker";
import { outboxParamsParser } from "../../lib/outbox-params-parser";
import React from "react";
import { OutboxStatus } from "../../types/outbox";

const STATUS_OPTIONS = Object.values(OutboxStatus).map((status) => ({
  label: status.charAt(0) + status.slice(1).toLowerCase(),
  value: status,
}));

export function OutboxFilters() {
  const [isPending, startTransition] = useTransition();

  const [filters, setFilters] = useQueryStates(
    {
      createdAtFrom: outboxParamsParser.createdAtFrom,
      createdAtTo: outboxParamsParser.createdAtTo,
      eventType: outboxParamsParser.eventType,
      maxRetryCount: outboxParamsParser.maxRetryCount,
      minRetryCount: outboxParamsParser.minRetryCount,
      status: outboxParamsParser.status,
      updatedAtFrom: outboxParamsParser.updatedAtFrom,
      updatedAtTo: outboxParamsParser.updatedAtTo,
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
      eventType: null,
      maxRetryCount: null,
      minRetryCount: null,
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
          label="Event Type"
          onChange={(value) => void setFilters({ eventType: value || null })}
          placeholder="Filter by event type..."
          value={filters.eventType ?? ""}
        />

        <FilterSelect
          disabled={isPending}
          label="Status"
          onChange={(value) =>
            void setFilters({ status: (value as OutboxStatus) || null })
          }
          options={STATUS_OPTIONS}
          placeholder="All statuses"
          value={filters.status ?? ""}
        />

        <FilterInput
          disabled={isPending}
          label="Min Retry Count"
          onChange={(value) =>
            void setFilters({
              minRetryCount: value ? parseInt(value, 10) : null,
            })
          }
          placeholder="0"
          value={filters.minRetryCount?.toString() ?? ""}
        />

        <FilterInput
          disabled={isPending}
          label="Max Retry Count"
          onChange={(value) =>
            void setFilters({
              maxRetryCount: value ? parseInt(value, 10) : null,
            })
          }
          placeholder="10"
          value={filters.maxRetryCount?.toString() ?? ""}
        />

        <FilterDateTimePicker
          disabled={isPending}
          label="Created From"
          onChange={(date) => void setFilters({ createdAtFrom: date })}
          value={filters.createdAtFrom}
        />

        <FilterDateTimePicker
          disabled={isPending}
          label="Created To"
          onChange={(date) => void setFilters({ createdAtTo: date })}
          value={filters.createdAtTo}
        />

        <FilterDateTimePicker
          disabled={isPending}
          label="Updated From"
          onChange={(date) => void setFilters({ updatedAtFrom: date })}
          value={filters.updatedAtFrom}
        />

        <FilterDateTimePicker
          disabled={isPending}
          label="Updated To"
          onChange={(date) => void setFilters({ updatedAtTo: date })}
          value={filters.updatedAtTo}
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
