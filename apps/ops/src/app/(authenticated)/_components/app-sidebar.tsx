import { AppSidebarClient } from "./app-sidebar-client";
import { auth } from "@repo/features-auth/server";
import { getCurrentUserResource } from "@repo/features-iam/server";
import { getNavigation } from "@/configuration/navigation";

export async function AppSidebar() {
  const session = await auth();

  const navigation = await getNavigation(session);
  const currentUser = await getCurrentUserResource();

  return (
    <AppSidebarClient currentUser={currentUser.data} navigation={navigation} />
  );
}
