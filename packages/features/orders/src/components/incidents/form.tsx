"use client";

import {
  ReportIncidentFormData,
  reportIncidentSchema,
} from "../../schemas/incident-schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IncidentType } from "../../types/enums";
import React from "react";

interface ReportIncidentFormProps {
  agentId: string;
  onSubmit: (data: ReportIncidentFormData) => void | Promise<void>;
}

export function ReportIncidentForm({
  agentId,
  onSubmit,
}: ReportIncidentFormProps) {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<ReportIncidentFormData>({
    defaultValues: {
      agentId,
      incidentType: undefined,
      lastKnownLatitude: undefined,
      lastKnownLongitude: undefined,
      notes: "",
    },
    resolver: zodResolver(reportIncidentSchema),
  });

  return (
    <form
      className="space-y-6"
      id="report-incident-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="incidentType" className="text-sm font-medium">
            Incident Type
          </label>
          <select
            id="incidentType"
            {...register("incidentType")}
            disabled={isSubmitting}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            aria-invalid={!!errors.incidentType}
          >
            <option value="">Select incident type...</option>
            <option value={IncidentType.ACCIDENT}>Accident</option>
            <option value={IncidentType.AGENT_DISAPPEARED}>
              Agent Disappeared
            </option>
            <option value={IncidentType.GOODS_DAMAGED}>Goods Damaged</option>
            <option value={IncidentType.GOODS_LOST}>Goods Lost</option>
            <option value={IncidentType.THEFT}>Theft</option>
          </select>
          {errors.incidentType && (
            <p className="text-sm text-red-600">
              {errors.incidentType.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="lastKnownLatitude" className="text-sm font-medium">
              Last Known Latitude
            </label>
            <input
              id="lastKnownLatitude"
              type="number"
              step="any"
              {...register("lastKnownLatitude", { valueAsNumber: true })}
              disabled={isSubmitting}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              aria-invalid={!!errors.lastKnownLatitude}
            />
            {errors.lastKnownLatitude && (
              <p className="text-sm text-red-600">
                {errors.lastKnownLatitude.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="lastKnownLongitude" className="text-sm font-medium">
              Last Known Longitude
            </label>
            <input
              id="lastKnownLongitude"
              type="number"
              step="any"
              {...register("lastKnownLongitude", { valueAsNumber: true })}
              disabled={isSubmitting}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              aria-invalid={!!errors.lastKnownLongitude}
            />
            {errors.lastKnownLongitude && (
              <p className="text-sm text-red-600">
                {errors.lastKnownLongitude.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="notes" className="text-sm font-medium">
            Notes
          </label>
          <textarea
            id="notes"
            {...register("notes")}
            disabled={isSubmitting}
            rows={3}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            aria-invalid={!!errors.notes}
          />
          {errors.notes && (
            <p className="text-sm text-red-600">{errors.notes.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          {isSubmitting ? "Reporting..." : "Report Incident"}
        </button>
      </div>
    </form>
  );
}
