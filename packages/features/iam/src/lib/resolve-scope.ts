import "server-only";

import { getServerSession } from "next-auth";
import { createAuthOptions } from "@repo/features-auth/server";

import type { OperationalScope } from "../types/scope";
import { resolveScope } from "../utilities/scope-helpers";

export async function getOperationalScope(): Promise<OperationalScope | null> {
  const session = await getServerSession(createAuthOptions());
  return resolveScope(session);
}
