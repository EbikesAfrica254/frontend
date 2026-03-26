"use client";

import React, { ReactNode, useEffect } from "react";
import { SidebarInset, SidebarProvider } from "@repo/ui/primitives/sidebar";
import { signIn, useSession } from "next-auth/react";
import { AppHeader } from "./app-header";

interface AuthenticatedWrapperProps {
  children: ReactNode;
  sidebar: ReactNode;
  defaultOpen?: boolean;
}

export function AuthenticatedWrapper({
  children,
  sidebar,
  defaultOpen = true,
}: AuthenticatedWrapperProps) {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      console.error("Session refresh failed, forcing re-authentication");
      void signIn("keycloak");
    }
  }, [session]);

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      {sidebar}
      <SidebarInset className="flex flex-col">
        <AppHeader />
        <div className="flex flex-1 flex-col min-h-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
