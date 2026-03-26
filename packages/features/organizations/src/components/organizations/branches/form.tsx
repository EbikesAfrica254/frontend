"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  type CreateBranchFormData,
  createBranchSchema,
} from "../../../schemas/branch-schemas";
import { OperatingHoursForm } from "./operating-hours-form";

interface CreateBranchFormProps {
  onSubmit: (data: CreateBranchFormData) => void | Promise<void>;
}

export function CreateBranchForm({ onSubmit }: CreateBranchFormProps) {
  const methods = useForm<CreateBranchFormData>({
    defaultValues: {
      address: {
        city: "",
        country: "Kenya",
        streetAddress: "",
      },
      branchName: "",
      displayName: "",
      email: "",
      operatingHours: [],
      phoneNumber: "",
    },
    resolver: zodResolver(createBranchSchema),
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
                Branch Name <span className="text-red-500">*</span>
              </label>
              <input
                id="branchName"
                type="text"
                {...register("branchName")}
                disabled={isSubmitting}
                placeholder="DOWNTOWN"
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
                Display Name <span className="text-red-500">*</span>
              </label>
              <input
                id="displayName"
                type="text"
                {...register("displayName")}
                disabled={isSubmitting}
                placeholder="Downtown Branch"
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
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                disabled={isSubmitting}
                placeholder="downtown@example.com"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="phoneNumber" className="text-sm font-medium">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                id="phoneNumber"
                type="tel"
                {...register("phoneNumber")}
                disabled={isSubmitting}
                placeholder="+254712345678"
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
              Street Address <span className="text-red-500">*</span>
            </label>
            <input
              id="streetAddress"
              type="text"
              {...register("address.streetAddress")}
              disabled={isSubmitting}
              placeholder="123 Kimathi Street"
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
                City <span className="text-red-500">*</span>
              </label>
              <input
                id="city"
                type="text"
                {...register("address.city")}
                disabled={isSubmitting}
                placeholder="Nairobi"
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
                Country <span className="text-red-500">*</span>
              </label>
              <input
                id="country"
                type="text"
                {...register("address.country")}
                disabled={isSubmitting}
                placeholder="Kenya"
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
                placeholder="00100"
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
                placeholder="-1.286389"
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
                placeholder="36.817223"
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
            {isSubmitting ? "Creating..." : "Create Branch"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
