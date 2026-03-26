import { cookies } from "next/headers";
import React, { ReactNode } from "react";
import { AuthenticatedWrapper } from "./_components/authenticated-wrapper";
import { AppSidebar } from "./_components/app-sidebar";

export default async function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <AuthenticatedWrapper defaultOpen={defaultOpen} sidebar={<AppSidebar />}>
      {children}
    </AuthenticatedWrapper>
  );
}
