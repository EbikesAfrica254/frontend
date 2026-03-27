"use client";

import React from "react";
import { useEffect, useState } from "react";

interface FilterInputProps {
  debounceMs?: number;
  disabled?: boolean;
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "email" | "tel" | "search";
  value: string;
}

export function FilterInput({
  debounceMs = 0,
  disabled = false,
  label,
  onChange,
  placeholder,
  type = "text",
  value,
}: FilterInputProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (debounceMs === 0) {
      return;
    }

    const timeoutId = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [localValue, debounceMs, onChange, value]);

  const handleChange = (newValue: string) => {
    setLocalValue(newValue);

    if (debounceMs === 0) {
      onChange(newValue);
    }
  };

  const handleClear = () => {
    setLocalValue("");
    onChange("");
  };

  const hasValue = localValue.length > 0;

  return (
    <div className="space-y-2">
      <label
        htmlFor={`filter-${label.toLowerCase().replace(/\s+/g, "-")}`}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={`filter-${label.toLowerCase().replace(/\s+/g, "-")}`}
          type={type}
          placeholder={placeholder}
          value={localValue}
          onChange={(e) => handleChange(e.target.value)}
          disabled={disabled}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={label}
        />
        {hasValue && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label={`Clear ${label.toLowerCase()}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m15 9-6 6" />
              <path d="m9 9 6 6" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
