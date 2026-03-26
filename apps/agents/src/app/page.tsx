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
            <div className="flex min-h-svh items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Skeleton className="h-10 w-48" />
                    <Skeleton className="h-6 w-36" />
                    <Skeleton className="h-12 w-full max-w-xs rounded-md" />
                </div>
            </div>
        );
    }

    if (status === "unauthenticated") {
        return (
            <div className="flex min-h-svh flex-col items-center justify-center px-6">
                <div className="flex w-full max-w-xs flex-col items-center gap-6">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="text-2xl font-bold">eBikes Agents</h1>
                        <p className="text-sm text-muted-foreground">
                            Field agent app — sign in to continue
                        </p>
                    </div>
                    <Button
                        className="w-full"
                        size="lg"
                        onClick={() => signIn("keycloak")}
                    >
                        Sign in
                    </Button>
                </div>
            </div>
        );
    }

    return null;
}