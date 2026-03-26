"use client";

import { Bike, Package, Truck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";

interface BottomNavItem {
  href: string;
  icon: LucideIcon;
  label: string;
}

const BOTTOM_NAV_ITEMS: BottomNavItem[] = [
  { href: "/e-bikes", icon: Bike, label: "E-Bikes" },
  { href: "/beba-ai", icon: Package, label: "BEBA AI" },
  { href: "/delivery", icon: Truck, label: "Delivery" },
];

export function StickyBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background lg:hidden"
    >
      <div className="flex items-center justify-around">
        {BOTTOM_NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className="flex flex-1 flex-col items-center gap-1 py-3 text-xs font-medium transition-colors hover:text-primary"
            >
              <Icon
                className={`h-5 w-5 ${isActive ? "text-primary" : "text-muted-foreground"}`}
              />
              <span
                className={isActive ? "text-primary" : "text-muted-foreground"}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
