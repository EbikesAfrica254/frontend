"use client";

import { useQueryStates } from "nuqs";
import React, { useTransition } from "react";
import { userPreferenceParamsParser } from "../../lib/user-preferences-params-parser";
import { NotificationCategory, NotificationChannel } from "../../types/enums";
import { FilterSelect } from "@repo/ui/tables/filter-select";

interface UserPreferenceFiltersProps {
  onFilterChange?: () => void;
}

export function UserPreferenceFilters({
  onFilterChange,
}: UserPreferenceFiltersProps) {
  const [isPending, startTransition] = useTransition();

  const [filters, setFilters] = useQueryStates(
    {
      category: userPreferenceParamsParser.category,
      channel: userPreferenceParamsParser.channel,
      enabled: userPreferenceParamsParser.enabled,
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
      category: null,
      channel: null,
      enabled: null,
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
        <FilterSelect
          disabled={isPending}
          label="Category"
          onChange={(value) => handleChange("category", value)}
          options={[
            { label: "Marketing", value: NotificationCategory.MARKETING },
            { label: "Operational", value: NotificationCategory.OPERATIONAL },
            { label: "Security", value: NotificationCategory.SECURITY },
            {
              label: "Transactional",
              value: NotificationCategory.TRANSACTIONAL,
            },
          ]}
          placeholder="Select category..."
          value={filters.category ?? ""}
        />

        <FilterSelect
          disabled={isPending}
          label="Channel"
          onChange={(value) => handleChange("channel", value)}
          options={[
            { label: "Email", value: NotificationChannel.EMAIL },
            { label: "SMS", value: NotificationChannel.SMS },
            { label: "SSE", value: NotificationChannel.SSE },
            { label: "WhatsApp", value: NotificationChannel.WHATSAPP },
          ]}
          placeholder="Select channel..."
          value={filters.channel ?? ""}
        />

        <FilterSelect
          disabled={isPending}
          label="Enabled"
          onChange={(value) => handleChange("enabled", value)}
          options={[
            { label: "Enabled", value: "true" },
            { label: "Disabled", value: "false" },
          ]}
          placeholder="Select status..."
          value={filters.enabled?.toString() ?? ""}
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
