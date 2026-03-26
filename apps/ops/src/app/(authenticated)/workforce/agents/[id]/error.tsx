"use client";

import { ErrorFallback } from "@repo/ui/errors/error-fallback";

interface AgentDetailErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AgentDetailError({
  error,
  reset,
}: AgentDetailErrorProps) {
  return (
    <ErrorFallback environment="development" error={error} reset={reset} />
  );
}
