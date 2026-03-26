"use client";

import { Eye, FileText } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@repo/ui/primitives/button";
import { formatDocumentType } from "../../utilities/document-helpers";
import type { DocumentPreviewResponse } from "../../types/documents";
import { DocumentPreviewSheet } from "./document-preview-sheet";
import { DocumentStatusBadge } from "./status-badge";

interface DocumentCardProps {
  document: DocumentPreviewResponse;
}

export function DocumentCard({ document }: DocumentCardProps) {
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <>
      <div className="flex items-start justify-between rounded-lg border bg-card p-3 gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted">
            <FileText className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="min-w-0 space-y-1">
            <p className="text-sm font-medium leading-none">
              {formatDocumentType(document.documentType)}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {document.fileName}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2">
          <DocumentStatusBadge status={document.status} />
          <Button
            variant="ghost"
            size="sm"
            className="h-7 gap-1.5 px-2 text-xs"
            onClick={() => setPreviewOpen(true)}
          >
            <Eye className="h-3.5 w-3.5" />
            Preview
          </Button>
        </div>
      </div>

      <DocumentPreviewSheet
        expiresAt={document.previewUrlExpiresAt}
        fileName={document.fileName}
        mimeType={document.mimeType}
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        previewUrl={document.previewUrl}
      />
    </>
  );
}
