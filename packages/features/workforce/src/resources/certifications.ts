import "server-only";

import { SuccessResponse } from "@repo/shared/server";
import { authenticatedWorkforceFetch } from "./core/workforce-fetch";
import type {
  CreateCertificationRequest,
  CertificationDetailResponse,
} from "../types/certifications";

export async function createCertificationResource(
  agentId: string,
  body: CreateCertificationRequest,
): Promise<SuccessResponse<CertificationDetailResponse>> {
  return authenticatedWorkforceFetch<
    SuccessResponse<CertificationDetailResponse>
  >(`/agents/${agentId}/certifications`, {
    body: JSON.stringify(body),
    method: "POST",
  });
}

export async function getCertificationsResource(
  agentId: string,
): Promise<SuccessResponse<CertificationDetailResponse[]>> {
  return authenticatedWorkforceFetch<
    SuccessResponse<CertificationDetailResponse[]>
  >(`/agents/${agentId}/certifications`);
}

export async function getCertificationResource(
  agentId: string,
  certificationId: string,
): Promise<SuccessResponse<CertificationDetailResponse>> {
  return authenticatedWorkforceFetch<
    SuccessResponse<CertificationDetailResponse>
  >(`/agents/${agentId}/certifications/${certificationId}`);
}
