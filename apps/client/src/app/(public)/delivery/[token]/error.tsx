"use client";

import { useEffect } from "react";
import { ErrorFallback } from "@repo/ui/errors/error-fallback";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DeliveryPageError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Delivery page error:", error);
  }, [error]);

  return (
    <ErrorFallback
      environment="development"
      error={error}
      reset={reset}
      title="Unable to load delivery"
      description="An error occurred while loading your delivery details. Please try again."
    />
  );
}
