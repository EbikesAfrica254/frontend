"use client";

import { useSidebar } from "../primitives/sidebar";
import { cn } from "../../utilities";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/ui/primitives/tooltip";
import type { LucideIcon } from "lucide-react";
import React from "react";

interface SidebarBrandProps {
  icon?: LucideIcon;
  logo?: string;
  name?: string;
}

export function NavHeader({ icon: Icon, logo, name }: SidebarBrandProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const brandContent = (
    <div className="flex h-14 items-center px-4 transition-all duration-200 group-data-[collapsible=icon]:justify-center">
      {logo ? (
        <img
          src={logo}
          alt={name}
          className={cn(
            "transition-all duration-200",
            isCollapsed ? "h-8 w-8" : "h-10 w-auto",
          )}
        />
      ) : Icon ? (
        <Icon
          className={cn(
            "text-sidebar-primary shrink-0 transition-all duration-200",
            isCollapsed ? "size-6" : "size-8",
          )}
        />
      ) : null}
      <span
        className={cn(
          "ml-3 text-lg font-semibold transition-all duration-200 overflow-hidden whitespace-nowrap",
          "group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:ml-0",
        )}
      >
        {name}
      </span>
    </div>
  );

  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{brandContent}</TooltipTrigger>
        <TooltipContent side="right">
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return brandContent;
}
