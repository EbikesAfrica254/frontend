"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/primitives/button";
import { Checkbox } from "@repo/ui/primitives/checkbox";
import React from "react";
import {
  CreateMembershipFormData,
  createMembershipSchema,
} from "../../schemas/membership-schemas";
import { ActionResult, PaginatedResponse, UserRole } from "@repo/shared/client";
import {
  BranchSummaryResponse,
  OrganizationBranchSearch,
  OrganizationSearch,
  OrganizationSummaryResponse,
} from "@repo/features-organizations/client";
import { roleLabels } from "../../utilities/role-helpers";

interface MembershipFormProps {
  onFetchBranches: (
    organizationId: string,
  ) => Promise<ActionResult<BranchSummaryResponse[]>>;
  onFetchOrganizations: (
    query: string,
  ) => Promise<ActionResult<PaginatedResponse<OrganizationSummaryResponse>>>;
  onSubmit: (data: CreateMembershipFormData) => void | Promise<void>;
}

export function MembershipForm({
  onFetchBranches,
  onFetchOrganizations,
  onSubmit,
}: MembershipFormProps) {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<CreateMembershipFormData>({
    resolver: zodResolver(createMembershipSchema),
    defaultValues: {
      organizationId: "",
      branchId: "",
      roles: [],
      isPrimary: false,
    },
  });

  const selectedOrgId = watch("organizationId");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Organization</label>
        <Controller
          control={control}
          name="organizationId"
          render={({ field }) => (
            <OrganizationSearch
              disabled={isSubmitting}
              onFetch={onFetchOrganizations}
              value={field.value}
              onValueChange={(id) => {
                setValue("organizationId", id);
                setValue("branchId", "");
              }}
            />
          )}
        />
        {errors.organizationId && (
          <p className="text-sm text-red-600">
            {errors.organizationId.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Branch (Optional)</label>
        <Controller
          control={control}
          name="branchId"
          render={({ field }) => (
            <OrganizationBranchSearch
              disabled={isSubmitting}
              onFetch={onFetchBranches}
              organizationId={selectedOrgId || undefined}
              value={field.value}
              onValueChange={(id) => {
                setValue("branchId", id);
              }}
            />
          )}
        />
        <p className="text-sm text-muted-foreground">
          Leave empty for organization-level membership
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Roles</label>
        <p className="text-sm text-muted-foreground mb-2">
          Select one or more roles
        </p>
        <Controller
          control={control}
          name="roles"
          render={({ field }) => (
            <div className="grid grid-cols-2 gap-3">
              {Object.values(UserRole).map((role) => (
                <label key={role} className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value?.includes(role)}
                    onCheckedChange={(checked) => {
                      const current = field.value || [];
                      const updated = checked
                        ? [...current, role]
                        : current.filter((r) => r !== role);
                      field.onChange(updated);
                    }}
                    disabled={isSubmitting}
                  />
                  <span className="text-sm">{roleLabels[role] || role}</span>
                </label>
              ))}
            </div>
          )}
        />
        {errors.roles && (
          <p className="text-sm text-red-600">{errors.roles.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            {...register("isPrimary")}
            disabled={isSubmitting}
            className="h-4 w-4 rounded border-gray-300"
          />
          <span className="text-sm font-medium">Set as primary membership</span>
        </label>
        <p className="text-sm text-muted-foreground ml-6">
          Default context on login
        </p>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Creating..." : "Create Membership"}
      </Button>
    </form>
  );
}
