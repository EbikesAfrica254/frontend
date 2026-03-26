"use server";

import { withAction } from "@repo/shared/actions";
import {
  confirmDocumentReplacementResource,
  confirmDocumentUploadResource,
  getDocumentDownloadUrlResource,
  getRequiredDocumentsResource,
  initiateDocumentReplacementResource,
  initiateDocumentUploadResource,
} from "../resources/documents";
import type { CapabilityClass } from "../types/enums";
import type {
  ConfirmUploadRequest,
  InitiateUploadRequest,
} from "../types/documents";

export const initiateDocumentUpload = withAction(
  async (body: InitiateUploadRequest) => {
    return await initiateDocumentUploadResource(body);
  },
);

export const confirmDocumentUpload = withAction(
  async (documentId: string, body: ConfirmUploadRequest) => {
    return await confirmDocumentUploadResource(documentId, body);
  },
);

export const getRequiredDocuments = withAction(
  async (capabilityClass: CapabilityClass) => {
    return await getRequiredDocumentsResource(capabilityClass);
  },
);

export const getDocumentDownloadUrl = withAction(async (documentId: string) => {
  return await getDocumentDownloadUrlResource(documentId);
});

export const initiateDocumentReplacement = withAction(
  async (documentId: string, body: InitiateUploadRequest) => {
    return await initiateDocumentReplacementResource(documentId, body);
  },
);

export const confirmDocumentReplacement = withAction(
  async (documentId: string, body: ConfirmUploadRequest) => {
    return await confirmDocumentReplacementResource(documentId, body);
  },
);
