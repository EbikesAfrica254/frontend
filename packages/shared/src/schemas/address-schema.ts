import { z } from "zod";
import { AddressTag } from "../types/enums";

const addressTagValues = Object.values(AddressTag) as [
  AddressTag,
  ...AddressTag[],
];

export const addressSchema = z.object({
  addressTag: z.enum(addressTagValues, { message: "Address tag is required" }),
  city: z.string().min(1, "City is required").max(100),
  country: z.string().min(1, "Country is required").max(100),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  postalCode: z.string().max(20).optional(),
  streetAddress: z.string().min(1, "Street address is required").max(500),
});

export type AddressFormData = z.infer<typeof addressSchema>;
