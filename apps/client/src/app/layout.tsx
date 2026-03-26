import "./globals.css";
import { Toaster } from "@repo/ui/primitives/sonner";
import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import React from "react";
import { NuqsAdapter } from "nuqs/adapters/next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    template: "%s | eBikes Dashboard",
    default: "Dashboard",
  },
  description: "Manage your eBikes operations",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <NuqsAdapter>{children}</NuqsAdapter>
        <Toaster />
      </body>
    </html>
  );
}
