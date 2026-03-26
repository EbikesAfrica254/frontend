import "server-only";

import { authenticatedOrdersFetch } from "./core/orders-fetch";
import {
  ConfirmDocumentUploadRequest,
  DocumentResponse,
  InitiateDocumentUploadRequest,
  InitiateDocumentUploadResponse,
} from "../types/documents";
import { SuccessResponse } from "@repo/shared/server";

export async function confirmDocumentUploadResource(
  documentId: string,
  data: ConfirmDocumentUploadRequest,
): Promise<SuccessResponse<DocumentResponse>> {
  return authenticatedOrdersFetch<SuccessResponse<DocumentResponse>>(
    `/documents/${documentId}/confirm`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    },
  );
}

export async function downloadDocumentResource(
  id: string,
): Promise<SuccessResponse<string>> {
  return authenticatedOrdersFetch<SuccessResponse<string>>(
    `/documents/${id}/download`,
  );
}

export async function initiateDocumentUploadResource(
  data: InitiateDocumentUploadRequest,
): Promise<SuccessResponse<InitiateDocumentUploadResponse>> {
  return authenticatedOrdersFetch<
    SuccessResponse<InitiateDocumentUploadResponse>
  >("/documents/upload/initiate", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
