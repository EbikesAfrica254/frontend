"use server";

import { revalidatePath } from "next/cache";
import { withAction } from "@repo/shared/actions";
import {
  confirmDocumentReplacementResource,
  confirmDocumentUploadResource,
  getRequiredDocumentsResource,
  initiateDocumentUploadResource,
  replaceDocumentResource,
} from "../resources/documents";
import type {
  DocumentUploadConfirmationRequest,
  DocumentUploadInitiationRequest,
} from "../types/documents";
import { RegistrationType } from "../types/enums";

export const confirmDocumentReplacement = withAction(
  async (
    id: string,
    organizationId: string,
    body: DocumentUploadConfirmationRequest,
  ) => {
    const result = await confirmDocumentReplacementResource(id, body);

    revalidatePath(`/organizations/${organizationId}/documents`);

    return result;
  },
);

export const confirmDocumentUpload = withAction(
  async (id: string, body: DocumentUploadConfirmationRequest) => {
    console.log("confirmDocumentUpload", id, JSON.stringify(body, null, 2));
    const result = await confirmDocumentUploadResource(id, body);

    revalidatePath(`/organizations/${id}/documents`);

    return result;
  },
);

export const getRequiredDocuments = withAction(
  async (registrationType: RegistrationType) => {
    return getRequiredDocumentsResource(registrationType);
  },
);

export const initiateDocumentUpload = withAction(
  async (body: DocumentUploadInitiationRequest) => {
    return initiateDocumentUploadResource(body);
  },
);

export const replaceDocument = withAction(
  async (id: string, body: DocumentUploadInitiationRequest) => {
    const result = await replaceDocumentResource(id, body);

    revalidatePath(`/organizations/${id}/documents`);

    return result;
  },
);
