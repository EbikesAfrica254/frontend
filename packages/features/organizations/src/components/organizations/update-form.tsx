"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@repo/ui/primitives/button";
import { Input } from "@repo/ui/primitives/input";
import { Label } from "@repo/ui/primitives/label";
import { DatePicker } from "@repo/ui/dates/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/primitives/select";
import { PhoneInput } from "@repo/ui/inputs/phone-input";
import {
  updateOrganizationSchema,
  type UpdateOrganizationFormData,
} from "../../schemas/organization-schemas";
import { RegistrationType } from "../../types/enums";
import type { OrganizationResponse } from "../../types/organizations";
import { formatRegistrationType } from "../../utilities/organization-helpers";

interface UpdateOrganizationFormProps {
  organization: OrganizationResponse;
  onSubmit: (data: UpdateOrganizationFormData) => void | Promise<void>;
}

export function UpdateOrganizationForm({
  organization,
  onSubmit,
}: UpdateOrganizationFormProps) {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<UpdateOrganizationFormData>({
    defaultValues: {
      displayName: organization.displayName,
      email: organization.email,
      incorporationDate: organization.incorporationDate,
      kraPin: organization.kraPin,
      legalName: organization.legalName,
      phoneNumber: organization.phoneNumber,
      registrationNumber: organization.registrationNumber,
      registrationType: organization.registrationType,
    },
    resolver: zodResolver(updateOrganizationSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="legalName">Legal Name</Label>
            <Input
              id="legalName"
              {...register("legalName")}
              disabled={isSubmitting}
              placeholder="Acme Foods Limited"
              aria-invalid={!!errors.legalName}
            />
            {errors.legalName && (
              <p className="text-sm text-destructive">
                {errors.legalName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              {...register("displayName")}
              disabled={isSubmitting}
              placeholder="Acme Foods Ltd"
              aria-invalid={!!errors.displayName}
            />
            {errors.displayName && (
              <p className="text-sm text-destructive">
                {errors.displayName.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              disabled={isSubmitting}
              placeholder="contact@acmefoods.co.ke"
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  id="phoneNumber"
                  disabled={isSubmitting}
                  defaultCountry="KE"
                  placeholder="+254712345678"
                  aria-invalid={!!errors.phoneNumber}
                />
              )}
            />
            {errors.phoneNumber && (
              <p className="text-sm text-destructive">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="registrationType">Registration Type</Label>
            <Controller
              control={control}
              name="registrationType"
              render={({ field }) => (
                <Select
                  disabled={isSubmitting}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="registrationType"
                    aria-invalid={!!errors.registrationType}
                  >
                    <SelectValue placeholder="Select registration type" />
                  </SelectTrigger>
                  <SelectContent>
                    {(
                      Object.values(RegistrationType) as RegistrationType[]
                    ).map((type) => (
                      <SelectItem key={type} value={type}>
                        {formatRegistrationType(type)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.registrationType && (
              <p className="text-sm text-destructive">
                {errors.registrationType.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="registrationNumber">Registration Number</Label>
            <Input
              id="registrationNumber"
              {...register("registrationNumber")}
              disabled={isSubmitting}
              placeholder="PVT-123456"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="kraPin">KRA PIN</Label>
            <Input
              id="kraPin"
              {...register("kraPin")}
              disabled={isSubmitting}
              placeholder="A001234567B"
              aria-invalid={!!errors.kraPin}
            />
            {errors.kraPin && (
              <p className="text-sm text-destructive">
                {errors.kraPin.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="incorporationDate">Incorporation Date</Label>
            <Controller
              control={control}
              name="incorporationDate"
              render={({ field }) => (
                <DatePicker
                  id="incorporationDate"
                  disabled={isSubmitting}
                  error={!!errors.incorporationDate}
                  placeholder="Select incorporation date"
                  captionLayout="dropdown"
                  toDate={new Date()}
                  value={field.value ?? null}
                  onChange={(date) =>
                    field.onChange(
                      date ? date.toISOString().split("T")[0] : undefined,
                    )
                  }
                />
              )}
            />
            {errors.incorporationDate && (
              <p className="text-sm text-destructive">
                {errors.incorporationDate.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Resubmitting..." : "Resubmit for Approval"}
        </Button>
      </div>
    </form>
  );
}
