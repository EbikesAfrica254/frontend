"use client";

import { useEffect } from "react";
import { ErrorFallback } from "@repo/ui/errors/error-fallback";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function BranchDetailError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Branch detail error:", error);
  }, [error]);

  return (
    <ErrorFallback
      environment={"development"}
      error={error}
      reset={reset}
      title="Unable to load branch"
      description="An error occurred while loading this branch's information."
    />
  );
}
