"use client";

import { useEffect } from "react";
import { ErrorFallback } from "@repo/ui/errors/error-fallback";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function NotificationDetailError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Notification detail error:", error);
  }, [error]);

  return (
    <ErrorFallback
      description="An error occurred while loading this notification."
      environment="development"
      error={error}
      reset={reset}
      title="Unable to load notification"
    />
  );
}
