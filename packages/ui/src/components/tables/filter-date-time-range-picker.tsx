"use client";

import React from "react";
import {
  DateTimeRangePicker,
  DateTimeRangePickerProps,
  DateTimeRangeValue,
} from "../dates/date-time-range-picker";

interface FilterDateTimeRangePickerProps extends Omit<
  DateTimeRangePickerProps,
  "onChange"
> {
  label: string;
  onChange: (range: DateTimeRangeValue) => void;
}

export function FilterDateTimeRangePicker({
  label,
  disabled = false,
  onChange,
  ...props
}: FilterDateTimeRangePickerProps) {
  const id = `filter-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
      <DateTimeRangePicker
        id={id}
        disabled={disabled}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}
