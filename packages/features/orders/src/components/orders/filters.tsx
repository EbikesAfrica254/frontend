"use client";

import { useQueryStates } from "nuqs";
import { useTransition } from "react";
import { FilterDateRangePicker } from "@repo/ui/tables/filter-date-range-picker";
import { FilterInput } from "@repo/ui/tables/filter-input";
import { FilterSelect } from "@repo/ui/tables/filter-select";
import { ordersParamsParser } from "../../lib/orders-params-parser";
import { OrderStatus, OrderType } from "../../types/enums";
import React from "react";

const ORDER_STATUS_OPTIONS = Object.values(OrderStatus).map((status) => ({
  label: status.replace(/_/g, " "),
  value: status,
}));

const ORDER_TYPE_OPTIONS = Object.values(OrderType).map((type) => ({
  label: type.replace(/_/g, " "),
  value: type,
}));

const PAYMENT_VERIFIED_OPTIONS = [
  { label: "Yes", value: "true" },
  { label: "No", value: "false" },
];

export function OrderFilters() {
  const [isPending, startTransition] = useTransition();

  const [filters, setFilters] = useQueryStates(
    {
      agentId: ordersParamsParser.agentId,
      cancelledFromStatus: ordersParamsParser.cancelledFromStatus,
      createdDateFrom: ordersParamsParser.createdDateFrom,
      createdDateTo: ordersParamsParser.createdDateTo,
      customerId: ordersParamsParser.customerId,
      orderType: ordersParamsParser.orderType,
      paymentVerified: ordersParamsParser.paymentVerified,
      status: ordersParamsParser.status,
      updatedDateFrom: ordersParamsParser.updatedDateFrom,
      updatedDateTo: ordersParamsParser.updatedDateTo,
    },
    {
      shallow: false,
      startTransition,
    },
  );

  const handleClearFilters = () => {
    void setFilters({
      agentId: null,
      cancelledFromStatus: null,
      createdDateFrom: null,
      createdDateTo: null,
      customerId: null,
      orderType: null,
      paymentVerified: null,
      status: null,
      updatedDateFrom: null,
      updatedDateTo: null,
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
          label="Customer ID"
          onChange={(value) => void setFilters({ customerId: value || null })}
          placeholder="Search by customer..."
          value={filters.customerId ?? ""}
        />

        <FilterInput
          debounceMs={300}
          disabled={isPending}
          label="Agent ID"
          onChange={(value) => void setFilters({ agentId: value || null })}
          placeholder="Search by agent..."
          value={filters.agentId ?? ""}
        />

        <FilterSelect
          disabled={isPending}
          label="Order Type"
          onChange={(value) =>
            void setFilters({ orderType: (value as OrderType) || null })
          }
          options={ORDER_TYPE_OPTIONS}
          placeholder="Select type..."
          value={filters.orderType ?? ""}
        />

        <FilterSelect
          disabled={isPending}
          label="Status"
          onChange={(value) =>
            void setFilters({ status: (value as OrderStatus) || null })
          }
          options={ORDER_STATUS_OPTIONS}
          placeholder="Select status..."
          value={filters.status ?? ""}
        />

        <FilterSelect
          disabled={isPending}
          label="Cancelled From Status"
          onChange={(value) =>
            void setFilters({
              cancelledFromStatus: (value as OrderStatus) || null,
            })
          }
          options={ORDER_STATUS_OPTIONS}
          placeholder="Select status..."
          value={filters.cancelledFromStatus ?? ""}
        />

        <FilterSelect
          disabled={isPending}
          label="Payment Verified"
          onChange={(value) =>
            void setFilters({ paymentVerified: value || null })
          }
          options={PAYMENT_VERIFIED_OPTIONS}
          placeholder="Any"
          value={filters.paymentVerified ?? ""}
        />

        <FilterDateRangePicker
          disabled={isPending}
          label="Created Date"
          onChange={({ from, to }) =>
            void setFilters({
              createdDateFrom: from ? from.toISOString().split("T")[0] : null,
              createdDateTo: to ? to.toISOString().split("T")[0] : null,
            })
          }
          value={{
            from: filters.createdDateFrom
              ? new Date(filters.createdDateFrom)
              : null,
            to: filters.createdDateTo ? new Date(filters.createdDateTo) : null,
          }}
        />

        <FilterDateRangePicker
          disabled={isPending}
          label="Updated Date"
          onChange={({ from, to }) =>
            void setFilters({
              updatedDateFrom: from ? from.toISOString().split("T")[0] : null,
              updatedDateTo: to ? to.toISOString().split("T")[0] : null,
            })
          }
          value={{
            from: filters.updatedDateFrom
              ? new Date(filters.updatedDateFrom)
              : null,
            to: filters.updatedDateTo ? new Date(filters.updatedDateTo) : null,
          }}
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
