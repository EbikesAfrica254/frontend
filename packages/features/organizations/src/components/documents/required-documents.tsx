"use client";

import React, { useEffect } from "react";
import { useRequiredDocuments } from "../../hooks/use-required-documents";
import { formatDocumentType } from "../../utilities/document-helpers";
import type { DocumentType, RegistrationType } from "../../types/enums";
import { DocumentUploadCard } from "./upload-card";
import type { DocumentUploadInfo } from "../../types/documents";

interface RequiredDocumentsProps {
  onDocumentsChange: (documents: DocumentUploadInfo[]) => void;
  onDocumentTypesResolved?: (types: DocumentType[]) => void;
  registrationType: RegistrationType | null;
  uploadedDocuments: DocumentUploadInfo[];
}

export function RequiredDocuments({
  onDocumentsChange,
  onDocumentTypesResolved,
  registrationType,
  uploadedDocuments,
}: RequiredDocumentsProps) {
  const { documentTypes, error, isLoading } =
    useRequiredDocuments(registrationType);

  useEffect(() => {
    onDocumentTypesResolved?.(documentTypes);
  }, [documentTypes, onDocumentTypesResolved]);

  const handleUploaded = (info: DocumentUploadInfo) => {
    const updated = [
      ...uploadedDocuments.filter((d) => d.documentType !== info.documentType),
      info,
    ];
    onDocumentsChange(updated);
  };

  const getUploadedInfo = (
    type: DocumentType,
  ): DocumentUploadInfo | undefined =>
    uploadedDocuments.find((d) => d.documentType === type);

  if (!registrationType) {
    return (
      <div className="rounded-md border border-dashed p-6 text-center">
        <p className="text-sm text-muted-foreground">
          Select a registration type to see the required documents.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        <span>Loading required documents...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md border border-destructive/50 bg-destructive/5 p-4">
        <p className="text-sm text-destructive">
          Failed to load required documents: {error}
        </p>
      </div>
    );
  }

  if (documentTypes.length === 0) {
    return (
      <div className="rounded-md border border-dashed p-6 text-center">
        <p className="text-sm text-muted-foreground">
          No documents required for this registration type.
        </p>
      </div>
    );
  }

  const uploadedCount = documentTypes.filter(
    (dt) => !!getUploadedInfo(dt),
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Required Documents</h3>
        <span className="text-sm text-muted-foreground">
          {uploadedCount} of {documentTypes.length} uploaded
        </span>
      </div>

      <div className="space-y-6">
        {documentTypes.map((documentType) => {
          const uploaded = getUploadedInfo(documentType);

          return (
            <div key={documentType} className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {formatDocumentType(documentType)}
                </span>
                {uploaded && (
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                    Uploaded
                  </span>
                )}
              </div>
              <DocumentUploadCard
                documentType={documentType}
                onUploaded={handleUploaded}
              />
            </div>
          );
        })}
      </div>

      {uploadedCount === documentTypes.length && documentTypes.length > 0 && (
        <div className="flex items-center gap-3 rounded-md border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
            <svg
              className="h-4 w-4 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-sm font-medium text-green-800 dark:text-green-300">
            All required documents uploaded
          </p>
        </div>
      )}
    </div>
  );
}
