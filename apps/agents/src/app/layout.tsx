import "./globals.css";
import { Toaster } from "@repo/ui/primitives/sonner";
import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { ReactNode } from "react";
import { NuqsAdapter } from "nuqs/adapters/next";
import { Providers } from "@/providers/session-provider";
import { sessionUtilities } from "@/utilities/session-utilities";
import {
  NotificationProvider,
  SseConnectionProvider,
} from "@repo/features-notifications/client";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    template: "%s | eBikes Agents",
    default: "Agents",
  },
  description: "eBikes Africa field agent app",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await sessionUtilities();

  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <Providers session={session}>
          <NuqsAdapter>
            <NotificationProvider>
              <SseConnectionProvider>{children}</SseConnectionProvider>
            </NotificationProvider>
          </NuqsAdapter>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
