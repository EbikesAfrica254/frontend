"use client";

import Link from "next/link";

import { OrganizationSwitcher } from "./organization-switcher";
import { getIconComponent, NavigationConfig, NavigationGroup } from "@repo/ui";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@repo/ui/primitives/sidebar";
import { UserProfileResponse } from "@repo/features-iam/client";
import { federatedLogout } from "@repo/features-auth/client";
import { useActivePath } from "@repo/shared/client";
import { useMemo } from "react";
import { NavMain } from "@repo/ui/navigation/nav-main";
import { NavUser } from "@repo/ui/navigation/nav-user";

interface AppSidebarClientProps {
  currentUser: UserProfileResponse;
  navigation: NavigationConfig[];
}

export function AppSidebarClient({
  currentUser,
  navigation,
}: AppSidebarClientProps) {
  const { isAncestorOf, isLeafActive } = useActivePath();
  const handleLogout = async () => {
    await federatedLogout();
  };

  const navigationGroups: NavigationGroup[] = useMemo(
    () =>
      navigation.map((group) => ({
        ...group,
        items: group.items.map((item) => {
          const hasChildren = !!item.items?.length;

          return {
            href: hasChildren ? undefined : item.href,
            icon: getIconComponent(item.iconName),
            label: item.label,
            isActive: hasChildren ? false : isLeafActive(item.href),
            isOpen: hasChildren ? isAncestorOf(item.href) : undefined,
            items: item.items?.map((subItem) => ({
              href: subItem.href,
              label: subItem.label,
              isActive: isLeafActive(subItem.href),
            })),
          };
        }),
      })),
    [isAncestorOf, isLeafActive, navigation],
  );

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <OrganizationSwitcher profile={currentUser} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navigationGroups} linkComponent={Link} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={currentUser} onLogout={handleLogout} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
