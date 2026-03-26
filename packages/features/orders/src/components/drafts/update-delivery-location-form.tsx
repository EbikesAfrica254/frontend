"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DraftDetailResponse } from "../../types/drafts";
import React from "react";
import {
  UpdateDeliveryLocationFormData,
  updateDeliveryLocationSchema,
} from "../../schemas/draft-schemas";

interface UpdateDeliveryLocationFormProps {
  draft: DraftDetailResponse;
  onSubmit: (data: UpdateDeliveryLocationFormData) => void | Promise<void>;
}

export function UpdateDeliveryLocationForm({
  draft,
  onSubmit,
}: UpdateDeliveryLocationFormProps) {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<UpdateDeliveryLocationFormData>({
    defaultValues: {
      deliveryAddress: draft.deliveryAddress ?? "",
      deliveryLatitude: draft.deliveryLatitude ?? 0,
      deliveryLongitude: draft.deliveryLongitude ?? 0,
    },
    resolver: zodResolver(updateDeliveryLocationSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Delivery Location</h3>

        <div className="space-y-2">
          <label htmlFor="deliveryAddress" className="text-sm font-medium">
            Address
          </label>
          <input
            id="deliveryAddress"
            type="text"
            {...register("deliveryAddress")}
            disabled={isSubmitting}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            aria-invalid={!!errors.deliveryAddress}
          />
          {errors.deliveryAddress && (
            <p className="text-sm text-red-600">
              {errors.deliveryAddress.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="deliveryLatitude" className="text-sm font-medium">
              Latitude
            </label>
            <input
              id="deliveryLatitude"
              type="number"
              step="any"
              {...register("deliveryLatitude", { valueAsNumber: true })}
              disabled={isSubmitting}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              aria-invalid={!!errors.deliveryLatitude}
            />
            {errors.deliveryLatitude && (
              <p className="text-sm text-red-600">
                {errors.deliveryLatitude.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="deliveryLongitude" className="text-sm font-medium">
              Longitude
            </label>
            <input
              id="deliveryLongitude"
              type="number"
              step="any"
              {...register("deliveryLongitude", { valueAsNumber: true })}
              disabled={isSubmitting}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              aria-invalid={!!errors.deliveryLongitude}
            />
            {errors.deliveryLongitude && (
              <p className="text-sm text-red-600">
                {errors.deliveryLongitude.message}
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
          {isSubmitting ? "Saving..." : "Save Location"}
        </button>
      </div>
    </form>
  );
}
