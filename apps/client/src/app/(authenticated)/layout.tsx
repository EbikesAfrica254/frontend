import { cookies } from "next/headers";
import React from "react";
import { AuthenticatedWrapper } from "@/app/(authenticated)/_components/authenticated-wrapper";
import { AppSidebar } from "@/app/(authenticated)/_components/app-sidebar";
import { sessionUtilities } from "@/utilities/session-utilities";
import {
  NotificationProvider,
  SseConnectionProvider,
} from "@repo/features-notifications/client";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  const session = await sessionUtilities();

  return (
    <NotificationProvider>
      <AuthenticatedWrapper
        defaultOpen={defaultOpen}
        session={session}
        sidebar={<AppSidebar />}
      >
        <SseConnectionProvider>{children}</SseConnectionProvider>
      </AuthenticatedWrapper>
    </NotificationProvider>
  );
}
