"use client";

import { useQueryStates } from "nuqs";
import React, { useTransition } from "react";
import { preferredAgentParamsParser } from "../../lib/preferred-agents-params-parser";
import { FilterInput } from "@repo/ui/tables/filter-input";

export function PreferredAgentFilters() {
  const [isPending, startTransition] = useTransition();

  const [filters, setFilters] = useQueryStates(
    {
      agentId: preferredAgentParamsParser.agentId,
      branchId: preferredAgentParamsParser.branchId,
      organizationId: preferredAgentParamsParser.organizationId,
    },
    {
      shallow: false,
      startTransition,
    },
  );

  const handleClearFilters = () => {
    void setFilters({
      agentId: null,
      branchId: null,
      organizationId: null,
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
          label="Agent ID"
          onChange={(value) => void setFilters({ agentId: value || null })}
          placeholder="Search by agent ID..."
          value={filters.agentId ?? ""}
        />

        <FilterInput
          debounceMs={300}
          disabled={isPending}
          label="Organization ID"
          onChange={(value) =>
            void setFilters({ organizationId: value || null })
          }
          placeholder="Search by organization ID..."
          value={filters.organizationId ?? ""}
        />

        <FilterInput
          debounceMs={300}
          disabled={isPending}
          label="Branch ID"
          onChange={(value) => void setFilters({ branchId: value || null })}
          placeholder="Search by branch ID..."
          value={filters.branchId ?? ""}
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
