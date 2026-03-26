"use client";

import {
  CreateOrderFormData,
  createOrderSchema,
} from "../../schemas/order-schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderType } from "../../types/enums";
import React from "react";

interface CreateOrderFormProps {
  branchId: string;
  currency?: string;
  customerId: string;
  organizationId: string;
  onSubmit: (data: CreateOrderFormData) => void | Promise<void>;
}

export function CreateOrderForm({
  branchId,
  currency = "KES",
  customerId,
  organizationId,
  onSubmit,
}: CreateOrderFormProps) {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<CreateOrderFormData>({
    defaultValues: {
      branchId,
      currency,
      customerId,
      deliveryLocation: { address: "", latitude: 0, longitude: 0 },
      items: [],
      orderType: OrderType.EXPLICIT,
      organizationId,
      pickupLocation: { address: "", latitude: 0, longitude: 0 },
    },
    resolver: zodResolver(createOrderSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Pickup Location</h3>

        <div className="space-y-2">
          <label htmlFor="pickupAddress" className="text-sm font-medium">
            Address
          </label>
          <input
            id="pickupAddress"
            type="text"
            {...register("pickupLocation.address")}
            disabled={isSubmitting}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            aria-invalid={!!errors.pickupLocation?.address}
          />
          {errors.pickupLocation?.address && (
            <p className="text-sm text-red-600">
              {errors.pickupLocation.address.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="pickupLatitude" className="text-sm font-medium">
              Latitude
            </label>
            <input
              id="pickupLatitude"
              type="number"
              step="any"
              {...register("pickupLocation.latitude", { valueAsNumber: true })}
              disabled={isSubmitting}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              aria-invalid={!!errors.pickupLocation?.latitude}
            />
            {errors.pickupLocation?.latitude && (
              <p className="text-sm text-red-600">
                {errors.pickupLocation.latitude.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="pickupLongitude" className="text-sm font-medium">
              Longitude
            </label>
            <input
              id="pickupLongitude"
              type="number"
              step="any"
              {...register("pickupLocation.longitude", { valueAsNumber: true })}
              disabled={isSubmitting}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              aria-invalid={!!errors.pickupLocation?.longitude}
            />
            {errors.pickupLocation?.longitude && (
              <p className="text-sm text-red-600">
                {errors.pickupLocation.longitude.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Delivery Location</h3>

        <div className="space-y-2">
          <label htmlFor="deliveryAddress" className="text-sm font-medium">
            Address
          </label>
          <input
            id="deliveryAddress"
            type="text"
            {...register("deliveryLocation.address")}
            disabled={isSubmitting}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            aria-invalid={!!errors.deliveryLocation?.address}
          />
          {errors.deliveryLocation?.address && (
            <p className="text-sm text-red-600">
              {errors.deliveryLocation.address.message}
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
              {...register("deliveryLocation.latitude", {
                valueAsNumber: true,
              })}
              disabled={isSubmitting}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              aria-invalid={!!errors.deliveryLocation?.latitude}
            />
            {errors.deliveryLocation?.latitude && (
              <p className="text-sm text-red-600">
                {errors.deliveryLocation.latitude.message}
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
              {...register("deliveryLocation.longitude", {
                valueAsNumber: true,
              })}
              disabled={isSubmitting}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              aria-invalid={!!errors.deliveryLocation?.longitude}
            />
            {errors.deliveryLocation?.longitude && (
              <p className="text-sm text-red-600">
                {errors.deliveryLocation.longitude.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Order Details</h3>

        <div className="space-y-2">
          <label htmlFor="orderType" className="text-sm font-medium">
            Order Type
          </label>
          <select
            id="orderType"
            {...register("orderType")}
            disabled={isSubmitting}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            aria-invalid={!!errors.orderType}
          >
            <option value={OrderType.BATCH_ITEM}>Batch Item</option>
            <option value={OrderType.EXPLICIT}>Explicit</option>
            <option value={OrderType.SCHEDULED}>Scheduled</option>
          </select>
          {errors.orderType && (
            <p className="text-sm text-red-600">{errors.orderType.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          {isSubmitting ? "Creating..." : "Create Order"}
        </button>
      </div>
    </form>
  );
}
