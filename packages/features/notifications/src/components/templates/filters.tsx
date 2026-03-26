"use client";

import { useQueryStates } from "nuqs";
import React, { useTransition } from "react";
import { templateParamsParser } from "../../lib/templates-params-parser";
import { NotificationChannel, TemplateContentType } from "../../types/enums";
import { FilterInput } from "@repo/ui/tables/filter-input";
import { FilterSelect } from "@repo/ui/tables/filter-select";

interface TemplateFiltersProps {
  onFilterChange?: () => void;
}

export function TemplateFilters({ onFilterChange }: TemplateFiltersProps) {
  const [isPending, startTransition] = useTransition();

  const [filters, setFilters] = useQueryStates(
    {
      channel: templateParamsParser.channel,
      contentType: templateParamsParser.contentType,
      isActive: templateParamsParser.isActive,
      name: templateParamsParser.name,
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
      channel: null,
      contentType: null,
      isActive: null,
      name: null,
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
          label="Name"
          onChange={(value) => handleChange("name", value)}
          placeholder="Search by name..."
          value={filters.name ?? ""}
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
          label="Content Type"
          onChange={(value) => handleChange("contentType", value)}
          options={[
            { label: "HTML", value: TemplateContentType.HTML },
            { label: "Plain Text", value: TemplateContentType.PLAIN_TEXT },
          ]}
          placeholder="Select content type..."
          value={filters.contentType ?? ""}
        />

        <FilterSelect
          disabled={isPending}
          label="Active"
          onChange={(value) => handleChange("isActive", value)}
          options={[
            { label: "Active", value: "true" },
            { label: "Inactive", value: "false" },
          ]}
          placeholder="Select status..."
          value={filters.isActive?.toString() ?? ""}
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
