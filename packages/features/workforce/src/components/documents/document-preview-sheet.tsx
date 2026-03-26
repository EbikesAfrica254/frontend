"use client";

import { Download, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@repo/ui/primitives/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@repo/ui/primitives/sheet";
import React from "react";

interface DocumentPreviewSheetProps {
  expiresAt: string; // ISO-8601 instant from previewUrlExpiresAt
  fileName: string;
  mimeType: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  previewUrl: string;
}

function isSafeUrl(url: string): boolean {
  try {
    const { protocol } = new URL(url);
    return protocol === "https:" || protocol === "http:";
  } catch {
    return false;
  }
}

export function DocumentPreviewSheet({
  expiresAt,
  fileName,
  mimeType,
  open,
  onOpenChange,
  previewUrl,
}: DocumentPreviewSheetProps) {
  const [renderError, setRenderError] = useState(false);

  const isExpired = useMemo(
    () => Date.now() > new Date(expiresAt).getTime(),
    [expiresAt],
  );

  const urlSafe = isSafeUrl(previewUrl);
  const isImage = mimeType.startsWith("image/");
  const isPdf = mimeType === "application/pdf";
  const canPreview = urlSafe && !isExpired && !renderError;

  function handleOpenChange(next: boolean) {
    if (!next) setRenderError(false);
    onOpenChange(next);
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 p-0 sm:max-w-2xl [&>button]:hidden"
      >
        <SheetHeader className="flex flex-row items-center gap-2 border-b px-4 py-3">
          <SheetTitle className="flex-1 truncate text-sm font-medium">
            {fileName}
          </SheetTitle>
          <SheetDescription className="sr-only">
            Preview of {fileName}
          </SheetDescription>
          {urlSafe && !isExpired && (
            <Button variant="outline" size="sm" className="shrink-0" asChild>
              {/*
               * NOTE: The `download` attribute is ignored for cross-origin URLs (S3).
               * To force a download prompt the presigned URL must include
               * ResponseContentDisposition: attachment; filename="…"
               * See: StorageService#generateDownloadUrl
               */}
              <a href={previewUrl} target="_blank" rel="noopener noreferrer">
                <Download className="mr-1.5 h-3.5 w-3.5" />
                Download
              </a>
            </Button>
          )}
          <SheetClose asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
              <X className="h-4 w-4" />
            </Button>
          </SheetClose>
        </SheetHeader>

        <div className="flex-1 overflow-auto p-4">
          {isExpired && (
            <div className="flex items-center justify-center py-16">
              <p className="text-sm text-muted-foreground">
                This preview link has expired. Refresh the page to load a new
                one.
              </p>
            </div>
          )}

          {!isExpired && renderError && (
            <div className="flex items-center justify-center py-16">
              <p className="text-sm text-muted-foreground">
                Preview could not be loaded.
              </p>
            </div>
          )}

          {canPreview && isPdf && (
            <iframe
              className="h-full min-h-[70vh] w-full rounded border"
              src={`${previewUrl}#toolbar=0`}
              title={fileName}
              onError={() => setRenderError(true)}
            />
          )}

          {canPreview && isImage && (
            <div className="flex items-center justify-center">
              <img
                alt={fileName}
                className="max-h-[80vh] w-auto max-w-full rounded border object-contain"
                src={previewUrl}
                onError={() => setRenderError(true)}
              />
            </div>
          )}

          {canPreview && !isPdf && !isImage && (
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
              <p className="text-sm text-muted-foreground">
                Preview is not available for this file type.
              </p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
