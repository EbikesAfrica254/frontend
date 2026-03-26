"use client";

import { ErrorFallback } from "@repo/ui/errors/error-fallback";

interface AgentsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AgentsError({ error, reset }: AgentsErrorProps) {
  return (
    <ErrorFallback error={error} reset={reset} environment="development" />
  );
}
