"use client";

import {
  UpdateUserFormData,
  updateUserSchema,
} from "../../schemas/user-schemas";
import { Controller, useForm } from "react-hook-form";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhoneInput } from "@repo/ui/inputs/phone-input";
import { UserExtensionResponse } from "../../types/users";
import { Badge } from "@repo/ui/primitives/badge";
import { UserStatus } from "../../types/enums";

interface UserDetailFormProps {
  user: UserExtensionResponse;
  onSubmit: (data: UpdateUserFormData) => void | Promise<void>;
}

export function UserDetailForm({ user, onSubmit }: UserDetailFormProps) {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<UpdateUserFormData>({
    defaultValues: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber || "",
      status: user.status,
    },
    resolver: zodResolver(updateUserSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Personal Information</h3>

        {/* Username - Read-Only */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Username
          </label>
          <div className="flex h-10 items-center rounded-md border border-input bg-muted px-3 py-2">
            <span className="text-sm">{user.username}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="firstName" className="text-sm font-medium">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              {...register("firstName")}
              disabled={isSubmitting}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              aria-invalid={!!errors.firstName}
            />
            {errors.firstName && (
              <p className="text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="lastName" className="text-sm font-medium">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              {...register("lastName")}
              disabled={isSubmitting}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              aria-invalid={!!errors.lastName}
            />
            {errors.lastName && (
              <p className="text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            disabled={isSubmitting}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Country Code - Read-Only */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Country
          </label>
          <div className="flex h-10 items-center rounded-md border border-input bg-muted px-3 py-2">
            <Badge variant="secondary">{user.countryCode}</Badge>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="phoneNumber" className="text-sm font-medium">
            Phone Number
          </label>
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field, fieldState }) => (
              <>
                <PhoneInput
                  {...field}
                  id="phoneNumber"
                  placeholder="Enter phone number"
                  defaultCountry={user.countryCode as any}
                  disabled={isSubmitting}
                  aria-invalid={!!fieldState.error}
                />
                {fieldState.error && (
                  <p className="text-sm text-red-600">
                    {fieldState.error.message}
                  </p>
                )}
              </>
            )}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Status</h3>

        <div className="space-y-2">
          <label htmlFor="status" className="text-sm font-medium">
            User Status
          </label>
          <select
            id="status"
            {...register("status")}
            disabled={isSubmitting}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            aria-invalid={!!errors.status}
          >
            <option value={UserStatus.ACTIVE}>Active</option>
            <option value={UserStatus.INACTIVE}>Inactive</option>
            <option value={UserStatus.DELETED}>Deleted</option>
          </select>
          {errors.status && (
            <p className="text-sm text-red-600">{errors.status.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
