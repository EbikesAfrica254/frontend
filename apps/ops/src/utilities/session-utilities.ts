import "server-only";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { getServerSession } from "next-auth/next";
import { opsAuthOptions } from "@/app/api/auth/[...nextauth]/route";

export async function sessionUtilities(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  if (args.length === 0) {
    return getServerSession(opsAuthOptions);
  }

  const [req, res] = args;
  return getServerSession(req, res, opsAuthOptions);
}
