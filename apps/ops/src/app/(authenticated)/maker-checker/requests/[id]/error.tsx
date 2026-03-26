"use client";

import { useEffect } from "react";
import { ErrorFallback } from "@repo/ui/errors/error-fallback";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RequestDetailError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Request detail error:", error);
  }, [error]);

  return (
    <ErrorFallback
      environment={"development"}
      error={error}
      reset={reset}
      title="Unable to load request details"
      description="An error occurred while loading this approval request."
    />
  );
}
