"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ErrorFallback } from "@repo/ui/errors/error-fallback";

export default function AuthError() {
  const searchParams = useSearchParams();
  const authError = searchParams?.get("error");

  const error = new Error(
    authError === "AccessDenied"
      ? "Access to the Operations Dashboard is restricted to @ebikesafrica.co.ke email addresses only."
      : "An authentication error occurred.",
  );

  useEffect(() => {
    console.error("Auth error:", authError);
  }, [authError]);

  return (
    <ErrorFallback
      environment={"development"}
      error={error}
      reset={() => (window.location.href = "/api/auth/signin")}
      title={
        authError === "AccessDenied"
          ? "Access Restricted"
          : "Authentication Error"
      }
      description={
        authError === "AccessDenied"
          ? "Access to the Operations Dashboard is restricted to @ebikesafrica.co.ke email addresses only."
          : "An authentication error occurred. Please try again."
      }
      resetLabel="Sign In with Authorized Account"
    />
  );
}
