"use client";

import { ErrorFallback } from "@repo/ui/errors/error-fallback";

interface PreferredAgentsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function PreferredAgentsError({
  error,
  reset,
}: PreferredAgentsErrorProps) {
  return (
    <ErrorFallback environment="development" error={error} reset={reset} />
  );
}
