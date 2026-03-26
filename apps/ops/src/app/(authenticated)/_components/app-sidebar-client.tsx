"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Building2 } from "lucide-react";
import { NavMain } from "@repo/ui/navigation/nav-main";
import { NavUser } from "@repo/ui/navigation/nav-user";
import { generateAvatarFallback, getContrastColor } from "@repo/ui";
import type {
  NavigationConfig,
  NavigationGroup,
} from "@repo/ui/types/navigation";
import { getIconComponent } from "@repo/ui/types/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@repo/ui/primitives/sidebar";
import { Avatar, AvatarFallback } from "@repo/ui/primitives/avatar";
import type { UserProfileResponse } from "@repo/features-iam/client";
import { federatedLogout } from "@repo/features-auth/client";
import { useActivePath } from "@repo/shared/client";

interface AppSidebarClientProps {
  currentUser: UserProfileResponse;
  navigation: NavigationConfig[];
}

export function AppSidebarClient({
  currentUser,
  navigation,
}: AppSidebarClientProps) {
  const { isAncestorOf, isLeafActive } = useActivePath();
  const { open } = useSidebar();

  const organizationName = currentUser.activeMembership.organizationName;

  const fallbackStyle = useMemo(() => {
    const bgColor = generateAvatarFallback(
      currentUser.activeMembership.organizationId,
    );
    return {
      backgroundColor: bgColor,
      color: getContrastColor(bgColor),
    };
  }, [currentUser.activeMembership.organizationId]);

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
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="cursor-default">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg" style={fallbackStyle}>
                  <Building2 className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              {open && (
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {organizationName}
                  </span>
                </div>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
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
