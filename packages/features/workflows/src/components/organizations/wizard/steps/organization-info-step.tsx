"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AddressInput } from "@repo/ui/inputs/address-input";
import { PhoneInput } from "@repo/ui/inputs/phone-input";
import { DatePicker } from "@repo/ui/dates/date-picker";
import { Input } from "@repo/ui/primitives/input";
import { Label } from "@repo/ui/primitives/label";
import { Separator } from "@repo/ui/primitives/separator";
import { geocodeAddress } from "@repo/shared/actions";
import { format } from "date-fns";
import {
  ActionResult,
  AddressTag,
  PaginatedResponse,
} from "@repo/shared/client";
import {
  OrganizationInfoData,
  useOrganizationWizardStore,
} from "../../../../store/organization-wizard-store";
import type { UserExtensionSummaryResponse } from "@repo/features-iam/client";
import { UserSearch } from "@repo/features-iam/client";
import { createOrganizationSchema } from "@repo/features-organizations/client";

const stepSchema = createOrganizationSchema.pick({
  displayName: true,
  email: true,
  incorporationDate: true,
  kraPin: true,
  legalName: true,
  ownerId: true,
  phoneNumber: true,
  registrationNumber: true,
  addresses: true,
});

type StepFormValues = z.infer<typeof stepSchema>;

type OwnerAssignmentMode =
  | "GLOBAL_SEARCH"
  | "ORGANIZATION_SEARCH"
  | "BRANCH_SEARCH"
  | "FIXED_SELF";

interface OwnerAssignmentPolicy {
  activeBranch?: string;
  activeOrganization?: string;
  initialOwnerDisplayName?: string;
  initialOwnerEmail?: string;
  initialOwnerId: string;
  mode: OwnerAssignmentMode;
}

interface OrganizationInfoStepProps {
  onOwnerSearchFetch?: (
    query: string,
  ) => Promise<ActionResult<PaginatedResponse<UserExtensionSummaryResponse>>>;
  ownerAssignmentPolicy: OwnerAssignmentPolicy;
}

function isOwnerSearchable(mode: OwnerAssignmentMode) {
  return mode !== "FIXED_SELF";
}

function OwnerReadOnlyField({
  ownerAssignmentPolicy,
}: {
  ownerAssignmentPolicy: OwnerAssignmentPolicy;
}) {
  const primaryText =
    ownerAssignmentPolicy.initialOwnerDisplayName ||
    ownerAssignmentPolicy.initialOwnerEmail ||
    ownerAssignmentPolicy.initialOwnerId;

  return (
    <div className="space-y-2">
      <Label htmlFor="ownerId">
        Owner <span className="text-destructive">*</span>
      </Label>
      <div className="rounded-md border bg-muted/30 px-3 py-2 text-sm">
        <p className="font-medium">{primaryText}</p>
        {ownerAssignmentPolicy.initialOwnerEmail &&
          ownerAssignmentPolicy.initialOwnerEmail !== primaryText && (
            <p className="text-muted-foreground">
              {ownerAssignmentPolicy.initialOwnerEmail}
            </p>
          )}
      </div>
    </div>
  );
}

export function OrganizationInfoStep({
  onOwnerSearchFetch,
  ownerAssignmentPolicy,
}: OrganizationInfoStepProps) {
  const {
    organizationInfo,
    addresses,
    ownerId,
    setOrganizationInfo,
    setOwnerId,
    nextStep,
  } = useOrganizationWizardStore();

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setValue,
  } = useForm<StepFormValues>({
    resolver: zodResolver(stepSchema),
    defaultValues: {
      displayName: organizationInfo?.displayName ?? "",
      email: organizationInfo?.email ?? "",
      incorporationDate: organizationInfo?.incorporationDate ?? "",
      kraPin: organizationInfo?.kraPin ?? "",
      legalName: organizationInfo?.legalName ?? "",
      ownerId: ownerId ?? ownerAssignmentPolicy.initialOwnerId,
      phoneNumber: organizationInfo?.phoneNumber ?? "",
      registrationNumber: organizationInfo?.registrationNumber ?? "",
      addresses:
        addresses.length > 0
          ? addresses
          : [
              {
                addressTag: AddressTag.PRIMARY,
                city: "",
                country: "Kenya",
                streetAddress: "",
              },
            ],
    },
  });

  const onValid = (values: StepFormValues) => {
    const {
      addresses: submittedAddresses,
      ownerId: submittedOwnerId,
      ...info
    } = values;

    setOrganizationInfo(info as OrganizationInfoData, submittedAddresses);
    setOwnerId(submittedOwnerId);
    nextStep();
  };

  const handleOwnerChange = (value: string) => {
    setValue("ownerId", value, { shouldDirty: true, shouldValidate: true });
  };

  const ownerSearchable = isOwnerSearchable(ownerAssignmentPolicy.mode);

  return (
    <form
      id="organization-info-form"
      onSubmit={handleSubmit(onValid)}
      className="space-y-8"
    >
      <div className="space-y-4">
        <h3 className="text-base font-semibold">Business Details</h3>
        <Separator />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="legalName">
              Legal Name <span className="text-destructive">*</span>
            </Label>
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
            <Label htmlFor="displayName">
              Display Name <span className="text-destructive">*</span>
            </Label>
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
            <Label htmlFor="email">
              Email <span className="text-destructive">*</span>
            </Label>
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
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="registrationNumber">Registration Number</Label>
            <Input
              id="registrationNumber"
              {...register("registrationNumber")}
              disabled={isSubmitting}
              placeholder="PVT-123456"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="kraPin">KRA PIN</Label>
            <Input
              id="kraPin"
              {...register("kraPin")}
              disabled={isSubmitting}
              placeholder="A123456789B"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                      date ? format(date, "yyyy-MM-dd") : undefined,
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

          {ownerSearchable ? (
            <div className="space-y-2">
              <Label htmlFor="ownerId">
                Owner <span className="text-destructive">*</span>
              </Label>

              <Controller
                control={control}
                name="ownerId"
                render={({ field }) => (
                  <UserSearch
                    value={field.value}
                    onFetch={onOwnerSearchFetch!}
                    onValueChange={(value) => handleOwnerChange(value)}
                    disabled={isSubmitting || !onOwnerSearchFetch}
                    placeholder="Search users..."
                  />
                )}
              />

              {errors.ownerId && (
                <p className="text-sm text-destructive">
                  {errors.ownerId.message}
                </p>
              )}
            </div>
          ) : (
            <OwnerReadOnlyField ownerAssignmentPolicy={ownerAssignmentPolicy} />
          )}
        </div>
      </div>

      <div className="space-y-4 p-4">
        <h3 className="text-base font-semibold">Primary Address</h3>
        <Separator />

        <Controller
          control={control}
          name="addresses.0"
          render={({ field }) => (
            <AddressInput
              disabled={isSubmitting}
              errors={{
                city: errors.addresses?.[0]?.city?.message,
                country: errors.addresses?.[0]?.country?.message,
                latitude: errors.addresses?.[0]?.latitude?.message,
                longitude: errors.addresses?.[0]?.longitude?.message,
                postalCode: errors.addresses?.[0]?.postalCode?.message,
                streetAddress: errors.addresses?.[0]?.streetAddress?.message,
              }}
              onGeocode={geocodeAddress}
              showAddressTag={false}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>
    </form>
  );
}
