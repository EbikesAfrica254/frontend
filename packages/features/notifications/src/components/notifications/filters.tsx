"use client";

import { useQueryStates } from "nuqs";
import React, { useTransition } from "react";
import { notificationParamsParser } from "../../lib/notifications-params-parser";
import { NotificationChannel, NotificationStatus } from "../../types/enums";
import { FilterInput } from "@repo/ui/tables/filter-input";
import { FilterSelect } from "@repo/ui/tables/filter-select";

interface NotificationFiltersProps {
  onFilterChange?: () => void;
}

export function NotificationFilters({
  onFilterChange,
}: NotificationFiltersProps) {
  const [isPending, startTransition] = useTransition();

  const [filters, setFilters] = useQueryStates(
    {
      branchId: notificationParamsParser.branchId,
      channel: notificationParamsParser.channel,
      organizationId: notificationParamsParser.organizationId,
      recipient: notificationParamsParser.recipient,
      status: notificationParamsParser.status,
      templateId: notificationParamsParser.templateId,
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
      branchId: null,
      channel: null,
      organizationId: null,
      recipient: null,
      status: null,
      templateId: null,
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
          label="Recipient"
          onChange={(value) => handleChange("recipient", value)}
          placeholder="Search by recipient..."
          value={filters.recipient ?? ""}
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
          label="Status"
          onChange={(value) => handleChange("status", value)}
          options={[
            { label: "Cancelled", value: NotificationStatus.CANCELLED },
            { label: "Delivered", value: NotificationStatus.DELIVERED },
            { label: "Failed", value: NotificationStatus.FAILED },
            { label: "Pending", value: NotificationStatus.PENDING },
            { label: "Processing", value: NotificationStatus.PROCESSING },
          ]}
          placeholder="Select status..."
          value={filters.status ?? ""}
        />

        <FilterInput
          debounceMs={300}
          disabled={isPending}
          label="Organization ID"
          onChange={(value) => handleChange("organizationId", value)}
          placeholder="Search by organization ID..."
          value={filters.organizationId ?? ""}
        />

        <FilterInput
          debounceMs={300}
          disabled={isPending}
          label="Branch ID"
          onChange={(value) => handleChange("branchId", value)}
          placeholder="Search by branch ID..."
          value={filters.branchId ?? ""}
        />

        <FilterInput
          debounceMs={300}
          disabled={isPending}
          label="Template ID"
          onChange={(value) => handleChange("templateId", value)}
          placeholder="Search by template ID..."
          value={filters.templateId ?? ""}
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
