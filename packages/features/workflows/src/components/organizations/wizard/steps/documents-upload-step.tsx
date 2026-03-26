"use client";

import { useCallback } from "react";
import React from "react";
import { useOrganizationWizardStore } from "../../../../store/organization-wizard-store";
import {
  DocumentType,
  RequiredDocuments,
} from "@repo/features-organizations/client";
import { DocumentUploadInfo } from "@repo/features-organizations/client";

export function OrganizationDocumentsUploadStep() {
  const {
    registrationType,
    documents,
    setDocuments,
    setRequiredDocumentTypes,
  } = useOrganizationWizardStore();

  const handleDocumentTypesResolved = useCallback(
    (types: DocumentType[]) => setRequiredDocumentTypes(types),
    [setRequiredDocumentTypes],
  );

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-semibold">Compliance Documents</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload all required documents before proceeding. Each document must be
          a PDF, JPEG, or PNG up to 10 MB.
        </p>
      </div>

      <RequiredDocuments
        registrationType={registrationType}
        uploadedDocuments={documents}
        onDocumentsChange={(updated: DocumentUploadInfo[]) =>
          setDocuments(updated)
        }
        onDocumentTypesResolved={handleDocumentTypesResolved}
      />
    </div>
  );
}
