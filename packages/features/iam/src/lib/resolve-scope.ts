import "server-only";

import { getServerSession } from "next-auth";
import { authOptions } from "@repo/features-auth/server";

import type { OperationalScope } from "../types/scope";
import { resolveScope } from "../utilities/scope-helpers";

export async function getOperationalScope(): Promise<OperationalScope | null> {
  const session = await getServerSession(authOptions);
  return resolveScope(session);
}
