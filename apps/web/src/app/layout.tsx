import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "@repo/ui/primitives/sonner";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { NewsletterSection } from "@/components/newsletter-section";
import { StickyBottomNav } from "@/components/sticky-bottom-nav";
import "./globals.css";
import React from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "eBikes Africa - Move Goods Affordably",
  description:
    "AI-powered electric two-wheeler platform for sustainable mobility",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <NuqsAdapter>
          <SiteHeader />
          <main>{children}</main>
          <NewsletterSection />
          <SiteFooter />
          <StickyBottomNav />
          <Toaster />
        </NuqsAdapter>
      </body>
    </html>
  );
}
