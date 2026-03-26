"use client";

import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { DayOfWeek } from "../../../types/enums";
import type {
  CreateBranchFormData,
  UpdateBranchFormData,
} from "../../../schemas/branch-schemas";

type OperatingHoursFormData = CreateBranchFormData | UpdateBranchFormData;

interface OperatingHoursFormProps {
  disabled?: boolean;
}

export function OperatingHoursForm({
  disabled = false,
}: OperatingHoursFormProps) {
  const {
    control,
    formState: { errors },
    register,
  } = useFormContext<OperatingHoursFormData>();

  const { append, fields, remove } = useFieldArray({
    control,
    name: "operatingHours",
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Operating Hours</h3>
        <button
          type="button"
          onClick={() =>
            append({
              closes: "17:00",
              dayOfWeek: DayOfWeek.MONDAY,
              opens: "08:00",
            })
          }
          disabled={disabled}
          className="inline-flex h-8 items-center justify-center rounded-md border border-input bg-background px-3 text-xs font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          Add Day
        </button>
      </div>

      {fields.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No operating hours set. Add days to configure the schedule.
        </p>
      )}

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="grid grid-cols-1 gap-4 rounded-md border p-4 sm:grid-cols-4"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium">Day</label>
            <select
              {...register(`operatingHours.${index}.dayOfWeek`)}
              disabled={disabled}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {Object.values(DayOfWeek).map((day) => (
                <option key={day} value={day}>
                  {day.charAt(0) + day.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
            {errors.operatingHours?.[index]?.dayOfWeek && (
              <p className="text-sm text-red-600">
                {errors.operatingHours[index].dayOfWeek.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Opens</label>
            <input
              type="time"
              {...register(`operatingHours.${index}.opens`)}
              disabled={disabled}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              aria-invalid={!!errors.operatingHours?.[index]?.opens}
            />
            {errors.operatingHours?.[index]?.opens && (
              <p className="text-sm text-red-600">
                {errors.operatingHours[index].opens.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Closes</label>
            <input
              type="time"
              {...register(`operatingHours.${index}.closes`)}
              disabled={disabled}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              aria-invalid={!!errors.operatingHours?.[index]?.closes}
            />
            {errors.operatingHours?.[index]?.closes && (
              <p className="text-sm text-red-600">
                {errors.operatingHours[index].closes.message}
              </p>
            )}
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={() => remove(index)}
              disabled={disabled}
              className="inline-flex h-10 items-center justify-center rounded-md border border-destructive px-3 text-sm font-medium text-destructive ring-offset-background transition-colors hover:bg-destructive hover:text-destructive-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
