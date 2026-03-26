import { auth } from "@repo/features-auth/server";
import { getNavigation } from "@/configuration/navigation";
import { AppSidebarClient } from "./app-sidebar-client";
import { getCurrentUserResource } from "@repo/features-iam/server";

export async function AppSidebar() {
  const session = await auth();

  const navigation = await getNavigation(session);
  const currentUser = await getCurrentUserResource();

  return (
    <AppSidebarClient currentUser={currentUser.data} navigation={navigation} />
  );
}
