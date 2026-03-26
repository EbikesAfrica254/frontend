"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
  suspendAgentSchema,
  liftSuspensionSchema,
  type SuspendAgentFormData,
  type LiftSuspensionFormData,
} from "../../schemas/suspensions-schemas";

interface SuspendAgentFormProps {
  onSubmit: (data: SuspendAgentFormData) => void | Promise<void>;
}

interface LiftSuspensionFormProps {
  onSubmit: (data: LiftSuspensionFormData) => void | Promise<void>;
}

export function SuspendAgentForm({ onSubmit }: SuspendAgentFormProps) {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<SuspendAgentFormData>({
    defaultValues: {
      expiresAt: undefined,
      notes: undefined,
      reason: "",
    },
    resolver: zodResolver(suspendAgentSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="reason" className="text-sm font-medium">
          Reason <span className="text-red-500">*</span>
        </label>
        <input
          id="reason"
          type="text"
          {...register("reason")}
          disabled={isSubmitting}
          placeholder="Multiple late deliveries reported by customers"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          aria-invalid={!!errors.reason}
        />
        {errors.reason && (
          <p className="text-sm text-red-600">{errors.reason.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="expiresAt" className="text-sm font-medium">
          Suspension Expires At
        </label>
        <input
          id="expiresAt"
          type="datetime-local"
          {...register("expiresAt")}
          disabled={isSubmitting}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <p className="text-xs text-muted-foreground">
          Leave empty for an indefinite suspension.
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="suspend-notes" className="text-sm font-medium">
          Notes
        </label>
        <textarea
          id="suspend-notes"
          {...register("notes")}
          disabled={isSubmitting}
          placeholder="Additional context for the suspension"
          rows={3}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-10 items-center justify-center rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground ring-offset-background transition-colors hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          {isSubmitting ? "Suspending..." : "Suspend Agent"}
        </button>
      </div>
    </form>
  );
}

export function LiftSuspensionForm({ onSubmit }: LiftSuspensionFormProps) {
  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
  } = useForm<LiftSuspensionFormData>({
    defaultValues: {
      notes: undefined,
    },
    resolver: zodResolver(liftSuspensionSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="lift-notes" className="text-sm font-medium">
          Notes
        </label>
        <textarea
          id="lift-notes"
          {...register("notes")}
          disabled={isSubmitting}
          placeholder="Issue resolved after agent retraining"
          rows={3}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          {isSubmitting ? "Lifting..." : "Lift Suspension"}
        </button>
      </div>
    </form>
  );
}
