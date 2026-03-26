"use client";

import React, { useCallback } from "react";
import { useAgentWizardStore } from "../../../../store/agent-wizard-store";
import type {
  DocumentType,
  DocumentUploadInfo,
} from "@repo/features-workforce/client";
import { RequiredDocuments } from "@repo/features-workforce/client";

export function AgentDocumentsUploadStep() {
  const { capabilityClass, documents, setDocuments, setRequiredDocumentTypes } =
    useAgentWizardStore();

  const handleDocumentTypesResolved = useCallback(
    (types: DocumentType[]) => setRequiredDocumentTypes(types),
    [setRequiredDocumentTypes],
  );

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-semibold">Identity Documents</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload all required documents before proceeding. Each document must be
          a PDF, JPEG, or PNG up to 10 MB.
        </p>
      </div>

      <RequiredDocuments
        capabilityClass={capabilityClass}
        uploadedDocuments={documents}
        onDocumentsChange={(updated: DocumentUploadInfo[]) =>
          setDocuments(updated)
        }
        onDocumentTypesResolved={handleDocumentTypesResolved}
      />
    </div>
  );
}
