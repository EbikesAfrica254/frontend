"use client";

import { useQueryStates } from "nuqs";
import React, { useTransition } from "react";
import { userParamsParser } from "../../lib/users-params-parser";
import { UserStatus } from "../../types/enums";
import { FilterInput } from "@repo/ui/tables/filter-input";
import { FilterSelect } from "@repo/ui/tables/filter-select";

interface UserFiltersProps {
  onFilterChange?: () => void;
}

export function UserFilters({ onFilterChange }: UserFiltersProps) {
  const [isPending, startTransition] = useTransition();

  const [filters, setFilters] = useQueryStates(
    {
      email: userParamsParser.email,
      firstName: userParamsParser.firstName,
      lastName: userParamsParser.lastName,
      organizationId: userParamsParser.organizationId,
      phoneNumber: userParamsParser.phoneNumber,
      status: userParamsParser.status,
      username: userParamsParser.username,
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
      email: null,
      firstName: null,
      lastName: null,
      organizationId: null,
      phoneNumber: null,
      status: null,
      username: null,
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
          label="Email"
          onChange={(value) => handleChange("email", value)}
          placeholder="Search by email..."
          value={filters.email ?? ""}
        />

        <FilterInput
          debounceMs={300}
          disabled={isPending}
          label="First Name"
          onChange={(value) => handleChange("firstName", value)}
          placeholder="Search by first name..."
          value={filters.firstName ?? ""}
        />

        <FilterInput
          debounceMs={300}
          disabled={isPending}
          label="Last Name"
          onChange={(value) => handleChange("lastName", value)}
          placeholder="Search by last name..."
          value={filters.lastName ?? ""}
        />

        <FilterInput
          debounceMs={300}
          disabled={isPending}
          label="Phone Number"
          onChange={(value) => handleChange("phoneNumber", value)}
          placeholder="Search by phone..."
          value={filters.phoneNumber ?? ""}
        />

        <FilterSelect
          disabled={isPending}
          label="Status"
          onChange={(value) => handleChange("status", value)}
          options={[
            { label: "Active", value: UserStatus.ACTIVE },
            { label: "Deleted", value: UserStatus.DELETED },
            { label: "Inactive", value: UserStatus.INACTIVE },
          ]}
          placeholder="Select status..."
          value={filters.status ?? ""}
        />

        <FilterInput
          debounceMs={300}
          disabled={isPending}
          label="Username"
          onChange={(value) => handleChange("username", value)}
          placeholder="Search by username..."
          value={filters.username ?? ""}
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
