"use client";

import {ChevronRight, Power} from "lucide-react";
import React, {useMemo} from "react";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "../primitives/sidebar";
import {Avatar, AvatarFallback} from "../primitives/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../primitives/dropdown-menu";
import {
    generateAvatarFallback,
    getContrastColor,
    getUserInitials,
} from "../../utilities";

interface MembershipResponse {
    id: string;
    branchId?: string;
    branchName?: string;
    isPrimary: boolean;
    keycloakGroupPath: string;
    keycloakUserId: string;
    organizationId: string;
    organizationName: string;
    roles: string[];
    userExtensionId: string;
}

enum UserStatus {
    ACTIVE = "ACTIVE",
    DELETED = "DELETED",
    INACTIVE = "INACTIVE",
}

interface NavUserProps {
    loading?: boolean;
    onLogout: () => void;
    user?: {
        id: string;
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        countryCode: string;
        phoneNumber: string;
        emailVerified: boolean;
        phoneNumberVerified: boolean;
        status: UserStatus;
        activeMembership: MembershipResponse;
        memberships: MembershipResponse[];
        createdAt: string;
        updatedAt: string;
    };
}

export function NavUser({loading = false, onLogout, user}: NavUserProps) {
    const {open} = useSidebar();

    // Derive display name from firstName + lastName, fallback to username
    const userName = useMemo(() => {
        if (!user) return "User";
        const fullName = `${user.firstName} ${user.lastName}`.trim();
        return fullName || user.username;
    }, [user]);

    const userInitials = useMemo(() => getUserInitials(userName), [userName]);
    const userEmail = user?.email || "";

    // Display primary role or role count
    const userRole = useMemo(() => {
        if (!user?.activeMembership?.roles?.length) return "User";
        const roles = user.activeMembership.roles;
        if (roles.length === 1) return roles[0];
        return `${roles[0]} +${roles.length - 1}`;
    }, [user?.activeMembership?.roles]);

    // Generate consistent color-coded avatar fallback
    const fallbackStyle = useMemo(() => {
        if (!user?.id) return {};

        const bgColor = generateAvatarFallback(user.id);
        const textColor = getContrastColor(bgColor);

        return {
            backgroundColor: bgColor,
            color: textColor,
        };
    }, [user?.id]);

    if (loading) {
        return (
            <SidebarMenu>
                <SidebarMenuItem>
                    <div className="flex items-center gap-2 px-2 py-1.5">
                        <div className="h-8 w-8 animate-pulse rounded-full bg-sidebar-accent"/>
                        {open && (
                            <div className="flex flex-1 flex-col gap-1">
                                <div className="h-4 w-24 animate-pulse rounded bg-sidebar-accent"/>
                                <div className="h-3 w-16 animate-pulse rounded bg-sidebar-accent"/>
                            </div>
                        )}
                    </div>
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
                        >
                            <Avatar className="h-8 w-8 rounded-full">
                                <AvatarFallback className="rounded-full" style={fallbackStyle}>
                                    {userInitials}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{userName}</span>
                                <span className="truncate text-xs text-muted-foreground">
                  {userRole}
                </span>
                            </div>
                            <ChevronRight className="ml-auto size-4"/>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side="bottom"
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-full">
                                    <AvatarFallback
                                        className="rounded-full"
                                        style={fallbackStyle}
                                    >
                                        {userInitials}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{userName}</span>
                                    <span className="truncate text-xs text-muted-foreground">
                    {userEmail}
                  </span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem
                            className="cursor-pointer text-destructive focus:text-destructive"
                            onSelect={onLogout}
                        >
                            <Power/>
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
