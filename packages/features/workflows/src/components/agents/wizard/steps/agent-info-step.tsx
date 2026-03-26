"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PhoneInput } from "@repo/ui/inputs/phone-input";
import { Input } from "@repo/ui/primitives/input";
import { Label } from "@repo/ui/primitives/label";
import { Separator } from "@repo/ui/primitives/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/primitives/select";
import type { UserExtensionSummaryResponse } from "@repo/features-iam/client";
import { UserSearch } from "@repo/features-iam/client";
import type { ActionResult, PaginatedResponse } from "@repo/shared/client";
import { useAgentWizardStore } from "../../../../store/agent-wizard-store";
import {
  baseCreateAgentSchema,
  CapabilityClass,
  NationalIdType,
  refineAgentNationalId,
} from "@repo/features-workforce/client";

const stepSchema = baseCreateAgentSchema
  .pick({
    alternatePhoneNumber: true,
    capabilityClass: true,
    email: true,
    firstName: true,
    lastName: true,
    maxConcurrentOrders: true,
    nationalIdNumber: true,
    nationalIdType: true,
    phoneNumber: true,
    userId: true,
  })
  .superRefine(refineAgentNationalId);

type StepFormValues = z.infer<typeof stepSchema>;

interface AgentInfoStepProps {
  allowUserOverride?: boolean;
  onUserSearchFetch?: (
    query: string,
  ) => Promise<ActionResult<PaginatedResponse<UserExtensionSummaryResponse>>>;
}

const capabilityClassOptions = [
  { label: "Bicycle Rider", value: CapabilityClass.BICYCLE_RIDER },
  { label: "Light Motor Rider", value: CapabilityClass.LIGHT_MOTOR_RIDER },
  { label: "Vehicle Driver", value: CapabilityClass.VEHICLE_DRIVER },
];

const nationalIdTypeOptions = [
  { label: "National ID", value: NationalIdType.NATIONAL_ID },
  { label: "Passport", value: NationalIdType.PASSPORT },
];

export function AgentInfoStep({
  allowUserOverride = false,
  onUserSearchFetch,
}: AgentInfoStepProps) {
  const { agentInfo, userId, setAgentInfo, setUserId, nextStep } =
    useAgentWizardStore();

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<StepFormValues>({
    resolver: zodResolver(stepSchema),
    defaultValues: {
      alternatePhoneNumber: agentInfo?.alternatePhoneNumber ?? undefined,
      capabilityClass:
        agentInfo?.capabilityClass ?? CapabilityClass.BICYCLE_RIDER,
      email: agentInfo?.email ?? undefined,
      firstName: agentInfo?.firstName ?? "",
      lastName: agentInfo?.lastName ?? "",
      maxConcurrentOrders: agentInfo?.maxConcurrentOrders ?? undefined,
      nationalIdNumber: agentInfo?.nationalIdNumber ?? "",
      nationalIdType: agentInfo?.nationalIdType ?? NationalIdType.NATIONAL_ID,
      phoneNumber: agentInfo?.phoneNumber ?? "",
      userId: userId ?? "",
    },
  });

  const selectedUserId = watch("userId");

  const onValid = (values: StepFormValues) => {
    const { userId: submittedUserId, ...info } = values;

    setUserId(submittedUserId);
    setAgentInfo(info);
    nextStep();
  };

  const handleUserChange = (value: string) => {
    setValue("userId", value, { shouldDirty: true, shouldValidate: true });
  };

  return (
    <form
      id="agent-info-form"
      onSubmit={handleSubmit(onValid)}
      className="space-y-8"
    >
      <input type="hidden" {...register("userId")} />

      <div className="space-y-4">
        <h3 className="text-base font-semibold">Personal Details</h3>
        <Separator />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="userId">
              User <span className="text-destructive">*</span>
            </Label>

            {allowUserOverride ? (
              <Controller
                control={control}
                name="userId"
                render={({ field }) => (
                  <UserSearch
                    value={field.value}
                    onFetch={onUserSearchFetch!}
                    onValueChange={handleUserChange}
                    disabled={isSubmitting || !onUserSearchFetch}
                    placeholder="Search users..."
                  />
                )}
              />
            ) : (
              <Input id="userId" value={selectedUserId} disabled readOnly />
            )}

            {errors.userId && (
              <p className="text-sm text-destructive">
                {errors.userId.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">
              First Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="firstName"
              {...register("firstName")}
              disabled={isSubmitting}
              placeholder="James"
              aria-invalid={!!errors.firstName}
            />
            {errors.firstName && (
              <p className="text-sm text-destructive">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">
              Last Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="lastName"
              {...register("lastName")}
              disabled={isSubmitting}
              placeholder="Mwangi"
              aria-invalid={!!errors.lastName}
            />
            {errors.lastName && (
              <p className="text-sm text-destructive">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="capabilityClass">
              Capability Class <span className="text-destructive">*</span>
            </Label>
            <Controller
              control={control}
              name="capabilityClass"
              render={({ field }) => (
                <Select
                  disabled={isSubmitting}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="capabilityClass"
                    aria-invalid={!!errors.capabilityClass}
                  >
                    <SelectValue placeholder="Select capability class" />
                  </SelectTrigger>
                  <SelectContent>
                    {capabilityClassOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.capabilityClass && (
              <p className="text-sm text-destructive">
                {errors.capabilityClass.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-base font-semibold">Contact Information</h3>
        <Separator />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">
              Phone Number <span className="text-destructive">*</span>
            </Label>
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

          <div className="space-y-2">
            <Label htmlFor="alternatePhoneNumber">Alternate Phone Number</Label>
            <Controller
              control={control}
              name="alternatePhoneNumber"
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  id="alternatePhoneNumber"
                  disabled={isSubmitting}
                  defaultCountry="KE"
                  placeholder="+254722000001"
                  aria-invalid={!!errors.alternatePhoneNumber}
                />
              )}
            />
            {errors.alternatePhoneNumber && (
              <p className="text-sm text-destructive">
                {errors.alternatePhoneNumber.message}
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
              placeholder="rider@example.com"
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-base font-semibold">Identity</h3>
        <Separator />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="nationalIdType">
              ID Type <span className="text-destructive">*</span>
            </Label>
            <Controller
              control={control}
              name="nationalIdType"
              render={({ field }) => (
                <Select
                  disabled={isSubmitting}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="nationalIdType"
                    aria-invalid={!!errors.nationalIdType}
                  >
                    <SelectValue placeholder="Select ID type" />
                  </SelectTrigger>
                  <SelectContent>
                    {nationalIdTypeOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.nationalIdType && (
              <p className="text-sm text-destructive">
                {errors.nationalIdType.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="nationalIdNumber">
              ID Number <span className="text-destructive">*</span>
            </Label>
            <Input
              id="nationalIdNumber"
              {...register("nationalIdNumber")}
              disabled={isSubmitting}
              placeholder="12345678"
              aria-invalid={!!errors.nationalIdNumber}
            />
            {errors.nationalIdNumber && (
              <p className="text-sm text-destructive">
                {errors.nationalIdNumber.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
