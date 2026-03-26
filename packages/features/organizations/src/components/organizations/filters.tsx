"use client";

import { useQueryStates } from "nuqs";
import React, { useTransition } from "react";
import { organizationParamsParser } from "../../lib/organizations-params-parser";
import {
  ComplianceStatus,
  OrganizationStatus,
  RegistrationType,
} from "../../types/enums";
import { FilterInput } from "@repo/ui/tables/filter-input";
import { FilterSelect } from "@repo/ui/tables/filter-select";
import { FilterDateRangePicker } from "@repo/ui/tables/filter-date-range-picker";

export function OrganizationFilters() {
  const [isPending, startTransition] = useTransition();

  const [filters, setFilters] = useQueryStates(
    {
      activatedDateFrom: organizationParamsParser.activatedDateFrom,
      activatedDateTo: organizationParamsParser.activatedDateTo,
      complianceStatus: organizationParamsParser.complianceStatus,
      createdDateFrom: organizationParamsParser.createdDateFrom,
      createdDateTo: organizationParamsParser.createdDateTo,
      legalName: organizationParamsParser.legalName,
      registrationType: organizationParamsParser.registrationType,
      status: organizationParamsParser.status,
    },
    {
      shallow: false,
      startTransition,
    },
  );

  const handleClearFilters = () => {
    void setFilters({
      activatedDateFrom: null,
      activatedDateTo: null,
      complianceStatus: null,
      createdDateFrom: null,
      createdDateTo: null,
      legalName: null,
      registrationType: null,
      status: null,
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
          label="Legal Name"
          onChange={(value) => void setFilters({ legalName: value || null })}
          placeholder="Search by legal name..."
          value={filters.legalName ?? ""}
        />

        <FilterSelect
          disabled={isPending}
          label="Status"
          onChange={(value) =>
            void setFilters({ status: (value as OrganizationStatus) || null })
          }
          options={[
            { label: "Active", value: OrganizationStatus.ACTIVE },
            { label: "Approved", value: OrganizationStatus.APPROVED },
            { label: "Deactivated", value: OrganizationStatus.DEACTIVATED },
            {
              label: "Pending Approval",
              value: OrganizationStatus.PENDING_APPROVAL,
            },
            { label: "Rejected", value: OrganizationStatus.REJECTED },
          ]}
          placeholder="Select status..."
          value={filters.status ?? ""}
        />

        <FilterSelect
          disabled={isPending}
          label="Compliance"
          onChange={(value) =>
            void setFilters({
              complianceStatus: (value as ComplianceStatus) || null,
            })
          }
          options={[
            { label: "Compliant", value: ComplianceStatus.COMPLIANT },
            { label: "Non-Compliant", value: ComplianceStatus.NON_COMPLIANT },
            { label: "Suspended", value: ComplianceStatus.SUSPENDED },
          ]}
          placeholder="Select compliance..."
          value={filters.complianceStatus ?? ""}
        />

        <FilterSelect
          disabled={isPending}
          label="Registration Type"
          onChange={(value) =>
            void setFilters({
              registrationType: (value as RegistrationType) || null,
            })
          }
          options={[
            {
              label: "Limited Liability Entity",
              value: RegistrationType.LIMITED_LIABILITY_ENTITY,
            },
            { label: "Partnership", value: RegistrationType.PARTNERSHIP },
            {
              label: "Sole Proprietor",
              value: RegistrationType.SOLE_PROPRIETOR,
            },
          ]}
          placeholder="Select type..."
          value={filters.registrationType ?? ""}
        />

        <div className="sm:col-span-2">
          <FilterDateRangePicker
            disabled={isPending}
            label="Created"
            onChange={({ from, to }) =>
              void setFilters({ createdDateFrom: from, createdDateTo: to })
            }
            value={{
              from: filters.createdDateFrom,
              to: filters.createdDateTo,
            }}
          />
        </div>

        <div className="sm:col-span-2">
          <FilterDateRangePicker
            disabled={isPending}
            label="Activated"
            onChange={({ from, to }) =>
              void setFilters({ activatedDateFrom: from, activatedDateTo: to })
            }
            value={{
              from: filters.activatedDateFrom,
              to: filters.activatedDateTo,
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
