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
import { roleLabels } from "../../utilities/role-helpers";

interface UpdateMembershipRolesFormProps {
  currentRoles: string[];
  onSubmit: (data: UpdateMembershipRolesFormData) => void | Promise<void>;
}

export function UpdateMembershipRolesForm({
  currentRoles,
  onSubmit,
}: UpdateMembershipRolesFormProps) {
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
                  <span className="text-sm">{roleLabels[role] ?? role}</span>
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
