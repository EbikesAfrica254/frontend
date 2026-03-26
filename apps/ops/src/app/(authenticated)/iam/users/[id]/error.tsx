"use client";

import { useEffect } from "react";
import { ErrorFallback } from "@repo/ui/errors/error-fallback";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function UserDetailError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("User detail error:", error);
  }, [error]);

  return (
    <ErrorFallback
      environment={"development"}
      error={error}
      reset={reset}
      title="Unable to load user details"
      description="An error occurred while loading this user's information."
    />
  );
}
