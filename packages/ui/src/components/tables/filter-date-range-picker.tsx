"use client";

import React from "react";
import { DateRangePicker } from "../dates/date-range-picker";

interface FilterDateRangePickerProps {
  disabled?: boolean;
  label: string;
  onChange: (range: { from: Date | null; to: Date | null }) => void;
  placeholder?: string;
  value?: {
    from?: Date | string | null;
    to?: Date | string | null;
  };
  fromDate?: Date;
  toDate?: Date;
}

export function FilterDateRangePicker({
  disabled = false,
  label,
  onChange,
  placeholder = "Pick a date range",
  value,
  fromDate,
  toDate,
}: FilterDateRangePickerProps) {
  const id = `filter-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
      <DateRangePicker
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        fromDate={fromDate}
        toDate={toDate}
        numberOfMonths={1}
        captionLayout="dropdown"
      />
    </div>
  );
}
