import "server-only";

import type { RegistrationType } from "../types/enums";
import { DocumentType } from "../types/enums";

import { SuccessResponse } from "@repo/shared/server";
import { authenticatedOrganizationsFetch } from "./core/organizations-fetch";
import type {
  DocumentUploadConfirmationRequest,
  DocumentUploadInitiationRequest,
  DocumentUploadInitiationResponse,
} from "../types/documents";

export async function confirmDocumentReplacementResource(
  id: string,
  body: DocumentUploadConfirmationRequest,
): Promise<SuccessResponse<void>> {
  return authenticatedOrganizationsFetch<SuccessResponse<void>>(
    `/documents/${id}/confirm-replacement`,
    {
      body: JSON.stringify(body),
      method: "PUT",
    },
  );
}

export async function confirmDocumentUploadResource(
  id: string,
  body: DocumentUploadConfirmationRequest,
): Promise<SuccessResponse<void>> {
  return authenticatedOrganizationsFetch<SuccessResponse<void>>(
    `/documents/${id}/confirm-upload`,
    {
      body: JSON.stringify(body),
      method: "PUT",
    },
  );
}

export async function downloadDocumentResource(
  id: string,
): Promise<SuccessResponse<{ downloadUrl: string }>> {
  return authenticatedOrganizationsFetch<
    SuccessResponse<{ downloadUrl: string }>
  >(`/documents/${id}/download`);
}

export async function getRequiredDocumentsResource(
  registrationType: RegistrationType,
): Promise<SuccessResponse<DocumentType[]>> {
  return authenticatedOrganizationsFetch<SuccessResponse<DocumentType[]>>(
    `/documents/registration-types/${registrationType}/required-documents`,
  );
}

export async function initiateDocumentUploadResource(
  body: DocumentUploadInitiationRequest,
): Promise<SuccessResponse<DocumentUploadInitiationResponse>> {
  return authenticatedOrganizationsFetch<
    SuccessResponse<DocumentUploadInitiationResponse>
  >(`/documents/initiate-upload`, {
    body: JSON.stringify(body),
    method: "POST",
  });
}

export async function replaceDocumentResource(
  id: string,
  body: DocumentUploadInitiationRequest,
): Promise<SuccessResponse<DocumentUploadInitiationResponse>> {
  return authenticatedOrganizationsFetch<
    SuccessResponse<DocumentUploadInitiationResponse>
  >(`/documents/${id}/replace`, {
    body: JSON.stringify(body),
    method: "POST",
  });
}
