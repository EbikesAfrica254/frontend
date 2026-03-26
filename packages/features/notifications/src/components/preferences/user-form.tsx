"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateUserPreferenceFormData,
  createUserPreferenceSchema,
} from "../../schemas/preference-schemas";
import { NotificationCategory, NotificationChannel } from "../../types/enums";

interface UserPreferenceFormProps {
  onSubmit: (data: CreateUserPreferenceFormData) => void | Promise<void>;
}

export function UserPreferenceForm({ onSubmit }: UserPreferenceFormProps) {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<CreateUserPreferenceFormData>({
    defaultValues: {
      category: undefined,
      channel: undefined,
      enabled: true,
    },
    resolver: zodResolver(createUserPreferenceSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Notification Preference</h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Category
            </label>
            <select
              id="category"
              {...register("category")}
              disabled={isSubmitting}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              aria-invalid={!!errors.category}
            >
              <option value="">Select a category...</option>
              <option value={NotificationCategory.MARKETING}>Marketing</option>
              <option value={NotificationCategory.OPERATIONAL}>
                Operational
              </option>
              <option value={NotificationCategory.SECURITY}>Security</option>
              <option value={NotificationCategory.TRANSACTIONAL}>
                Transactional
              </option>
            </select>
            {errors.category && (
              <p className="text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="channel" className="text-sm font-medium">
              Channel
            </label>
            <select
              id="channel"
              {...register("channel")}
              disabled={isSubmitting}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              aria-invalid={!!errors.channel}
            >
              <option value="">Select a channel...</option>
              <option value={NotificationChannel.EMAIL}>Email</option>
              <option value={NotificationChannel.SMS}>SMS</option>
              <option value={NotificationChannel.SSE}>SSE</option>
              <option value={NotificationChannel.WHATSAPP}>WhatsApp</option>
            </select>
            {errors.channel && (
              <p className="text-sm text-red-600">{errors.channel.message}</p>
            )}
          </div>
        </div>

        <Controller
          control={control}
          name="enabled"
          render={({ field }) => (
            <label className="flex items-center gap-2 text-sm font-medium">
              <input
                type="checkbox"
                checked={field.value}
                onChange={field.onChange}
                disabled={isSubmitting}
                className="h-4 w-4 rounded border-input"
              />
              Enabled
            </label>
          )}
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          {isSubmitting ? "Creating..." : "Create Preference"}
        </button>
      </div>
    </form>
  );
}
