"use client";

import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
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
import { createOrder } from "@repo/features-orders/actions";
import {
  CreateOrderFormData,
  createOrderSchema,
  OrderType,
} from "@repo/features-orders/client";

export function CreateOrderDialog() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateOrderFormData>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      branchId: "",
      currency: "KES",
      customerId: "",
      deliveryLocation: { address: "", latitude: 0, longitude: 0 },
      items: [],
      orderType: OrderType.EXPLICIT,
      organizationId: "",
      pickupLocation: { address: "", latitude: 0, longitude: 0 },
    },
  });

  const onSubmit = (data: CreateOrderFormData) => {
    startTransition(async () => {
      const result = await createOrder(data);

      if (result.success) {
        toast.success("Order created successfully");
        setOpen(false);
        reset();
      } else {
        toast.error("Failed to create order", {
          description: result.error || "Please check the form and try again.",
        });
      }
    });
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!isPending) {
      setOpen(newOpen);
      if (!newOpen) {
        reset();
      }
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button>Create Order</Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>Create New Order</SheetTitle>
          <SheetDescription>
            Create a new order. All fields marked with * are required.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6">
          <form
            id="create-order-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 py-4"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-foreground">
                  Order Details
                </h4>
                <Separator className="flex-1" />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="orderType"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Order Type <span className="text-destructive">*</span>
                </label>
                <Controller
                  name="orderType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isPending}
                    >
                      <SelectTrigger id="orderType">
                        <SelectValue placeholder="Select order type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={OrderType.EXPLICIT}>
                          Explicit
                        </SelectItem>
                        <SelectItem value={OrderType.SCHEDULED}>
                          Scheduled
                        </SelectItem>
                        <SelectItem value={OrderType.BATCH_ITEM}>
                          Batch Item
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.orderType && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.orderType.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="customerId"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Customer ID <span className="text-destructive">*</span>
                  </label>
                  <Controller
                    name="customerId"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="customerId"
                        placeholder="Customer ID"
                        disabled={isPending}
                        aria-invalid={!!errors.customerId}
                      />
                    )}
                  />
                  {errors.customerId && (
                    <p className="text-sm font-medium text-destructive">
                      {errors.customerId.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="currency"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Currency <span className="text-destructive">*</span>
                  </label>
                  <Controller
                    name="currency"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="currency"
                        placeholder="KES"
                        disabled={isPending}
                        aria-invalid={!!errors.currency}
                      />
                    )}
                  />
                  {errors.currency && (
                    <p className="text-sm font-medium text-destructive">
                      {errors.currency.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-foreground">
                  Pickup Location
                </h4>
                <Separator className="flex-1" />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="pickupAddress"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Address <span className="text-destructive">*</span>
                </label>
                <Controller
                  name="pickupLocation.address"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="pickupAddress"
                      placeholder="Pickup address"
                      disabled={isPending}
                      aria-invalid={!!errors.pickupLocation?.address}
                    />
                  )}
                />
                {errors.pickupLocation?.address && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.pickupLocation.address.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="pickupLatitude"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Latitude <span className="text-destructive">*</span>
                  </label>
                  <Controller
                    name="pickupLocation.latitude"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="pickupLatitude"
                        type="number"
                        step="any"
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        disabled={isPending}
                        aria-invalid={!!errors.pickupLocation?.latitude}
                      />
                    )}
                  />
                  {errors.pickupLocation?.latitude && (
                    <p className="text-sm font-medium text-destructive">
                      {errors.pickupLocation.latitude.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="pickupLongitude"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Longitude <span className="text-destructive">*</span>
                  </label>
                  <Controller
                    name="pickupLocation.longitude"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="pickupLongitude"
                        type="number"
                        step="any"
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        disabled={isPending}
                        aria-invalid={!!errors.pickupLocation?.longitude}
                      />
                    )}
                  />
                  {errors.pickupLocation?.longitude && (
                    <p className="text-sm font-medium text-destructive">
                      {errors.pickupLocation.longitude.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-foreground">
                  Delivery Location
                </h4>
                <Separator className="flex-1" />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="deliveryAddress"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Address <span className="text-destructive">*</span>
                </label>
                <Controller
                  name="deliveryLocation.address"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="deliveryAddress"
                      placeholder="Delivery address"
                      disabled={isPending}
                      aria-invalid={!!errors.deliveryLocation?.address}
                    />
                  )}
                />
                {errors.deliveryLocation?.address && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.deliveryLocation.address.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="deliveryLatitude"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Latitude <span className="text-destructive">*</span>
                  </label>
                  <Controller
                    name="deliveryLocation.latitude"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="deliveryLatitude"
                        type="number"
                        step="any"
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        disabled={isPending}
                        aria-invalid={!!errors.deliveryLocation?.latitude}
                      />
                    )}
                  />
                  {errors.deliveryLocation?.latitude && (
                    <p className="text-sm font-medium text-destructive">
                      {errors.deliveryLocation.latitude.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="deliveryLongitude"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Longitude <span className="text-destructive">*</span>
                  </label>
                  <Controller
                    name="deliveryLocation.longitude"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="deliveryLongitude"
                        type="number"
                        step="any"
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        disabled={isPending}
                        aria-invalid={!!errors.deliveryLocation?.longitude}
                      />
                    )}
                  />
                  {errors.deliveryLocation?.longitude && (
                    <p className="text-sm font-medium text-destructive">
                      {errors.deliveryLocation.longitude.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
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
          <Button type="submit" form="create-order-form" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Creating..." : "Create Order"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
