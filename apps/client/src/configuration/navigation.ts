import type { Session } from "next-auth";
import type { NavigationConfig } from "@repo/ui/types/navigation";
import { isBaseOrganization } from "@repo/features-iam/client";

export async function getNavigation(
  session: Session | null,
): Promise<NavigationConfig[]> {
  if (!session) return [];

  const isBaseContext = isBaseOrganization(session);

  return [
    {
      id: "home",
      label: "Home",
      items: [
        {
          href: "/dashboard",
          iconName: "Home",
          label: "Dashboard",
        },
      ],
    },
    {
      id: "account",
      label: "My Account",
      items: [
        {
          href: "/notifications/preferences",
          iconName: "Bell",
          label: "Notification Preferences",
        },
        {
          href: "/organizations",
          iconName: "Building2",
          label: isBaseContext ? "My Businesses" : "My Business",
        },
      ],
    },
  ];
}
