"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "../primitives/button";
import { Calendar } from "../primitives/calendar";
import { Input } from "../primitives/input";
import { Popover, PopoverContent, PopoverTrigger } from "../primitives/popover";
import { cn } from "../../utilities";

export interface DateTimePickerProps {
  /** The selected date (with time) */
  value?: Date | string | null;
  /** Callback when date or time changes */
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
  /** Minimum selectable date */
  fromDate?: Date;
  /** Maximum selectable date */
  toDate?: Date;
  /** Caption layout for the calendar */
  captionLayout?: "dropdown" | "dropdown-months" | "dropdown-years" | "label";
}

export function DateTimePicker({
  value,
  onChange,
  placeholder = "Pick a date and time",
  disabled = false,
  error = false,
  id,
  className,
  fromDate,
  toDate,
  captionLayout = "dropdown",
}: DateTimePickerProps) {
  const selectedDate = value
    ? typeof value === "string"
      ? new Date(value)
      : value
    : undefined;

  const timeValue = selectedDate
    ? format(selectedDate, "HH:mm:ss")
    : "00:00:00";

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) {
      onChange?.(null);
      return;
    }
    const [hours = 0, minutes = 0, seconds = 0] = timeValue
      .split(":")
      .map(Number);
    date.setHours(hours, minutes, seconds, 0);
    onChange?.(date);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours = 0, minutes = 0, seconds = 0] = e.target.value
      .split(":")
      .map(Number);
    const updated = selectedDate ? new Date(selectedDate) : new Date();
    updated.setHours(hours, minutes, seconds, 0);
    onChange?.(updated);
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
            format(selectedDate, "PPP HH:mm:ss")
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          startMonth={fromDate}
          endMonth={toDate}
          captionLayout={captionLayout}
        />
        <div className="border-t p-3">
          <Input
            type="time"
            step="1"
            value={timeValue}
            onChange={handleTimeChange}
            disabled={disabled}
            className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
