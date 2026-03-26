"use client";

import { RecordTipFormData, recordTipSchema } from "../../schemas/tip-schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";

interface RecordTipFormProps {
  currency?: string;
  onSubmit: (data: RecordTipFormData) => void | Promise<void>;
}

export function RecordTipForm({
  currency = "KES",
  onSubmit,
}: RecordTipFormProps) {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<RecordTipFormData>({
    defaultValues: {
      amount: 0,
      currency,
      percentage: undefined,
    },
    resolver: zodResolver(recordTipSchema),
  });

  return (
    <form
      className="space-y-6"
      id="record-tip-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="amount" className="text-sm font-medium">
              Amount
            </label>
            <input
              id="amount"
              type="number"
              step="any"
              {...register("amount", { valueAsNumber: true })}
              disabled={isSubmitting}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              aria-invalid={!!errors.amount}
            />
            {errors.amount && (
              <p className="text-sm text-red-600">{errors.amount.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="percentage" className="text-sm font-medium">
              Percentage{" "}
              <span className="text-muted-foreground font-normal">
                (optional)
              </span>
            </label>
            <input
              id="percentage"
              type="number"
              step="any"
              {...register("percentage", {
                setValueAs: (v) =>
                  v === "" || v === null ? undefined : Number(v),
              })}
              disabled={isSubmitting}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              aria-invalid={!!errors.percentage}
            />
            {errors.percentage && (
              <p className="text-sm text-red-600">
                {errors.percentage.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          {isSubmitting ? "Recording..." : "Record Tip"}
        </button>
      </div>
    </form>
  );
}
