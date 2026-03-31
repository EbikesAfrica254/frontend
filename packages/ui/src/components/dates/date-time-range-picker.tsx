"use client";

import * as React from "react";
import { format, setHours, setMinutes, setSeconds, isSameDay } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "../../utilities";
import { Button } from "../primitives/button";
import { Calendar } from "../primitives/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../primitives/popover";
import { Separator } from "../primitives/separator";

export interface DateTimeRangePreset {
  label: string;
  range: () => { from: Date; to: Date };
}

export const DEFAULT_PRESETS: DateTimeRangePreset[] = [
  {
    label: "Last 1 hour",
    range: () => ({
      from: new Date(Date.now() - 60 * 60 * 1000),
      to: new Date(),
    }),
  },
  {
    label: "Last 24 hours",
    range: () => ({
      from: new Date(Date.now() - 24 * 60 * 60 * 1000),
      to: new Date(),
    }),
  },
  {
    label: "Last 7 days",
    range: () => ({
      from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      to: new Date(),
    }),
  },
  {
    label: "Last 30 days",
    range: () => ({
      from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      to: new Date(),
    }),
  },
  {
    label: "This month",
    range: () => {
      const now = new Date();
      return {
        from: new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0),
        to: new Date(),
      };
    },
  },
];

export interface DateTimeRangeValue {
  from: Date | null;
  to: Date | null;
}

export interface DateTimeRangePickerProps {
  value?: DateTimeRangeValue;
  onChange?: (range: DateTimeRangeValue) => void;
  placeholder?: string;
  disabled?: boolean;
  presets?: DateTimeRangePreset[];
  id?: string;
  className?: string;
}

function applyTime(date: Date, time: string): Date {
  const [h = 0, m = 0, s = 0] = time.split(":").map(Number);
  return setSeconds(setMinutes(setHours(date, h), m), s);
}

function toTimeString(date: Date | null): string {
  return date ? format(date, "HH:mm:ss") : "00:00:00";
}

export function DateTimeRangePicker({
  value,
  onChange,
  placeholder = "Pick a date & time range",
  disabled = false,
  presets = DEFAULT_PRESETS,
  id,
  className,
}: DateTimeRangePickerProps) {
  const [open, setOpen] = React.useState(false);

  // Internal draft state — only committed on Apply
  const [range, setRange] = React.useState<DateRange>({
    from: value?.from ?? undefined,
    to: value?.to ?? undefined,
  });
  const [fromTime, setFromTime] = React.useState(() =>
    toTimeString(value?.from ?? null),
  );
  const [toTime, setToTime] = React.useState(() =>
    toTimeString(value?.to ?? null),
  );

  // Sync draft when external value changes
  React.useEffect(() => {
    setRange({ from: value?.from ?? undefined, to: value?.to ?? undefined });
    setFromTime(toTimeString(value?.from ?? null));
    setToTime(toTimeString(value?.to ?? null));
  }, [value?.from, value?.to]);

  const isTimeRangeValid = React.useMemo(() => {
    if (!range.from || !range.to) return true;
    if (!isSameDay(range.from, range.to)) return true;
    return fromTime < toTime;
  }, [range.from, range.to, fromTime, toTime]);

  const canApply = !!range.from && !!range.to && isTimeRangeValid;

  const handlePreset = (preset: DateTimeRangePreset) => {
    const { from, to } = preset.range();
    setRange({ from, to });
    setFromTime(format(from, "HH:mm:ss"));
    setToTime(format(to, "HH:mm:ss"));
  };

  const handleApply = () => {
    if (!range.from || !range.to) return;
    onChange?.({
      from: applyTime(range.from, fromTime),
      to: applyTime(range.to, toTime),
    });
    setOpen(false);
  };

  const handleClear = () => {
    setRange({ from: undefined, to: undefined });
    setFromTime("00:00:00");
    setToTime("00:00:00");
    onChange?.({ from: null, to: null });
    setOpen(false);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      // Reset draft to committed value on dismiss
      setRange({ from: value?.from ?? undefined, to: value?.to ?? undefined });
      setFromTime(toTimeString(value?.from ?? null));
      setToTime(toTimeString(value?.to ?? null));
    }
    setOpen(next);
  };

  const displayLabel = React.useMemo(() => {
    if (!value?.from && !value?.to) return null;
    if (value.from && value.to) {
      return `${format(value.from, "MMM d, yyyy HH:mm:ss")} – ${format(value.to, "MMM d, yyyy HH:mm:ss")}`;
    }
    if (value.from) return `From ${format(value.from, "MMM d, yyyy HH:mm:ss")}`;
    return null;
  }, [value?.from, value?.to]);

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal",
            !displayLabel && "text-muted-foreground",
            className,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
          <span className="truncate">{displayLabel ?? placeholder}</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex">
          {/* Presets */}
          <div className="flex flex-col gap-1 border-r p-3">
            <p className="text-muted-foreground mb-1 px-2 text-xs font-medium uppercase tracking-wide">
              Presets
            </p>
            {presets.map((preset) => (
              <Button
                key={preset.label}
                variant="ghost"
                size="sm"
                className="justify-start font-normal"
                onClick={() => handlePreset(preset)}
              >
                {preset.label}
              </Button>
            ))}
          </div>

          {/* Calendar + time inputs */}
          <div className="flex flex-col">
            <Calendar
              mode="range"
              numberOfMonths={2}
              selected={range}
              onSelect={(r) =>
                setRange(r ?? { from: undefined, to: undefined })
              }
              captionLayout="dropdown"
              disabled={false}
            />

            <Separator />

            <div className="flex items-center gap-4 p-3">
              <div className="flex flex-1 flex-col gap-1">
                <label className="text-muted-foreground text-xs">
                  From time
                </label>
                <input
                  type="time"
                  step="1"
                  value={fromTime}
                  onChange={(e) => setFromTime(e.target.value)}
                  disabled={!range.from}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div className="flex flex-1 flex-col gap-1">
                <label className="text-muted-foreground text-xs">To time</label>
                <input
                  type="time"
                  step="1"
                  value={toTime}
                  onChange={(e) => setToTime(e.target.value)}
                  disabled={!range.to}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>

            {!isTimeRangeValid && (
              <p className="text-destructive px-3 pb-2 text-xs">
                End time must be after start time on the same day.
              </p>
            )}

            <Separator />

            <div className="flex items-center justify-end gap-2 p-3">
              <Button variant="ghost" size="sm" onClick={handleClear}>
                Clear
              </Button>
              <Button size="sm" onClick={handleApply} disabled={!canApply}>
                Apply
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
