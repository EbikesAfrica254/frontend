"use server";

import { revalidatePath } from "next/cache";
import { withAction } from "@repo/shared/actions";
import {
  createCertificationResource,
  getCertificationResource,
  getCertificationsResource,
} from "../resources/certifications";
import type { CreateCertificationRequest } from "../types/certifications";

export const createCertification = withAction(
  async (agentId: string, body: CreateCertificationRequest) => {
    const result = await createCertificationResource(agentId, body);

    revalidatePath(`/workforce/agents/${agentId}`);

    return result;
  },
);

export const getCertifications = withAction(async (agentId: string) => {
  return await getCertificationsResource(agentId);
});

export const getCertification = withAction(
  async (agentId: string, certificationId: string) => {
    return await getCertificationResource(agentId, certificationId);
  },
);
