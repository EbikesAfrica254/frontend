"use client";

import React from "react";
import { DatePicker } from "../dates/date-picker";

interface FilterDatePickerProps {
  disabled?: boolean;
  label: string;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  value?: Date | string | null;
  fromDate?: Date;
  toDate?: Date;
}

export function FilterDatePicker({
  disabled = false,
  label,
  onChange,
  placeholder = "Pick a date",
  value,
  fromDate,
  toDate,
}: FilterDatePickerProps) {
  const id = `filter-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
      <DatePicker
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        fromDate={fromDate}
        toDate={toDate}
        captionLayout="dropdown"
      />
    </div>
  );
}
