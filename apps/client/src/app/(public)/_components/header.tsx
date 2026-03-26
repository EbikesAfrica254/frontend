"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap } from "lucide-react";
import { Button } from "@repo/ui/primitives/button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const NAV_LINKS = [
    { href: "/signup", label: "Sign Up" },
    { href: "/api/auth/signin/keycloak", label: "Log In" },
  ];

  return (
    <header className="w-full bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm">
      <div className=" px-4 h-16 flex ">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Zap className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">EBIKES AFRICA</span>
        </Link>

        <div className="hidden md:flex items-center gap-3 flex-1 justify-end">
          {NAV_LINKS.map((link) => (
            <Button asChild key={link.href} variant="ghost">
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              href="/"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            ></Link>
          </nav>
        </div>
      )}
    </header>
  );
}
