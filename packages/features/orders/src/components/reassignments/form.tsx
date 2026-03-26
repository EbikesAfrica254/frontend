"use client";

import {
  InitiateReassignmentFormData,
  initiateReassignmentSchema,
} from "../../schemas/reassignment-schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";

interface InitiateReassignmentFormProps {
  onSubmit: (data: InitiateReassignmentFormData) => void | Promise<void>;
}

export function InitiateReassignmentForm({
  onSubmit,
}: InitiateReassignmentFormProps) {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<InitiateReassignmentFormData>({
    defaultValues: {
      reason: "",
    },
    resolver: zodResolver(initiateReassignmentSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="reason" className="text-sm font-medium">
            Reassignment Reason
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
          {isSubmitting ? "Initiating..." : "Initiate Reassignment"}
        </button>
      </div>
    </form>
  );
}
