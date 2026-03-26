"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/primitives/button";
import { Checkbox } from "@repo/ui/primitives/checkbox";
import {
  type UpdateMembershipRolesFormData,
  updateMembershipRolesSchema,
} from "../../schemas/membership-schemas";
import React from "react";
import { UserRole } from "@repo/shared/client";

interface MembershipRolesFormProps {
  currentRoles: string[];
  onSubmit: (data: UpdateMembershipRolesFormData) => void | Promise<void>;
}

const roleLabels: Record<string, string> = {
  AGENT: "Agent",
  BRANCH_ADMIN: "Branch Admin",
  BRANCH_OPERATOR: "Branch Operator",
  BRANCH_CHECKER: "Branch Checker",
  BRANCH_FLEET_MANAGER: "Branch Fleet Manager",
  BRANCH_FLEET_SUPPORT: "Branch Fleet Support",
  BRANCH_INVENTORY_MANAGER: "Branch Inventory Manager",
  BRANCH_MAKER: "Branch Maker",
  CUSTOMER: "Customer",
  ORGANIZATION_ADMIN: "Organization Admin",
  ORGANIZATION_CHECKER: "Organization Checker",
  ORGANIZATION_OPERATOR: "Organization Operator",
  ORGANIZATION_FLEET_MANAGER: "Organization Fleet Manager",
  ORGANIZATION_FLEET_SUPPORT: "Organization Fleet Support",
  ORGANIZATION_INVENTORY_MANAGER: "Organization Inventory Manager",
  ORGANIZATION_MAKER: "Organization Maker",
  SYSTEM_ADMIN: "System Admin",
};

export function MembershipRolesForm({
  currentRoles,
  onSubmit,
}: MembershipRolesFormProps) {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<UpdateMembershipRolesFormData>({
    resolver: zodResolver(updateMembershipRolesSchema),
    defaultValues: {
      roles: currentRoles as UserRole[],
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Updating..." : "Update Roles"}
      </Button>
    </form>
  );
}
