"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import type { ActionResult, PaginatedResponse } from "@repo/shared/client";
import {
  createPreferredAgentSchema,
  type CreatePreferredAgentFormData,
} from "../../schemas/preferred-agents-schemas";
import type { AgentSummaryResponse } from "../../types/agents";
import { AgentSearch } from "../agents/search";

interface CreatePreferredAgentFormProps {
  organizationId: string;
  branchId?: string;
  onFetch: (
    query: string,
  ) => Promise<ActionResult<PaginatedResponse<AgentSummaryResponse>>>;
  onSubmit: (data: CreatePreferredAgentFormData) => void | Promise<void>;
}

export function CreatePreferredAgentForm({
  organizationId,
  branchId,
  onFetch,
  onSubmit,
}: CreatePreferredAgentFormProps) {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<CreatePreferredAgentFormData>({
    defaultValues: {
      agentId: "",
      branchId: branchId ?? undefined,
      notes: undefined,
      organizationId,
      priority: 1,
    },
    resolver: zodResolver(createPreferredAgentSchema),
  });

  const selectedAgentId = watch("agentId");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Agent <span className="text-red-500">*</span>
        </label>
        <AgentSearch
          disabled={isSubmitting}
          onFetch={onFetch}
          onValueChange={(id) =>
            setValue("agentId", id, { shouldValidate: true })
          }
          value={selectedAgentId}
        />
        {errors.agentId && (
          <p className="text-sm text-red-600">{errors.agentId.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="priority" className="text-sm font-medium">
          Priority <span className="text-red-500">*</span>
        </label>
        <input
          id="priority"
          type="number"
          min={1}
          {...register("priority", { valueAsNumber: true })}
          disabled={isSubmitting}
          placeholder="1"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          aria-invalid={!!errors.priority}
        />
        {errors.priority && (
          <p className="text-sm text-red-600">{errors.priority.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="notes" className="text-sm font-medium">
          Notes
        </label>
        <textarea
          id="notes"
          {...register("notes")}
          disabled={isSubmitting}
          placeholder="Reliable for fragile deliveries"
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
          {isSubmitting ? "Adding..." : "Add Preferred Agent"}
        </button>
      </div>
    </form>
  );
}
