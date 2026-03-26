"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  updateBranchSchema,
  type UpdateBranchFormData,
} from "../../../schemas/branch-schemas";
import type { BranchResponse } from "../../../types/branches";
import { OperatingHoursForm } from "./operating-hours-form";

interface UpdateBranchFormProps {
  branch: BranchResponse;
  onSubmit: (data: UpdateBranchFormData) => void | Promise<void>;
}

export function UpdateBranchForm({ branch, onSubmit }: UpdateBranchFormProps) {
  const methods = useForm<UpdateBranchFormData>({
    defaultValues: {
      address: {
        city: branch.address.city,
        country: branch.address.country,
        latitude: branch.address.latitude,
        longitude: branch.address.longitude,
        postalCode: branch.address.postalCode,
        streetAddress: branch.address.streetAddress,
      },
      branchName: branch.branchName,
      displayName: branch.displayName,
      email: branch.email,
      operatingHours: branch.operatingHours ?? [],
      phoneNumber: branch.phoneNumber,
    },
    resolver: zodResolver(updateBranchSchema),
  });

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Branch Details</h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="branchName" className="text-sm font-medium">
                Branch Name
              </label>
              <input
                id="branchName"
                type="text"
                {...register("branchName")}
                disabled={isSubmitting}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                aria-invalid={!!errors.branchName}
              />
              {errors.branchName && (
                <p className="text-sm text-red-600">
                  {errors.branchName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="displayName" className="text-sm font-medium">
                Display Name
              </label>
              <input
                id="displayName"
                type="text"
                {...register("displayName")}
                disabled={isSubmitting}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                aria-invalid={!!errors.displayName}
              />
              {errors.displayName && (
                <p className="text-sm text-red-600">
                  {errors.displayName.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                disabled={isSubmitting}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="phoneNumber" className="text-sm font-medium">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                type="tel"
                {...register("phoneNumber")}
                disabled={isSubmitting}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                aria-invalid={!!errors.phoneNumber}
              />
              {errors.phoneNumber && (
                <p className="text-sm text-red-600">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Branch Address</h3>

          <div className="space-y-2">
            <label htmlFor="streetAddress" className="text-sm font-medium">
              Street Address
            </label>
            <input
              id="streetAddress"
              type="text"
              {...register("address.streetAddress")}
              disabled={isSubmitting}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              aria-invalid={!!errors.address?.streetAddress}
            />
            {errors.address?.streetAddress && (
              <p className="text-sm text-red-600">
                {errors.address.streetAddress.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="city" className="text-sm font-medium">
                City
              </label>
              <input
                id="city"
                type="text"
                {...register("address.city")}
                disabled={isSubmitting}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                aria-invalid={!!errors.address?.city}
              />
              {errors.address?.city && (
                <p className="text-sm text-red-600">
                  {errors.address.city.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="country" className="text-sm font-medium">
                Country
              </label>
              <input
                id="country"
                type="text"
                {...register("address.country")}
                disabled={isSubmitting}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                aria-invalid={!!errors.address?.country}
              />
              {errors.address?.country && (
                <p className="text-sm text-red-600">
                  {errors.address.country.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <label htmlFor="postalCode" className="text-sm font-medium">
                Postal Code
              </label>
              <input
                id="postalCode"
                type="text"
                {...register("address.postalCode")}
                disabled={isSubmitting}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="latitude" className="text-sm font-medium">
                Latitude
              </label>
              <input
                id="latitude"
                type="number"
                step="any"
                {...register("address.latitude", { valueAsNumber: true })}
                disabled={isSubmitting}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                aria-invalid={!!errors.address?.latitude}
              />
              {errors.address?.latitude && (
                <p className="text-sm text-red-600">
                  {errors.address.latitude.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="longitude" className="text-sm font-medium">
                Longitude
              </label>
              <input
                id="longitude"
                type="number"
                step="any"
                {...register("address.longitude", { valueAsNumber: true })}
                disabled={isSubmitting}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                aria-invalid={!!errors.address?.longitude}
              />
              {errors.address?.longitude && (
                <p className="text-sm text-red-600">
                  {errors.address.longitude.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <OperatingHoursForm disabled={isSubmitting} />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
