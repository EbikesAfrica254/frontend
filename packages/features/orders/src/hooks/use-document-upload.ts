"use client";

import { useState } from "react";
import type {
  ConfirmDocumentUploadRequest,
  DocumentUploadInfo,
  InitiateDocumentUploadRequest,
  InitiateDocumentUploadResponse,
} from "../types/documents";

export interface UseDocumentUploadConfig {
  confirmUpload: (
    documentId: string,
    params: ConfirmDocumentUploadRequest,
  ) => Promise<void>;
  initiateUpload: (
    params: InitiateDocumentUploadRequest,
  ) => Promise<
    Pick<InitiateDocumentUploadResponse, "documentId" | "key" | "url">
  >;
}

interface UploadDocumentParams {
  branchId?: string;
  documentType: InitiateDocumentUploadRequest["documentType"];
  file: File;
  onProgress?: (progress: number) => void;
  organizationId: string;
}

function uploadToS3(
  presignedUrl: string,
  file: File,
  onProgress?: (progress: number) => void,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable && onProgress) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    });

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}`));
      }
    });

    xhr.addEventListener("error", () => {
      reject(new Error("Network error during upload"));
    });

    xhr.open("PUT", presignedUrl);
    xhr.setRequestHeader("Content-Type", file.type || "text/csv");
    xhr.send(file);
  });
}

export function useDocumentUpload(config: UseDocumentUploadConfig) {
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const uploadDocument = async (
    params: UploadDocumentParams,
  ): Promise<DocumentUploadInfo> => {
    setError(null);
    setIsUploading(true);

    try {
      console.log("uploading document", params);
      const { documentId, key, url } = await config.initiateUpload({
        branchId: params.branchId,
        contentType: params.file.type || "text/csv",
        documentType: params.documentType,
        fileName: params.file.name,
        organizationId: params.organizationId,
      });

      await uploadToS3(url, params.file, params.onProgress);

      await config.confirmUpload(documentId, {
        fileSizeBytes: params.file.size,
        mimeType: params.file.type || "text/csv",
      });

      return {
        documentType: params.documentType,
        fileName: params.file.name,
        fileSizeBytes: params.file.size,
        key,
        mimeType: params.file.type || "text/csv",
      };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Document upload failed";
      setError(message);
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  return { error, isUploading, uploadDocument };
}
