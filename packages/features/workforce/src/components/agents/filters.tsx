"use client";

import { useQueryStates } from "nuqs";
import React, { useTransition } from "react";
import { agentParamsParser } from "../../lib/agents-params-parser";
import { AvailabilityStatus, CapabilityClass } from "../../types/enums";
import { FilterInput } from "@repo/ui/tables/filter-input";
import { FilterSelect } from "@repo/ui/tables/filter-select";
import { FilterBoolean } from "@repo/ui/tables/filter-boolean";
import { FilterDateRangePicker } from "@repo/ui/tables/filter-date-range-picker";

export function AgentFilters() {
  const [isPending, startTransition] = useTransition();

  const [filters, setFilters] = useQueryStates(
    {
      availabilityStatus: agentParamsParser.availabilityStatus,
      capabilityClass: agentParamsParser.capabilityClass,
      createdAtFrom: agentParamsParser.createdAtFrom,
      createdAtTo: agentParamsParser.createdAtTo,
      firstName: agentParamsParser.firstName,
      hasActiveSuspension: agentParamsParser.hasActiveSuspension,
      lastName: agentParamsParser.lastName,
      nationalIdNumber: agentParamsParser.nationalIdNumber,
      phoneNumber: agentParamsParser.phoneNumber,
      reliabilityScoreMin: agentParamsParser.reliabilityScoreMin,
      reliabilityScoreMax: agentParamsParser.reliabilityScoreMax,
    },
    {
      shallow: false,
      startTransition,
    },
  );

  const handleClearFilters = () => {
    void setFilters({
      availabilityStatus: null,
      capabilityClass: null,
      createdAtFrom: null,
      createdAtTo: null,
      firstName: null,
      hasActiveSuspension: null,
      lastName: null,
      nationalIdNumber: null,
      phoneNumber: null,
      reliabilityScoreMin: null,
      reliabilityScoreMax: null,
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
          label="First Name"
          onChange={(value) => void setFilters({ firstName: value || null })}
          placeholder="Search by first name..."
          value={filters.firstName ?? ""}
        />

        <FilterInput
          debounceMs={300}
          disabled={isPending}
          label="Last Name"
          onChange={(value) => void setFilters({ lastName: value || null })}
          placeholder="Search by last name..."
          value={filters.lastName ?? ""}
        />

        <FilterInput
          debounceMs={300}
          disabled={isPending}
          label="Phone Number"
          onChange={(value) => void setFilters({ phoneNumber: value || null })}
          placeholder="+254712345678"
          type="tel"
          value={filters.phoneNumber ?? ""}
        />

        <FilterInput
          debounceMs={300}
          disabled={isPending}
          label="National ID"
          onChange={(value) =>
            void setFilters({ nationalIdNumber: value || null })
          }
          placeholder="Search by national ID..."
          value={filters.nationalIdNumber ?? ""}
        />

        <FilterSelect
          disabled={isPending}
          label="Availability Status"
          onChange={(value) =>
            void setFilters({
              availabilityStatus: (value as AvailabilityStatus) || null,
            })
          }
          options={[
            { label: "Available", value: AvailabilityStatus.AVAILABLE },
            { label: "Busy", value: AvailabilityStatus.BUSY },
            { label: "Offline", value: AvailabilityStatus.OFFLINE },
            { label: "Pending", value: AvailabilityStatus.PENDING },
            { label: "Suspended", value: AvailabilityStatus.SUSPENDED },
            { label: "Unavailable", value: AvailabilityStatus.UNAVAILABLE },
            { label: "Deactivated", value: AvailabilityStatus.DEACTIVATED },
          ]}
          placeholder="Select status..."
          value={filters.availabilityStatus ?? ""}
        />

        <FilterSelect
          disabled={isPending}
          label="Capability Class"
          onChange={(value) =>
            void setFilters({
              capabilityClass: (value as CapabilityClass) || null,
            })
          }
          options={[
            { label: "Bicycle Rider", value: CapabilityClass.BICYCLE_RIDER },
            {
              label: "Light Motor Rider",
              value: CapabilityClass.LIGHT_MOTOR_RIDER,
            },
            { label: "Vehicle Driver", value: CapabilityClass.VEHICLE_DRIVER },
          ]}
          placeholder="Select capability class..."
          value={filters.capabilityClass ?? ""}
        />

        <FilterBoolean
          disabled={isPending}
          label="Active Suspension"
          onChange={(value) => void setFilters({ hasActiveSuspension: value })}
          trueLabel="Suspended"
          falseLabel="Not Suspended"
          value={filters.hasActiveSuspension ?? null}
        />

        <FilterInput
          debounceMs={300}
          disabled={isPending}
          label="Min Reliability Score"
          onChange={(value) =>
            void setFilters({
              reliabilityScoreMin: value !== "" ? Number(value) : null,
            })
          }
          placeholder="0"
          type="text"
          value={filters.reliabilityScoreMin?.toString() ?? ""}
        />

        <FilterInput
          debounceMs={300}
          disabled={isPending}
          label="Max Reliability Score"
          onChange={(value) =>
            void setFilters({
              reliabilityScoreMax: value !== "" ? Number(value) : null,
            })
          }
          placeholder="100"
          type="text"
          value={filters.reliabilityScoreMax?.toString() ?? ""}
        />

        <div className="sm:col-span-2">
          <FilterDateRangePicker
            disabled={isPending}
            label="Created"
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
        </div>
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
