import "next-auth";
import "next-auth/jwt";
import type {AuthToken, AuthUser} from "./keycloak";

declare module "next-auth" {
    interface Session {
        accessToken: string;
        aud?: string | string[];
        error?: "RefreshAccessTokenError";
        user: AuthUser;
    }
}

declare module "next-auth/jwt" {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface JWT extends AuthToken {
    }
}
