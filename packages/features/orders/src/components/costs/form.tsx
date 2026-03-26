"use client";

import {
  AdjustCostFormData,
  adjustCostSchema,
} from "../../schemas/cost-adjustment-schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";

interface AdjustCostFormProps {
  currency?: string;
  onSubmit: (data: AdjustCostFormData) => void | Promise<void>;
}

export function AdjustCostForm({
  currency = "KES",
  onSubmit,
}: AdjustCostFormProps) {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<AdjustCostFormData>({
    defaultValues: {
      currency,
      reason: "",
      revisedAmount: 0,
    },
    resolver: zodResolver(adjustCostSchema),
  });

  return (
    <form
      className="space-y-6"
      id="adjust-cost-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="revisedAmount" className="text-sm font-medium">
            Revised Amount
          </label>
          <input
            id="revisedAmount"
            type="number"
            step="any"
            {...register("revisedAmount", { valueAsNumber: true })}
            disabled={isSubmitting}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            aria-invalid={!!errors.revisedAmount}
          />
          {errors.revisedAmount && (
            <p className="text-sm text-red-600">
              {errors.revisedAmount.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="reason" className="text-sm font-medium">
            Reason
          </label>
          <textarea
            id="reason"
            {...register("reason")}
            disabled={isSubmitting}
            rows={3}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            aria-invalid={!!errors.reason}
          />
          {errors.reason && (
            <p className="text-sm text-red-600">{errors.reason.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Adjust Cost"}
        </button>
      </div>
    </form>
  );
}
