import type { Session } from "next-auth";
import type { NavigationConfig } from "@repo/ui/types/navigation";
import { canAccessMakerChecker, resolveScope } from "@repo/features-iam/client";

export async function getNavigation(
  session: Session | null,
): Promise<NavigationConfig[]> {
  if (!session) return [];

  const scope = resolveScope(session);
  const isSystemScope = scope?.kind === "system";
  const showMakerChecker = canAccessMakerChecker(session);

  return [
    {
      id: "core",
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
      id: "fleet",
      label: "Fleet",
      items: [
        {
          href: "/workforce",
          iconName: "Motorbike",
          label: "Agents",
          items: [
            { href: "/workforce/agents", label: "Registry" },
            { href: "/workforce/preferred-agents", label: "Preferred Agents" },
          ],
        },
      ],
    },
    {
      id: "operations",
      label: "Operations",
      items: [
        {
          href: "/orders",
          iconName: "PackageSearch",
          label: "Orders",
          items: [
            { href: "/orders", label: "All Orders" },
            { href: "/orders/drafts", label: "Drafts" },
            { href: "/orders/incidents", label: "Incidents" },
            { href: "/orders/reassignments", label: "Reassignments" },
          ],
        },
        {
          href: "/organizations",
          iconName: "Building2",
          label: "Organizations",
          items: [
            { href: "/organizations", label: "Registry" },
            { href: "/organizations/outbox", label: "Outbox" },
          ],
        },
        ...(showMakerChecker
          ? [
              {
                href: "/maker-checker",
                iconName: "GitPullRequestArrow",
                label: "Approvals",
                items: [
                  { href: "/maker-checker/requests", label: "Requests" },
                  ...(isSystemScope
                    ? [{ href: "/maker-checker/outbox", label: "Outbox" }]
                    : []),
                ],
              },
            ]
          : []),
      ],
    },
    {
      id: "system",
      label: "System",
      items: [
        {
          href: "/iam",
          iconName: "ShieldCheck",
          label: "Identity & Access",
          items: [
            { href: "/iam/users", label: "Users" },
            { href: "/iam/outbox", label: "Outbox" },
          ],
        },
        {
          href: "/notifications",
          iconName: "BellRing",
          label: "Notifications",
          items: [
            { href: "/notifications", label: "Messages" },
            { href: "/notifications/templates", label: "Templates" },
            ...(isSystemScope
              ? [{ href: "/notifications/outbox", label: "Outbox" }]
              : []),
          ],
        },
      ],
    },
  ];
}
