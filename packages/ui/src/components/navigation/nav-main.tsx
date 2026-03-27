"use client";

import React, { useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "../../utilities";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/ui/primitives/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@repo/ui/primitives/sidebar";
import { NavigationGroup } from "../../types";

interface NavMainProps {
  items: NavigationGroup[];
  linkComponent?: React.ComponentType<{
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }>;
}

export function NavMain({ items, linkComponent }: NavMainProps) {
  const Link = linkComponent || "a";

  const initialOpenItems = useMemo(() => {
    const openSet = new Set<string>();
    for (const group of items) {
      for (const item of group.items) {
        if (item.isOpen || item.items?.some((subItem) => subItem.isActive)) {
          openSet.add(item.href ?? item.label);
        }
      }
    }
    return Array.from(openSet);
  }, [items]);

  const [openItems, setOpenItems] = useState<string[]>(initialOpenItems);

  const toggleItem = (key: string) => {
    setOpenItems((prev) =>
      prev.includes(key) ? prev.filter((i) => i !== key) : [...prev, key],
    );
  };

  return (
    <>
      {items.map((group) => (
        <SidebarGroup key={group.id}>
          <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {group.items.map((item) => {
                const hasSubItems = item.items && item.items.length > 0;

                if (hasSubItems) {
                  return (
                    <NavItemWithSubItems
                      key={item.href ?? item.label}
                      item={item}
                      Link={Link}
                      isOpen={openItems.includes(item.href ?? item.label)}
                      onToggle={() => toggleItem(item.href ?? item.label)}
                    />
                  );
                }

                return (
                  <NavItemSimple key={item.href} item={item} Link={Link} />
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}

interface NavItemWithSubItemsProps {
  item: NavigationGroup["items"][0];
  Link: React.ComponentType<{ href: string; children: React.ReactNode }> | "a";
  isOpen: boolean;
  onToggle: () => void;
}

function NavItemWithSubItems({
  item,
  Link,
  isOpen,
  onToggle,
}: NavItemWithSubItemsProps) {
  const isAnySubItemActive = item.items?.some((subItem) => subItem.isActive);
  const shouldHighlight = item.isActive || isAnySubItemActive;

  return (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            isActive={false}
            className={cn(
              "transition-all duration-200",
              shouldHighlight && "border-r-[3px] border-sidebar-primary",
            )}
          >
            <item.icon />
            <span>{item.label}</span>
            <ChevronRight
              className={cn(
                "ml-auto h-4 w-4 transition-transform duration-200",
                isOpen && "rotate-90",
              )}
            />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items?.map((subItem) => (
              <SidebarMenuSubItem key={subItem.href}>
                <SidebarMenuSubButton asChild isActive={subItem.isActive}>
                  <Link href={subItem.href}>{subItem.label}</Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

interface NavItemSimpleProps {
  item: NavigationGroup["items"][0];
  Link: React.ComponentType<{ href: string; children: React.ReactNode }> | "a";
}

function NavItemSimple({ item, Link }: NavItemSimpleProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild={!!item.href}
        isActive={item.isActive}
        className={cn(
          "transition-all duration-200",
          item.isActive && "border-r-[3px] border-sidebar-primary",
        )}
      >
        {item.href ? (
          <Link href={item.href}>
            <item.icon />
            <span>{item.label}</span>
          </Link>
        ) : (
          <>
            <item.icon />
            <span>{item.label}</span>
          </>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
