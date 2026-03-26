"use client";

import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateDeliveryLocationFormData,
  updateDeliveryLocationSchema,
} from "../../schemas/draft-schemas";
import { ActionResult } from "@repo/shared/client";
import { GeocodingResult } from "@repo/shared/client";
import { DraftDetailResponse } from "../../types/drafts";
import { LocationPicker } from "./location-picker";

interface SubmitLocationFormProps {
  draft: DraftDetailResponse;
  onGeocode?: (query: string) => Promise<ActionResult<GeocodingResult[]>>;
  onReverseGeocode: (
    latitude: number,
    longitude: number,
  ) => Promise<ActionResult<GeocodingResult>>;
  onSubmit: (data: UpdateDeliveryLocationFormData) => void | Promise<void>;
}

export function SubmitLocationForm({
  draft,
  onGeocode,
  onReverseGeocode,
  onSubmit,
}: SubmitLocationFormProps) {
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    watch,
  } = useForm<UpdateDeliveryLocationFormData>({
    defaultValues: {
      deliveryAddress: draft.deliveryAddress ?? "",
      deliveryLatitude: draft.deliveryLatitude ?? 0,
      deliveryLongitude: draft.deliveryLongitude ?? 0,
    },
    resolver: zodResolver(updateDeliveryLocationSchema),
  });

  const deliveryLatitude = watch("deliveryLatitude");
  const deliveryLongitude = watch("deliveryLongitude");

  const hasLocation = deliveryLatitude !== 0 && deliveryLongitude !== 0;

  const handleLocationChange = (latitude: number, longitude: number) => {
    setValue("deliveryLatitude", latitude, { shouldValidate: true });
    setValue("deliveryLongitude", longitude, { shouldValidate: true });

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      const result = await onReverseGeocode(latitude, longitude);

      if (result.success) {
        setValue("deliveryAddress", result.data.displayName, {
          shouldValidate: true,
        });
      } else {
        setValue(
          "deliveryAddress",
          `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
          { shouldValidate: true },
        );
      }
    }, 600);
  };

  React.useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <p className="text-sm font-medium">Delivery Location</p>
        <LocationPicker
          disabled={isSubmitting}
          latitude={hasLocation ? deliveryLatitude : null}
          longitude={hasLocation ? deliveryLongitude : null}
          onChange={handleLocationChange}
          onGeocode={onGeocode}
        />
        {(errors.deliveryLatitude || errors.deliveryLongitude) && (
          <p className="text-sm text-destructive">
            Please select a delivery location on the map
          </p>
        )}
        {errors.deliveryAddress && (
          <p className="text-sm text-destructive">
            {errors.deliveryAddress.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !hasLocation}
        className="w-full inline-flex h-11 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        {isSubmitting ? "Confirming..." : "Confirm Delivery Location"}
      </button>
    </form>
  );
}
