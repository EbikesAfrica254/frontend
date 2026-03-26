"use client";

import { useTransition } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Plus, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@repo/ui/primitives/sheet";
import { Button } from "@repo/ui/primitives/button";
import { Input } from "@repo/ui/primitives/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/primitives/select";
import { Separator } from "@repo/ui/primitives/separator";
import {
  updateBranchSchema,
  type UpdateBranchFormData,
} from "@repo/features-organizations/client";
import { updateBranch } from "@repo/features-organizations/actions";
import type { BranchResponse } from "@repo/features-organizations/client";
import { DayOfWeek } from "@repo/features-organizations/client";

const DAY_OPTIONS = [
  { label: "Monday", value: DayOfWeek.MONDAY },
  { label: "Tuesday", value: DayOfWeek.TUESDAY },
  { label: "Wednesday", value: DayOfWeek.WEDNESDAY },
  { label: "Thursday", value: DayOfWeek.THURSDAY },
  { label: "Friday", value: DayOfWeek.FRIDAY },
  { label: "Saturday", value: DayOfWeek.SATURDAY },
  { label: "Sunday", value: DayOfWeek.SUNDAY },
];

interface UpdateBranchSheetProps {
  branch: BranchResponse;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  organizationId: string;
}

export function UpdateBranchSheet({
  branch,
  onOpenChange,
  open,
  organizationId,
}: UpdateBranchSheetProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<UpdateBranchFormData>({
    defaultValues: {
      address: {
        city: branch.address.city,
        country: branch.address.country,
        latitude: branch.address.latitude,
        longitude: branch.address.longitude,
        postalCode: branch.address.postalCode ?? "",
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

  const { append, fields, remove } = useFieldArray({
    control,
    name: "operatingHours",
  });

  const handleOpenChange = (next: boolean) => {
    if (isPending) return;
    onOpenChange(next);
    if (!next) reset();
  };

  const onSubmit = (data: UpdateBranchFormData) => {
    startTransition(async () => {
      const result = await updateBranch(organizationId, branch.id, data);

      if (result.success) {
        toast.success("Branch updated successfully");
        handleOpenChange(false);
        router.refresh();
      } else {
        toast.error("Failed to update branch", {
          description: result.error ?? "Please check the form and try again.",
        });
      }
    });
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent className="flex w-full flex-col sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>Update Branch</SheetTitle>
          <SheetDescription>
            Update details for <strong>{branch.displayName}</strong>.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6">
          <form
            className="space-y-6 py-4"
            id="update-branch-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Basic Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-foreground">
                  Basic Information
                </h4>
                <Separator className="flex-1" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="branchName"
                  >
                    Branch Name
                  </label>
                  <Controller
                    control={control}
                    name="branchName"
                    render={({ field }) => (
                      <Input
                        {...field}
                        aria-invalid={!!errors.branchName}
                        disabled={isPending}
                        id="branchName"
                      />
                    )}
                  />
                  {errors.branchName && (
                    <p className="text-sm font-medium text-destructive">
                      {errors.branchName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="displayName"
                  >
                    Display Name
                  </label>
                  <Controller
                    control={control}
                    name="displayName"
                    render={({ field }) => (
                      <Input
                        {...field}
                        aria-invalid={!!errors.displayName}
                        disabled={isPending}
                        id="displayName"
                      />
                    )}
                  />
                  {errors.displayName && (
                    <p className="text-sm font-medium text-destructive">
                      {errors.displayName.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-foreground">
                  Contact Information
                </h4>
                <Separator className="flex-1" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <Input
                        {...field}
                        aria-invalid={!!errors.email}
                        disabled={isPending}
                        id="email"
                        type="email"
                      />
                    )}
                  />
                  {errors.email && (
                    <p className="text-sm font-medium text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="phoneNumber"
                  >
                    Phone Number
                  </label>
                  <Controller
                    control={control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <Input
                        {...field}
                        aria-invalid={!!errors.phoneNumber}
                        disabled={isPending}
                        id="phoneNumber"
                        type="tel"
                      />
                    )}
                  />
                  {errors.phoneNumber && (
                    <p className="text-sm font-medium text-destructive">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-foreground">
                  Address
                </h4>
                <Separator className="flex-1" />
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="streetAddress"
                >
                  Street Address
                </label>
                <Controller
                  control={control}
                  name="address.streetAddress"
                  render={({ field }) => (
                    <Input
                      {...field}
                      aria-invalid={!!errors.address?.streetAddress}
                      disabled={isPending}
                      id="streetAddress"
                    />
                  )}
                />
                {errors.address?.streetAddress && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.address.streetAddress.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="city"
                  >
                    City
                  </label>
                  <Controller
                    control={control}
                    name="address.city"
                    render={({ field }) => (
                      <Input
                        {...field}
                        aria-invalid={!!errors.address?.city}
                        disabled={isPending}
                        id="city"
                      />
                    )}
                  />
                  {errors.address?.city && (
                    <p className="text-sm font-medium text-destructive">
                      {errors.address.city.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="country"
                  >
                    Country
                  </label>
                  <Controller
                    control={control}
                    name="address.country"
                    render={({ field }) => (
                      <Input
                        {...field}
                        aria-invalid={!!errors.address?.country}
                        disabled={isPending}
                        id="country"
                      />
                    )}
                  />
                  {errors.address?.country && (
                    <p className="text-sm font-medium text-destructive">
                      {errors.address.country.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="postalCode"
                  >
                    Postal Code
                  </label>
                  <Controller
                    control={control}
                    name="address.postalCode"
                    render={({ field }) => (
                      <Input {...field} disabled={isPending} id="postalCode" />
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="latitude"
                  >
                    Latitude
                  </label>
                  <Controller
                    control={control}
                    name="address.latitude"
                    render={({ field }) => (
                      <Input
                        {...field}
                        disabled={isPending}
                        id="latitude"
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ""
                              ? undefined
                              : parseFloat(e.target.value),
                          )
                        }
                        type="number"
                        value={field.value ?? ""}
                      />
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="longitude"
                  >
                    Longitude
                  </label>
                  <Controller
                    control={control}
                    name="address.longitude"
                    render={({ field }) => (
                      <Input
                        {...field}
                        disabled={isPending}
                        id="longitude"
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ""
                              ? undefined
                              : parseFloat(e.target.value),
                          )
                        }
                        type="number"
                        value={field.value ?? ""}
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-foreground">
                  Operating Hours
                </h4>
                <Separator className="flex-1" />
              </div>

              {fields.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No operating hours configured.
                </p>
              ) : (
                <div className="space-y-3">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="grid grid-cols-[1fr_auto_auto_auto] items-start gap-3"
                    >
                      <Controller
                        control={control}
                        name={`operatingHours.${index}.dayOfWeek`}
                        render={({ field: f }) => (
                          <Select
                            disabled={isPending}
                            onValueChange={f.onChange}
                            value={f.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Day" />
                            </SelectTrigger>
                            <SelectContent>
                              {DAY_OPTIONS.map((day) => (
                                <SelectItem key={day.value} value={day.value}>
                                  {day.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />

                      <Controller
                        control={control}
                        name={`operatingHours.${index}.opens`}
                        render={({ field: f }) => (
                          <Input
                            {...f}
                            aria-invalid={
                              !!errors.operatingHours?.[index]?.opens
                            }
                            disabled={isPending}
                            type="time"
                          />
                        )}
                      />

                      <Controller
                        control={control}
                        name={`operatingHours.${index}.closes`}
                        render={({ field: f }) => (
                          <Input
                            {...f}
                            aria-invalid={
                              !!errors.operatingHours?.[index]?.closes
                            }
                            disabled={isPending}
                            type="time"
                          />
                        )}
                      />

                      <Button
                        disabled={isPending}
                        onClick={() => remove(index)}
                        size="icon"
                        type="button"
                        variant="ghost"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <Button
                disabled={isPending}
                onClick={() =>
                  append({ closes: "", dayOfWeek: DayOfWeek.MONDAY, opens: "" })
                }
                size="sm"
                type="button"
                variant="outline"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Day
              </Button>
            </div>
          </form>
        </div>

        <SheetFooter className="gap-2">
          <Button
            disabled={isPending}
            onClick={() => handleOpenChange(false)}
            type="button"
            variant="outline"
          >
            Cancel
          </Button>
          <Button disabled={isPending} form="update-branch-form" type="submit">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
