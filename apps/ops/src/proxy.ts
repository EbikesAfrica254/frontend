import { withAuth } from "next-auth/middleware";
import { validateAudience } from "@repo/features-auth/server";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      const { pathname } = req.nextUrl;

      const isPublicRoute =
        pathname.startsWith("/api/auth") ||
        pathname.startsWith("/auth/error") ||
        pathname === "/";

      if (isPublicRoute) {
        return true;
      }

      if (!token) {
        return false;
      }

      if (!validateAudience(token.aud, "ebikes-ops")) {
        console.warn("Invalid audience for ops app:", token.aud);
        return false;
      }

      return true;
    },
  },
  pages: {
    signIn: "/api/auth/signin",
  },
});

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
