import "server-only";

import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { getServerSession } from "next-auth/next";
import { createAuthOptions } from "./auth-options";

export async function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  if (args.length === 0) {
    return getServerSession(createAuthOptions());
  }

  const [req, res] = args;
  return getServerSession(req, res, createAuthOptions());
}
