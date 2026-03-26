"use client";

import { useState, useTransition } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
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
import { Checkbox } from "@repo/ui/primitives/checkbox";
import { Label } from "@repo/ui/primitives/label";
import {
  COUNTRY_OPTIONS,
  CreateUserFormData,
  createUserSchema,
  resolveScope,
  useAvailableRoles,
} from "@repo/features-iam/client";
import { createUser } from "@repo/features-iam/actions";
import type {
  BranchSummaryResponse,
  OrganizationSummaryResponse,
} from "@repo/features-organizations/client";
import {
  OrganizationBranchSearch,
  OrganizationSearch,
} from "@repo/features-organizations/client";
import {
  getOrganizationBranches,
  searchOrganizations,
} from "@repo/features-organizations/actions";

export function CreateUserSheet() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [selectedOrganization, setSelectedOrganization] =
    useState<OrganizationSummaryResponse | null>(null);
  const { data: session, status } = useSession();

  const scope = resolveScope(session ?? null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      branchId: scope?.kind === "branch" ? scope.branchId : undefined,
      countryCode: "KE",
      email: "",
      firstName: "",
      lastName: "",
      organizationId:
        scope?.kind !== "system" ? scope?.organizationId : undefined,
      phoneNumber: "",
      roles: [],
      username: "",
    },
  });

  const selectedBranchId = useWatch({ control, name: "branchId" });
  const selectedCountry = useWatch({ control, name: "countryCode" });
  const selectedOrganizationId = useWatch({ control, name: "organizationId" });
  const selectedRoles = useWatch({ control, name: "roles" });

  const { availableRoles } = useAvailableRoles(
    scope!,
    session?.user?.roles ?? [],
    selectedOrganizationId,
    selectedBranchId,
  );

  const handleOrganizationChange = (
    _value: string,
    organization: OrganizationSummaryResponse,
  ) => {
    setSelectedOrganization(organization);
    setValue("organizationId", organization.id);
    setValue("branchId", undefined);
  };

  const handleBranchChange = (
    _value: string,
    branch: BranchSummaryResponse,
  ) => {
    setValue("branchId", branch.id);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (isPending) return;
    setOpen(newOpen);
    if (!newOpen) {
      reset();
      setSelectedOrganization(null);
    }
  };

  const handleRoleToggle = (role: string, checked: boolean): string[] => {
    const currentRoles = selectedRoles ?? [];
    return checked
      ? [...currentRoles, role]
      : currentRoles.filter((r) => r !== role);
  };

  const onSubmit = (data: CreateUserFormData) => {
    startTransition(async () => {
      const result = await createUser(data);

      if (result.success) {
        toast.success("User created successfully", {
          description: `${data.firstName} ${data.lastName} has been added to the system.`,
        });
        setOpen(false);
        reset();
        setSelectedOrganization(null);
      } else {
        toast.error("Failed to create user", {
          description: result.error ?? "Please check the form and try again.",
        });
      }
    });
  };

  if (status === "loading") {
    return (
      <Button disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    );
  }

  if (!scope) {
    return <Button disabled>Insufficient permissions</Button>;
  }

  // system scope: org is searchable, branch searchable after org selected
  // organization scope: org is locked, branch is searchable
  // branch scope: both locked, no assignment section needed
  const showAssignmentSection = scope.kind !== "branch";
  const showOrganizationSearch = scope.kind === "system";
  const effectiveOrganizationId =
    scope.kind !== "system" ? scope.organizationId : selectedOrganization?.id;

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button onClick={() => setOpen(true)}>Create User</Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>Create New User</SheetTitle>
          <SheetDescription>
            Add a new user to the system. All fields marked with * are required.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6">
          <form
            id="create-user-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 py-4"
          >
            {/* Personal Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-foreground">
                  Personal Information
                </h4>
                <Separator className="flex-1" />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Username <span className="text-destructive">*</span>
                </label>
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="username"
                      placeholder="john.doe"
                      disabled={isPending}
                      aria-invalid={!!errors.username}
                    />
                  )}
                />
                {errors.username && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    First Name <span className="text-destructive">*</span>
                  </label>
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="firstName"
                        placeholder="John"
                        disabled={isPending}
                        aria-invalid={!!errors.firstName}
                      />
                    )}
                  />
                  {errors.firstName && (
                    <p className="text-sm font-medium text-destructive">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="lastName"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Last Name <span className="text-destructive">*</span>
                  </label>
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="lastName"
                        placeholder="Doe"
                        disabled={isPending}
                        aria-invalid={!!errors.lastName}
                      />
                    )}
                  />
                  {errors.lastName && (
                    <p className="text-sm font-medium text-destructive">
                      {errors.lastName.message}
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

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Email <span className="text-destructive">*</span>
                </label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      disabled={isPending}
                      aria-invalid={!!errors.email}
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="countryCode"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Country <span className="text-destructive">*</span>
                  </label>
                  <Controller
                    name="countryCode"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={isPending}
                      >
                        <SelectTrigger id="countryCode">
                          <SelectValue>
                            {selectedCountry && (
                              <span className="flex items-center gap-2">
                                <span>
                                  {
                                    COUNTRY_OPTIONS.find(
                                      (c) => c.value === selectedCountry,
                                    )?.flag
                                  }
                                </span>
                                <span>{selectedCountry}</span>
                              </span>
                            )}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {COUNTRY_OPTIONS.map((country) => (
                            <SelectItem
                              key={country.value}
                              value={country.value}
                            >
                              <span className="flex items-center gap-2">
                                <span>{country.flag}</span>
                                <span>{country.label}</span>
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.countryCode && (
                    <p className="text-sm font-medium text-destructive">
                      {errors.countryCode.message}
                    </p>
                  )}
                </div>

                <div className="col-span-2 space-y-2">
                  <label
                    htmlFor="phoneNumber"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Phone Number <span className="text-destructive">*</span>
                  </label>
                  <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="phoneNumber"
                        type="tel"
                        placeholder="+254712345678"
                        disabled={isPending}
                        aria-invalid={!!errors.phoneNumber}
                      />
                    )}
                  />
                  {errors.phoneNumber && (
                    <p className="text-sm font-medium text-destructive">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Include country code (e.g., +254 for Kenya)
                  </p>
                </div>
              </div>
            </div>

            {/* Roles */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-foreground">
                  Roles & Permissions
                </h4>
                <Separator className="flex-1" />
              </div>

              <div className="space-y-2">
                <Label>
                  Roles <span className="text-destructive">*</span>
                </Label>
                <Controller
                  name="roles"
                  control={control}
                  render={({ field }) => (
                    <div className="grid grid-cols-2 gap-3 rounded-md border p-4">
                      {availableRoles.map((role) => (
                        <div
                          key={role.value}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`role-${role.value}`}
                            checked={field.value?.includes(role.value)}
                            onCheckedChange={(checked) =>
                              field.onChange(
                                handleRoleToggle(
                                  role.value,
                                  checked as boolean,
                                ),
                              )
                            }
                            disabled={isPending}
                          />
                          <label
                            htmlFor={`role-${role.value}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            {role.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                />
                {errors.roles && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.roles.message}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Select at least one role for this user
                </p>
              </div>
            </div>

            {/* Organization Assignment */}
            {showAssignmentSection && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-foreground">
                    Assignment
                  </h4>
                  <Separator className="flex-1" />
                </div>

                {showOrganizationSearch && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Organization{" "}
                      <span className="text-muted-foreground">(Optional)</span>
                    </label>
                    <OrganizationSearch
                      value={selectedOrganizationId}
                      onFetch={searchOrganizations}
                      onValueChange={handleOrganizationChange}
                      disabled={isPending}
                      placeholder="Search organizations..."
                    />
                    {errors.organizationId && (
                      <p className="text-sm font-medium text-destructive">
                        {errors.organizationId.message}
                      </p>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Branch{" "}
                    <span className="text-muted-foreground">(Optional)</span>
                  </label>
                  <OrganizationBranchSearch
                    organizationId={effectiveOrganizationId}
                    onFetch={getOrganizationBranches}
                    onValueChange={handleBranchChange}
                    disabled={isPending || !effectiveOrganizationId}
                    placeholder={
                      !effectiveOrganizationId
                        ? "Select an organization first"
                        : "Search branches..."
                    }
                  />
                  {errors.branchId && (
                    <p className="text-sm font-medium text-destructive">
                      {errors.branchId.message}
                    </p>
                  )}
                </div>
              </div>
            )}
          </form>
        </div>

        <SheetFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" form="create-user-form" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Creating..." : "Create User"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
