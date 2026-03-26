"use client";

import { useEffect } from "react";
import { ErrorFallback } from "@repo/ui/errors/error-fallback";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function OrderDetailError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Order detail error:", error);
  }, [error]);

  return (
    <ErrorFallback
      environment={"development"}
      error={error}
      reset={reset}
      title="Unable to load order details"
      description="An error occurred while loading this order's information."
    />
  );
}
