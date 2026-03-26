import "server-only";
import type {GetServerSidePropsContext, NextApiRequest, NextApiResponse,} from "next";
import {getServerSession} from "next-auth/next";
import {authOptions} from "./auth-options";

/**
 * Server-side session retrieval helper for NextAuth v4
 *
 * Usage:
 * - In Server Components (App Router): `await auth()`
 * - In API Routes: `await auth(req, res)`
 * - In getServerSideProps: `await auth(context.req, context.res)`
 */
export async function auth(
    ...args:
        | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
        | [NextApiRequest, NextApiResponse]
        | []
) {
    if (args.length === 0) {
        return getServerSession(authOptions);
    }

    const [req, res] = args;
    return getServerSession(req, res, authOptions);
}
