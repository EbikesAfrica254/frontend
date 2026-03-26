"use client";

import { useQueryStates } from "nuqs";
import React, { useTransition } from "react";
import { incidentsParamsParser } from "../../lib/incidents-params-parser";
import { IncidentType } from "../../types/enums";
import { FilterInput } from "@repo/ui/tables/filter-input";
import { FilterSelect } from "@repo/ui/tables/filter-select";

interface IncidentFiltersProps {
  onFilterChange?: () => void;
}

export function IncidentFilters({ onFilterChange }: IncidentFiltersProps) {
  const [isPending, startTransition] = useTransition();

  const [filters, setFilters] = useQueryStates(
    {
      agentId: incidentsParamsParser.agentId,
      incidentType: incidentsParamsParser.incidentType,
      notes: incidentsParamsParser.notes,
      orderId: incidentsParamsParser.orderId,
      reportedBy: incidentsParamsParser.reportedBy,
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
      agentId: null,
      incidentType: null,
      notes: null,
      orderId: null,
      reportedBy: null,
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
          label="Agent ID"
          onChange={(value) => handleChange("agentId", value)}
          placeholder="Search by agent..."
          value={filters.agentId ?? ""}
        />

        <FilterInput
          debounceMs={300}
          disabled={isPending}
          label="Reported By"
          onChange={(value) => handleChange("reportedBy", value)}
          placeholder="Search by reporter..."
          value={filters.reportedBy ?? ""}
        />

        <FilterInput
          debounceMs={300}
          disabled={isPending}
          label="Notes"
          onChange={(value) => handleChange("notes", value)}
          placeholder="Search by notes..."
          value={filters.notes ?? ""}
        />

        <FilterSelect
          disabled={isPending}
          label="Incident Type"
          onChange={(value) => handleChange("incidentType", value)}
          options={Object.values(IncidentType).map((type) => ({
            label: type.replace(/_/g, " "),
            value: type,
          }))}
          placeholder="Select type..."
          value={filters.incidentType ?? ""}
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
