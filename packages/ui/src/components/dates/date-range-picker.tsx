"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Button } from "../primitives/button";
import { Calendar } from "../primitives/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../primitives/popover";
import { cn } from "../../utilities";

export interface DateRangePickerProps {
  /** The selected date range */
  value?: {
    from?: Date | string | null;
    to?: Date | string | null;
  };
  /** Callback when date range changes */
  onChange?: (range: { from: Date | null; to: Date | null }) => void;
  /** Placeholder text when no date is selected */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** ID for the trigger button */
  id?: string;
  /** Additional class name for the trigger button */
  className?: string;
  /** Format string for displaying the dates (default: "MMM dd, yyyy") */
  dateFormat?: string;
  /** Number of months to display */
  numberOfMonths?: 1 | 2;
  /** Disable dates matching this function */
  disabledDates?: (date: Date) => boolean;
  /** Minimum selectable date */
  fromDate?: Date;
  /** Maximum selectable date */
  toDate?: Date;
  /** Caption layout for the calendar */
  captionLayout?: "dropdown" | "dropdown-months" | "dropdown-years" | "label";
  /** Cell size for the calendar */
  cellSize?: string;
}

export function DateRangePicker({
  value,
  onChange,
  placeholder = "Pick a date range",
  disabled = false,
  error = false,
  id,
  className,
  dateFormat = "MMM dd, yyyy",
  numberOfMonths = 2,
  disabledDates,
  fromDate,
  toDate,
  captionLayout = "dropdown",
}: DateRangePickerProps) {
  const dateRange: DateRange | undefined =
    value?.from || value?.to
      ? {
          from: value.from
            ? typeof value.from === "string"
              ? new Date(value.from)
              : value.from
            : undefined,
          to: value.to
            ? typeof value.to === "string"
              ? new Date(value.to)
              : value.to
            : undefined,
        }
      : undefined;

  const handleSelect = (range: DateRange | undefined) => {
    onChange?.({
      from: range?.from ?? null,
      to: range?.to ?? null,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !dateRange && "text-muted-foreground",
            error && "border-destructive",
            className,
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateRange?.from ? (
            dateRange.to ? (
              <>
                {format(dateRange.from, dateFormat)} -{" "}
                {format(dateRange.to, dateFormat)}
              </>
            ) : (
              format(dateRange.from, dateFormat)
            )
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={handleSelect}
          disabled={disabledDates}
          startMonth={fromDate}
          endMonth={toDate}
          numberOfMonths={numberOfMonths}
          captionLayout={captionLayout}
        />
      </PopoverContent>
    </Popover>
  );
}
