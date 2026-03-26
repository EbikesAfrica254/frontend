"use client";

import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { generateItemsFromPath } from "@repo/shared/client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/primitives/breadcrumb";

const HOME_HREF = "/dashboard";
const HOME_LABEL = "Home";

const SEGMENT_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  orders: "Orders",
  drafts: "Drafts",
  incidents: "Incidents",
  reassignments: "Reassignments",
  iam: "Identity & Access",
  users: "Users",
  outbox: "Outbox",
};

// segments that exist only as nav containers — no page.tsx at their route
const NON_NAVIGABLE_SEGMENTS = new Set(["iam"]);

export function AppBreadcrumbs() {
  const pathname = usePathname();

  if (pathname === HOME_HREF) {
    return null;
  }

  const items = generateItemsFromPath(pathname, SEGMENT_LABELS).map((item) => {
    const segment = item.href?.split("/").filter(Boolean).pop();
    if (segment && NON_NAVIGABLE_SEGMENTS.has(segment)) {
      return { ...item, href: undefined };
    }
    return item;
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={HOME_HREF}>{HOME_LABEL}</BreadcrumbLink>
        </BreadcrumbItem>
        {items.map((item, index) => (
          <Fragment key={item.href ?? `item-${index}`}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {item.href ? (
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
