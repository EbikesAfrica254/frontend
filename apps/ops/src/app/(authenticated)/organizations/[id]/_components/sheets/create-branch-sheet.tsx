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
  createBranchSchema,
  type CreateBranchFormData,
} from "@repo/features-organizations/client";
import { createBranch } from "@repo/features-organizations/actions";
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

interface CreateBranchSheetProps {
  onOpenChange: (open: boolean) => void;
  open: boolean;
  organizationId: string;
}

export function CreateBranchSheet({
  onOpenChange,
  open,
  organizationId,
}: CreateBranchSheetProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CreateBranchFormData>({
    defaultValues: {
      address: {
        city: "",
        country: "",
        latitude: undefined,
        longitude: undefined,
        postalCode: "",
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

  const { append, fields, remove } = useFieldArray({
    control,
    name: "operatingHours",
  });

  const handleOpenChange = (next: boolean) => {
    if (isPending) return;
    onOpenChange(next);
    if (!next) reset();
  };

  const onSubmit = (data: CreateBranchFormData) => {
    startTransition(async () => {
      const result = await createBranch(organizationId, data);

      if (result.success) {
        toast.success("Branch created successfully");
        handleOpenChange(false);
        router.refresh();
      } else {
        toast.error("Failed to create branch", {
          description: result.error ?? "Please check the form and try again.",
        });
      }
    });
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent className="flex w-full flex-col sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>Create Branch</SheetTitle>
          <SheetDescription>
            Add a new branch to this organization. All fields marked with * are
            required.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6">
          <form
            className="space-y-6 py-4"
            id="create-branch-form"
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
                    Branch Name <span className="text-destructive">*</span>
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
                        placeholder="WESTLANDS"
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
                    Display Name <span className="text-destructive">*</span>
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
                        placeholder="Westlands Branch"
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
                    Email <span className="text-destructive">*</span>
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
                        placeholder="westlands@ebikes.africa"
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
                    Phone Number <span className="text-destructive">*</span>
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
                        placeholder="+254712345678"
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
                  Street Address <span className="text-destructive">*</span>
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
                      placeholder="123 Waiyaki Way"
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
                    City <span className="text-destructive">*</span>
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
                        placeholder="Nairobi"
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
                    Country <span className="text-destructive">*</span>
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
                        placeholder="Kenya"
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
                      <Input
                        {...field}
                        disabled={isPending}
                        id="postalCode"
                        placeholder="00100"
                      />
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
                        placeholder="-1.2673"
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
                        placeholder="36.8073"
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
                  No operating hours added. Click below to add a schedule.
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
                            placeholder="08:00"
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
                            placeholder="17:00"
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
          <Button disabled={isPending} form="create-branch-form" type="submit">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Creating..." : "Create Branch"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
