"use client";

import { Button } from "@repo/ui/primitives/button";
import { Skeleton } from "@repo/ui/primitives/skeleton";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-10 w-56 rounded-md" />
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl font-bold">eBikes Ops</h1>
          <p className="text-muted-foreground">Operations Dashboard</p>
          <Button onClick={() => signIn("keycloak")}>
            Sign in with Keycloak
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
