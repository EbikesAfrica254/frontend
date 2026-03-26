"use client";

import Link from "next/link";
import { Button } from "@repo/ui/primitives/button";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col items-center justify-center">
        <div className="max-w-lg text-center">
          <h1 className="text-3xl font-bold">ebikes Africa</h1>
          <p className="my-3 text-muted-foreground">
            Join Africa&#39;s leading sustainable delivery network. Fast,
            efficient, and eco-friendly logistics powered by electric bikes.
          </p>
          <div className="my-5 flex items-center justify-center gap-4">
            <Button asChild>
              <Link href="/signup">Create Account</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/api/auth/signin/keycloak">Sign In</Link>
            </Button>
          </div>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} eBikes Africa. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
