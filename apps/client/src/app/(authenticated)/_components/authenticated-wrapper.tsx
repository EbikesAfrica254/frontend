"use client";

import React, { ReactNode, useEffect } from "react";
import { SidebarInset, SidebarProvider } from "@repo/ui/primitives/sidebar";
import { Session } from "next-auth";
import { SessionProvider, signIn } from "next-auth/react";
import { AppHeader } from "../_components/app-header";

interface AuthenticatedWrapperProps {
  children: ReactNode;
  sidebar: ReactNode;
  defaultOpen?: boolean;
  refetchInterval?: number;
  refetchOnWindowFocus?: boolean;
  session: Session | null;
}

export function AuthenticatedWrapper({
  children,
  sidebar,
  session,
  defaultOpen = true,
  refetchInterval = 240,
  refetchOnWindowFocus = true,
}: AuthenticatedWrapperProps) {
  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      console.error("Session refresh failed, forcing re-authentication");
      void signIn("keycloak");
    }
  }, [session]);

  return (
    <SessionProvider
      session={session}
      refetchInterval={refetchInterval}
      refetchOnWindowFocus={refetchOnWindowFocus}
    >
      <SidebarProvider defaultOpen={defaultOpen}>
        {sidebar}
        <SidebarInset className="flex flex-col">
          <AppHeader />
          <div className="flex flex-1 flex-col min-h-0">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </SessionProvider>
  );
}
