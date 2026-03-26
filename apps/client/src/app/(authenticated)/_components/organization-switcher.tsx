"use client";

import React, { useTransition } from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@repo/ui/primitives/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@repo/ui/primitives/dropdown-menu";
import { Avatar, AvatarFallback } from "@repo/ui/primitives/avatar";
import { Badge } from "@repo/ui/primitives/badge";
import { Building2, ChevronDown, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  generateAvatarFallback,
  getContrastColor,
  getUserInitials,
} from "@repo/ui";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import type { UserProfileResponse } from "@repo/features-iam/client";
import { switchContext } from "@repo/features-iam/actions";

interface OrganizationSwitcherProps {
  profile: UserProfileResponse;
}

export function OrganizationSwitcher({ profile }: OrganizationSwitcherProps) {
  const [isPending, startTransition] = useTransition();
  const { open } = useSidebar();
  const router = useRouter();
  const { update } = useSession();

  const currentOrganization = profile.activeMembership;
  const otherMemberships = profile.memberships.filter(
    (org) => org.organizationId !== currentOrganization.organizationId,
  );

  const handleSwitch = async (organizationId: string, branchId?: string) => {
    startTransition(async () => {
      const loadingToast = toast.loading("Switching organization...");

      try {
        const result = await switchContext({
          organizationId: organizationId,
          branchId: branchId,
        });

        if (!result.success) {
          toast.dismiss(loadingToast);
          toast.error(result.error || "Failed to switch organization");
          return;
        }

        // Trigger the jwt callback with trigger: "update", which calls
        // refreshAccessToken and persists the new session cookie bearing
        // the updated active_organization claim. Must resolve before
        // router.refresh() so that server components re-render against
        // the fresh session.
        await update();

        toast.dismiss(loadingToast);
        toast.success("Organization switched successfully");

        // Re-run server components against the now-updated session
        router.refresh();
      } catch (error) {
        toast.dismiss(loadingToast);
        toast.error(`Failed to switch organization: ${error}`);
      }
    });
  };

  if (profile.memberships.length === 0) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" className="cursor-default" disabled>
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarFallback className="rounded-lg">
                <Building2 className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            {open && (
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-muted-foreground">
                  No organizations
                </span>
              </div>
            )}
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  let organizationName = currentOrganization.organizationName;
  if (organizationName == "eBikes Africa") {
    organizationName = "Personal Account";
  }

  const fallbackStyle = (() => {
    const bgColor = generateAvatarFallback(currentOrganization.organizationId);
    const textColor = getContrastColor(bgColor);

    return {
      backgroundColor: bgColor,
      color: textColor,
    };
  })();

  if (profile.memberships.length === 1) {
    return (
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
                <span className="truncate text-xs text-muted-foreground">
                  {currentOrganization.isPrimary
                    ? "Primary Organization"
                    : "Organization"}
                </span>
              </div>
            )}
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              disabled={isPending}
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg" style={fallbackStyle}>
                  {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Building2 className="h-4 w-4" />
                  )}
                </AvatarFallback>
              </Avatar>
              {open && (
                <>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {organizationName}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {currentOrganization.isPrimary
                        ? "Primary Organization"
                        : "Active Organization"}
                    </span>
                  </div>
                  <ChevronDown className="ml-auto size-4" />
                </>
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-60 rounded-lg"
            side="bottom"
            align="start"
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Switch to
            </DropdownMenuLabel>
            {otherMemberships.map((membership) => {
              const initials = getUserInitials(membership.organizationName);
              const bgColor = generateAvatarFallback(membership.organizationId);
              const textColor = getContrastColor(bgColor);

              return (
                <DropdownMenuItem
                  key={membership.organizationId}
                  disabled={isPending}
                  className="gap-2 p-2 cursor-pointer"
                  onClick={() => handleSwitch(membership.organizationId)}
                >
                  <Avatar className="h-6 w-6 rounded-md">
                    <AvatarFallback
                      className="rounded-md text-xs"
                      style={{
                        backgroundColor: bgColor,
                        color: textColor,
                      }}
                    >
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-1 flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {membership.organizationName}
                      </span>
                      {membership.isPrimary && (
                        <Badge
                          variant="secondary"
                          className="h-4 px-1 text-[10px]"
                        >
                          Primary
                        </Badge>
                      )}
                    </div>
                  </div>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
