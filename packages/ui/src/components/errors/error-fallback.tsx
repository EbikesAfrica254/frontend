"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../primitives/card";
import { Button } from "../primitives/button";
import React from "react";

interface ErrorFallbackProps {
  error: Error & { digest?: string };
  environment: string;
  reset: () => void;
  title?: string;
  description?: string;
  resetLabel?: string;
}

export function ErrorFallback({
  error,
  environment,
  reset,
  title = "Something went wrong",
  description = "An unexpected error occurred while loading this content.",
  resetLabel = "Try again",
}: ErrorFallbackProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={reset} className="w-full">
            {resetLabel}
          </Button>

          {environment === "development" && isMounted && error.message && (
            <details className="rounded-lg border bg-muted p-3 text-left">
              <summary className="cursor-pointer text-sm font-medium">
                Error details (dev only)
              </summary>
              <pre className="mt-2 overflow-auto text-xs">
                {error.message}
                {error.digest && `\n\nDigest: ${error.digest}`}
                {error.stack && `\n\n${error.stack}`}
              </pre>
            </details>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
