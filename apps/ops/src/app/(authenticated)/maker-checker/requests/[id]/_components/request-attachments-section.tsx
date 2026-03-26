import React from "react";
import type { DocumentPreviewResponse } from "@repo/features-organizations/client";
import { DocumentCard } from "@repo/features-organizations/client";

interface RequestAttachmentsSectionProps {
  entries: DocumentPreviewResponse[];
}

export function RequestAttachmentsSection({
  entries,
}: RequestAttachmentsSectionProps) {
  if (entries.length === 0) return null;

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-medium">Attachments</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {entries.map((document) => (
          <DocumentCard key={document.id} document={document} />
        ))}
      </div>
    </div>
  );
}
