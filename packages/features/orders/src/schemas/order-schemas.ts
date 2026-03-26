import { z } from "zod";
import { OrderType } from "../types/enums";
import { currencySchema } from "./shared";

const locationSchema = z.object({
  address: z.string().min(1, "Address is required"),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export const createOrderSchema = z.object({
  branchId: z.string().min(1, "Branch is required"),
  currency: currencySchema,
  customerId: z.string().min(1, "Customer is required"),
  deliveryLocation: locationSchema,
  items: z.array(z.unknown()),
  orderType: z.enum(OrderType),
  organizationId: z.string().min(1, "Organization is required"),
  pickupLocation: locationSchema,
});

export const cancelOrderSchema = z.object({
  reason: z.string().min(1, "Cancellation reason is required"),
});

export type CancelOrderFormData = z.infer<typeof cancelOrderSchema>;
export type CreateOrderFormData = z.infer<typeof createOrderSchema>;
