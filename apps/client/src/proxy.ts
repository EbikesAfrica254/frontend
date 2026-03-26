import { withAuth } from "next-auth/middleware";
import { validateAudience } from "@repo/features-auth/client";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      const { pathname } = req.nextUrl;
      const publicRoutes = ["/", "/signup", "/privacy", "/terms"];
      const isVerificationRoute = pathname.startsWith("/verify");
      const isDeliveryRoute = pathname.startsWith("/delivery");
      const isPublicRoute = publicRoutes.includes(pathname);

      if (isPublicRoute || isVerificationRoute || isDeliveryRoute) {
        return true;
      }

      if (!token) {
        return false;
      }

      if (!validateAudience(token.aud, "ebikes-client")) {
        console.warn("Invalid audience for client app:", token.aud);
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
