"use client";

import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { SubmitLocationForm } from "@repo/features-orders/client";
import { submitDeliveryLocation } from "@repo/features-orders/actions";
import { geocodeAddress, reverseGeocodeAddress } from "@repo/shared/actions";
import type { DraftDetailResponse } from "@repo/features-orders/client";
import type { UpdateDeliveryLocationFormData } from "@repo/features-orders/client";
import { DeliverySuccessCard } from "./delivery-success-card";

interface DeliveryLocationFormProps {
  draft: DraftDetailResponse;
  deliveryToken: string | null;
  shortCode: string;
}

const DELIVERY_TOKEN_KEY = "delivery_token";

export function DeliveryLocationForm({
  draft,
  deliveryToken,
  shortCode,
}: DeliveryLocationFormProps) {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (deliveryToken) {
      sessionStorage.setItem(DELIVERY_TOKEN_KEY, deliveryToken);
    }
  }, [deliveryToken]);

  const handleGeocode = useCallback((query: string) => {
    return geocodeAddress(query);
  }, []);

  const handleReverseGeocode = useCallback(
    (latitude: number, longitude: number) => {
      return reverseGeocodeAddress(latitude, longitude);
    },
    [],
  );

  const handleSubmit = useCallback(
    async (data: UpdateDeliveryLocationFormData) => {
      const token = sessionStorage.getItem(DELIVERY_TOKEN_KEY);

      if (!token) {
        toast.error(
          "Delivery session expired. Please reopen the link from your SMS.",
        );
        return;
      }

      const result = await submitDeliveryLocation(shortCode, token, data);

      if (!result.success) {
        toast.error(result.error ?? "Failed to submit delivery location");
        return;
      }

      sessionStorage.removeItem(DELIVERY_TOKEN_KEY);
      setSubmitted(true);
    },
    [shortCode],
  );

  if (submitted) {
    return <DeliverySuccessCard />;
  }

  return (
    <SubmitLocationForm
      draft={draft}
      onGeocode={handleGeocode}
      onReverseGeocode={handleReverseGeocode}
      onSubmit={handleSubmit}
    />
  );
}
