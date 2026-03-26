import type { CertificationType } from "./enums";

export interface CreateCertificationRequest {
  certificationType: CertificationType;
  expiresAt?: string;
  issuedAt: string;
  issuedBy: string;
  notes?: string;
  referenceNumber?: string;
}

export interface CertificationDetailResponse {
  certificationType: CertificationType;
  createdAt: string;
  expiresAt?: string;
  id: string;
  issuedAt: string;
  issuedBy: string;
  notes?: string;
  referenceNumber?: string;
}
