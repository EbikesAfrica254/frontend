import "server-only";

import { SuccessResponse } from "@repo/shared/server";
import { authenticatedWorkforceFetch } from "./core/workforce-fetch";
import type { CapabilityClass } from "../types/enums";
import type {
  ConfirmUploadRequest,
  InitiateUploadRequest,
  UploadInitiationResponse,
} from "../types/documents";
import type { DocumentType } from "../types/enums";

export async function initiateDocumentUploadResource(
  body: InitiateUploadRequest,
): Promise<SuccessResponse<UploadInitiationResponse>> {
  return authenticatedWorkforceFetch<SuccessResponse<UploadInitiationResponse>>(
    `/documents/initiate-upload`,
    {
      body: JSON.stringify(body),
      method: "POST",
    },
  );
}

export async function confirmDocumentUploadResource(
  documentId: string,
  body: ConfirmUploadRequest,
): Promise<SuccessResponse<void>> {
  return authenticatedWorkforceFetch<SuccessResponse<void>>(
    `/documents/${documentId}/confirm-upload`,
    {
      body: JSON.stringify(body),
      method: "PUT",
    },
  );
}

export async function getDocumentDownloadUrlResource(
  documentId: string,
): Promise<SuccessResponse<string>> {
  return authenticatedWorkforceFetch<SuccessResponse<string>>(
    `/documents/${documentId}/download`,
  );
}

export async function getRequiredDocumentsResource(
  capabilityClass: CapabilityClass,
): Promise<SuccessResponse<DocumentType[]>> {
  return authenticatedWorkforceFetch<SuccessResponse<DocumentType[]>>(
    `/documents/capability-classes/${capabilityClass}/required-documents`,
  );
}

export async function initiateDocumentReplacementResource(
  documentId: string,
  body: InitiateUploadRequest,
): Promise<SuccessResponse<UploadInitiationResponse>> {
  return authenticatedWorkforceFetch<SuccessResponse<UploadInitiationResponse>>(
    `/documents/${documentId}/replace`,
    {
      body: JSON.stringify(body),
      method: "POST",
    },
  );
}

export async function confirmDocumentReplacementResource(
  documentId: string,
  body: ConfirmUploadRequest,
): Promise<SuccessResponse<void>> {
  return authenticatedWorkforceFetch<SuccessResponse<void>>(
    `/documents/${documentId}/confirm-replacement`,
    {
      body: JSON.stringify(body),
      method: "PUT",
    },
  );
}
