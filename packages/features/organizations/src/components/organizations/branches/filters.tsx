"use client";

import { useQueryStates } from "nuqs";
import React, { useTransition } from "react";
import { branchParamsParser } from "../../../lib/branches-params-parser";
import { BranchStatus } from "../../../types/enums";
import { FilterInput } from "@repo/ui/tables/filter-input";
import { FilterSelect } from "@repo/ui/tables/filter-select";

interface BranchFiltersProps {
  onFilterChange?: () => void;
}

export function BranchFilters({ onFilterChange }: BranchFiltersProps) {
  const [isPending, startTransition] = useTransition();

  const [filters, setFilters] = useQueryStates(
    {
      branchName: branchParamsParser.branchName,
      organizationId: branchParamsParser.organizationId,
      status: branchParamsParser.status,
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
      branchName: null,
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
          label="Branch Name"
          onChange={(value) => handleChange("branchName", value)}
          placeholder="Search by branch name..."
          value={filters.branchName ?? ""}
        />

        <FilterInput
          debounceMs={300}
          disabled={isPending}
          label="Organization ID"
          onChange={(value) => handleChange("organizationId", value)}
          placeholder="Search by organization ID..."
          value={filters.organizationId ?? ""}
        />

        <FilterSelect
          disabled={isPending}
          label="Status"
          onChange={(value) => handleChange("status", value)}
          options={[
            { label: "Active", value: BranchStatus.ACTIVE },
            { label: "Deactivated", value: BranchStatus.DEACTIVATED },
            { label: "Suspended", value: BranchStatus.SUSPENDED },
          ]}
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
