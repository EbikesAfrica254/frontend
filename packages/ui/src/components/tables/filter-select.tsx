"use client";

import React from "react";

interface FilterOption {
    label: string;
    value: string;
}

interface FilterSelectProps {
    disabled?: boolean;
    label: string;
    onChange: (value: string) => void;
    options: FilterOption[];
    placeholder?: string;
    value: string;
}

export function FilterSelect({
                                 disabled = false,
                                 label,
                                 onChange,
                                 options,
                                 placeholder = "Select...",
                                 value,
                             }: FilterSelectProps) {
    const handleChange = (newValue: string) => {
        onChange(newValue);
    };

    const handleClear = () => {
        onChange("");
    };

    const hasValue = value.length > 0;

    return (
        <div className="space-y-2">
            <label
                htmlFor={`filter-${label.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                {label}
            </label>
            <div className="relative">
                <select
                    id={`filter-${label.toLowerCase().replace(/\s+/g, "-")}`}
                    value={value}
                    onChange={(e) => handleChange(e.target.value)}
                    disabled={disabled}
                    className="flex h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label={label}
                >
                    <option value="">{placeholder}</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
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
                        className="text-muted-foreground"
                    >
                        <path d="m6 9 6 6 6-6"/>
                    </svg>
                </div>

                {hasValue && !disabled && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-9 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
                            <circle cx="12" cy="12" r="10"/>
                            <path d="m15 9-6 6"/>
                            <path d="m9 9 6 6"/>
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}
