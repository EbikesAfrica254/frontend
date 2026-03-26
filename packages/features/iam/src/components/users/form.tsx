"use client";

import {
  BRANCH_ROLES,
  CreateUserFormData,
  createUserSchema,
} from "../../schemas/user-schemas";
import { Controller, useForm } from "react-hook-form";
import { UserRole } from "../../types/enums";
import React from "react";
import { useAvailableRoles } from "../../hooks/use-available-roles";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhoneInput } from "@repo/ui/inputs/phone-input";

interface UserFormProps {
  activeBranchId?: string;
  activeBranchName?: string;
  activeOrganizationId: string;
  activeOrganizationName: string;
  onSubmit: (data: CreateUserFormData) => void | Promise<void>;
  userRoles: string[];
}

export function UserForm({
  activeBranchId,
  activeBranchName,
  activeOrganizationId,
  activeOrganizationName,
  onSubmit,
  userRoles,
}: UserFormProps) {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    watch,
  } = useForm<CreateUserFormData>({
    defaultValues: {
      branchId: activeBranchId,
      branchName: activeBranchName,
      countryCode: "KE",
      email: "",
      firstName: "",
      lastName: "",
      organizationId: activeOrganizationId,
      organizationName: activeOrganizationName,
      phoneNumber: "",
      role: undefined,
      username: "",
    },
    resolver: zodResolver(createUserSchema),
  });

  const selectedRole = watch("role");
  const showBranchFields = selectedRole
    ? BRANCH_ROLES.includes(selectedRole as UserRole)
    : false;

  const { availableRoles, isBranchAdmin, isSystemAdmin } = useAvailableRoles(
    userRoles,
    activeOrganizationId,
    activeBranchId,
    activeOrganizationId,
    activeBranchId,
  );

  const branchRoleOptions = availableRoles.filter((r) => r.isBranchRole);
  const organizationRoleOptions = availableRoles.filter(
    (r) => r.isOrganizationRole,
  );

  const canEditOrganization = isSystemAdmin;
  const canEditBranch = !isBranchAdmin;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Personal Information</h3>

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
          <label htmlFor="username" className="text-sm font-medium">
            Username
          </label>
          <input
            id="username"
            type="text"
            {...register("username")}
            disabled={isSubmitting}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            aria-invalid={!!errors.username}
          />
          {errors.username && (
            <p className="text-sm text-red-600">{errors.username.message}</p>
          )}
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
                  defaultCountry="KE"
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
        <h3 className="text-lg font-medium">Role Assignment</h3>

        <div className="space-y-2">
          <label htmlFor="role" className="text-sm font-medium">
            Role
          </label>
          <select
            id="role"
            {...register("role")}
            disabled={isSubmitting}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            aria-invalid={!!errors.role}
          >
            <option value="">Select a role...</option>
            {organizationRoleOptions.length > 0 && (
              <optgroup label="Organization Roles">
                {organizationRoleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </optgroup>
            )}
            {branchRoleOptions.length > 0 && (
              <optgroup label="Branch Roles">
                {branchRoleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </optgroup>
            )}
          </select>
          {errors.role && (
            <p className="text-sm text-red-600">{errors.role.message}</p>
          )}
        </div>
      </div>

      {showBranchFields && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Branch Assignment</h3>

          <div className="space-y-2">
            <label htmlFor="organizationName" className="text-sm font-medium">
              Organization
            </label>
            <input
              id="organizationName"
              type="text"
              {...register("organizationName")}
              disabled={isSubmitting || !canEditOrganization}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              aria-invalid={!!errors.organizationName}
            />
            {errors.organizationName && (
              <p className="text-sm text-red-600">
                {errors.organizationName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="branchName" className="text-sm font-medium">
              Branch
            </label>
            <input
              id="branchName"
              type="text"
              {...register("branchName")}
              disabled={isSubmitting || !canEditBranch}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              aria-invalid={!!errors.branchName}
            />
            {errors.branchName && (
              <p className="text-sm text-red-600">
                {errors.branchName.message}
              </p>
            )}
          </div>

          {(errors.branchId || errors.organizationId) && (
            <div className="rounded-md bg-red-50 p-3">
              <p className="text-sm text-red-600">
                {errors.branchId?.message || errors.organizationId?.message}
              </p>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-end gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          {isSubmitting ? "Creating..." : "Create User"}
        </button>
      </div>
    </form>
  );
}
