"use server";

import { withAction } from "./base-action";
import {
  geocodeAddressResource,
  reverseGeocodeResource,
} from "../resources/geocoding";

export const geocodeAddress = withAction(async (query: string) => {
  return geocodeAddressResource(query);
});

export const reverseGeocodeAddress = withAction(
  async (latitude: number, longitude: number) => {
    return reverseGeocodeResource(latitude, longitude);
  },
);
