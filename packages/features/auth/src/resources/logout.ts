"use client";

import { signOut } from "next-auth/react";

/**
 * Performs federated logout: clears NextAuth session and Keycloak SSO
 * Client-side only - must be called from client components
 */
export async function federatedLogout(): Promise<void> {
  try {
    const response = await fetch("/api/auth/federated-logout", {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Federated logout failed");
    }

    const { url } = await response.json();

    await signOut({ redirect: false });
    window.location.href = url;
  } catch (error) {
    console.error("Federated logout error:", error);
    await signOut({ callbackUrl: "/" });
  }
}
