"use client";

import { useQueryStates } from "nuqs";
import React, { useTransition } from "react";
import { reassignmentsParamsParser } from "../../lib/reassignments-params-parser";
import { ReassignmentStatus } from "../../types/enums";
import { FilterInput } from "@repo/ui/tables/filter-input";
import { FilterSelect } from "@repo/ui/tables/filter-select";

interface ReassignmentFiltersProps {
  onFilterChange?: () => void;
}

export function ReassignmentFilters({
  onFilterChange,
}: ReassignmentFiltersProps) {
  const [isPending, startTransition] = useTransition();

  const [filters, setFilters] = useQueryStates(
    {
      initiatedBy: reassignmentsParamsParser.initiatedBy,
      newAgentId: reassignmentsParamsParser.newAgentId,
      orderId: reassignmentsParamsParser.orderId,
      previousAgentId: reassignmentsParamsParser.previousAgentId,
      reason: reassignmentsParamsParser.reason,
      status: reassignmentsParamsParser.status,
    },
    {
      shallow: false,
      startTransition,
    },
  );

  const handleChange = (key: string, value: string | null) => {
    void setFilters({ [key]: value || null });
    onFilterChange?.();
  };

  const handleClearFilters = () => {
    void setFilters({
      initiatedBy: null,
      newAgentId: null,
      orderId: null,
      previousAgentId: null,
      reason: null,
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
          label="Order ID"
          onChange={(value) => handleChange("orderId", value)}
          placeholder="Search by order..."
          value={filters.orderId ?? ""}
        />

        <FilterInput
          debounceMs={300}
          disabled={isPending}
          label="Initiated By"
          onChange={(value) => handleChange("initiatedBy", value)}
          placeholder="Search by initiator..."
          value={filters.initiatedBy ?? ""}
        />

        <FilterInput
          debounceMs={300}
          disabled={isPending}
          label="New Agent ID"
          onChange={(value) => handleChange("newAgentId", value)}
          placeholder="Search by new agent..."
          value={filters.newAgentId ?? ""}
        />

        <FilterInput
          debounceMs={300}
          disabled={isPending}
          label="Previous Agent ID"
          onChange={(value) => handleChange("previousAgentId", value)}
          placeholder="Search by previous agent..."
          value={filters.previousAgentId ?? ""}
        />

        <FilterInput
          debounceMs={300}
          disabled={isPending}
          label="Reason"
          onChange={(value) => handleChange("reason", value)}
          placeholder="Search by reason..."
          value={filters.reason ?? ""}
        />

        <FilterSelect
          disabled={isPending}
          label="Status"
          onChange={(value) => handleChange("status", value)}
          options={Object.values(ReassignmentStatus).map((status) => ({
            label: status.replace(/_/g, " "),
            value: status,
          }))}
          placeholder="Select status..."
          value={filters.status ?? ""}
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
