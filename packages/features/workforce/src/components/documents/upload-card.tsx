"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { confirmDocumentUpload, initiateDocumentUpload } from "../../actions";
import { formatDocumentType } from "../../utilities/document-helpers";
import type { DocumentType } from "../../types/enums";
import type { DocumentUploadInfo } from "../../types/documents";

const ACCEPTED_MIME_TYPES = {
  "application/pdf": [".pdf"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
} as const;

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

type UploadState =
  | { stage: "idle" }
  | { stage: "uploading"; file: File; progress: number }
  | { stage: "confirming"; file: File }
  | { stage: "done"; info: DocumentUploadInfo }
  | { stage: "error"; message: string };

interface DocumentUploadCardProps {
  documentType: DocumentType;
  onUploaded: (info: DocumentUploadInfo) => void;
}

export function DocumentUploadCard({
  documentType,
  onUploaded,
}: DocumentUploadCardProps) {
  const [state, setState] = useState<UploadState>({ stage: "idle" });

  const uploadToPresignedUrl = useCallback(
    (url: string, file: File): Promise<void> => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            setState({ file, progress, stage: "uploading" });
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve();
          } else {
            reject(new Error(`S3 upload failed with status ${xhr.status}`));
          }
        };

        xhr.onerror = () => reject(new Error("Network error during upload"));

        xhr.open("PUT", url);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.send(file);
      });
    },
    [],
  );

  const handleUpload = useCallback(
    async (file: File) => {
      setState({ file, stage: "uploading", progress: 0 });

      try {
        const initiateResult = await initiateDocumentUpload({
          contentType: file.type,
          documentType,
          fileName: file.name,
        });

        if (!initiateResult.success) {
          throw new Error(initiateResult.error ?? "Failed to initiate upload");
        }

        const { documentId, key, url } = initiateResult.data;

        await uploadToPresignedUrl(url, file);

        setState({ file, stage: "confirming" });

        const confirmResult = await confirmDocumentUpload(documentId, {
          fileSizeBytes: file.size,
          mimeType: file.type,
        });

        if (!confirmResult.success) {
          throw new Error(confirmResult.error ?? "Failed to confirm upload");
        }

        const info: DocumentUploadInfo = {
          documentType,
          fileName: file.name,
          fileSizeBytes: file.size,
          key,
          mimeType: file.type,
        };

        setState({ info, stage: "done" });
        onUploaded(info);
        toast.success(`${file.name} uploaded successfully`);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Upload failed";
        setState({ message, stage: "error" });
        toast.error(message);
      }
    },
    [documentType, onUploaded, uploadToPresignedUrl],
  );

  const isActive = state.stage === "uploading" || state.stage === "confirming";
  const isDone = state.stage === "done";

  const { getInputProps, getRootProps, isDragActive, isDragReject } =
    useDropzone({
      accept: ACCEPTED_MIME_TYPES,
      disabled: isActive || isDone,
      maxFiles: 1,
      maxSize: MAX_FILE_SIZE_BYTES,
      onDrop: useCallback(
        (acceptedFiles: File[]) => {
          const file = acceptedFiles[0];
          if (!file) return;
          void handleUpload(file);
        },
        [handleUpload],
      ),
      onDropRejected: (rejections) => {
        const message = rejections[0]?.errors[0]?.message ?? "Invalid file";
        setState({ message, stage: "error" });
        toast.error(message);
      },
    });

  const label = formatDocumentType(documentType);

  return (
    <div
      {...getRootProps()}
      aria-label={`Upload ${label}`}
      className={[
        "relative flex min-h-[120px] flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-8 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isDragActive && !isDragReject ? "border-primary bg-primary/5" : "",
        isDragReject || state.stage === "error"
          ? "border-destructive/60 bg-destructive/5"
          : "",
        !isDragActive && state.stage !== "error"
          ? "border-muted-foreground/25"
          : "",
        isDone
          ? "border-green-400/60 bg-green-50 dark:bg-green-950/30 cursor-default"
          : "",
        isActive
          ? "cursor-not-allowed opacity-70"
          : !isDone
            ? "cursor-pointer hover:border-muted-foreground/50 hover:bg-muted/30"
            : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <input {...getInputProps()} />

      {state.stage === "idle" && (
        <>
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-muted">
            <svg
              className="h-5 w-5 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          <p className="text-sm font-medium">
            {isDragActive ? "Drop file here" : "Drag & drop or click to upload"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            PDF, JPEG, or PNG up to 10 MB
          </p>
        </>
      )}

      {state.stage === "uploading" && (
        <div className="w-full space-y-2">
          <p className="text-sm font-medium">{state.file.name}</p>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-primary transition-all duration-150"
              style={{ width: `${state.progress}%` }}
              role="progressbar"
              aria-valuenow={state.progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Uploading... {state.progress}%
          </p>
        </div>
      )}

      {state.stage === "confirming" && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div
            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
          <span>Confirming upload...</span>
        </div>
      )}

      {state.stage === "done" && (
        <>
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
            <svg
              className="h-5 w-5 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-sm font-medium text-green-700 dark:text-green-400">
            {state.info.fileName}
          </p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setState({ stage: "idle" });
            }}
            className="mt-2 text-xs text-muted-foreground underline-offset-4 hover:underline"
          >
            Replace file
          </button>
        </>
      )}

      {state.stage === "error" && (
        <>
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
            <svg
              className="h-5 w-5 text-destructive"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-sm font-medium text-destructive">
            {state.message}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Click or drop to try again
          </p>
        </>
      )}
    </div>
  );
}
