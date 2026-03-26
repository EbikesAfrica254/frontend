"use server";

import { withAction } from "@repo/shared/actions";
import {
  confirmDocumentUploadResource,
  downloadDocumentResource,
  initiateDocumentUploadResource,
} from "../resources/documents";
import type {
  ConfirmDocumentUploadRequest,
  InitiateDocumentUploadRequest,
} from "../types/documents";

export const confirmDocumentUpload = withAction(
  async (documentId: string, data: ConfirmDocumentUploadRequest) => {
    return await confirmDocumentUploadResource(documentId, data);
  },
);

export const downloadDocument = withAction(async (id: string) => {
  return await downloadDocumentResource(id);
});

export const initiateDocumentUpload = withAction(
  async (data: InitiateDocumentUploadRequest) => {
    return await initiateDocumentUploadResource(data);
  },
);
