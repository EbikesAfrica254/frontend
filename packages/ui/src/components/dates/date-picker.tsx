"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "../primitives/button";
import { Calendar } from "../primitives/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../primitives/popover";
import { cn } from "../../utilities";

export interface DatePickerProps {
  /** The selected date */
  value?: Date | string | null;
  /** Callback when date changes */
  onChange?: (date: Date | null) => void;
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
  /** Format string for displaying the date (default: "PPP") */
  dateFormat?: string;
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

export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  disabled = false,
  error = false,
  id,
  className,
  dateFormat = "PPP",
  disabledDates,
  fromDate,
  toDate,
  captionLayout = "dropdown",
}: DatePickerProps) {
  const selectedDate = value
    ? typeof value === "string"
      ? new Date(value)
      : value
    : undefined;

  const handleSelect = (date: Date | undefined) => {
    onChange?.(date ?? null);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground",
            error && "border-destructive",
            className,
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? (
            format(selectedDate, dateFormat)
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          disabled={disabledDates}
          startMonth={fromDate}
          endMonth={toDate}
          captionLayout={captionLayout}
        />
      </PopoverContent>
    </Popover>
  );
}
