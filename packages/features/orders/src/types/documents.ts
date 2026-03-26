import { DocumentType } from "./enums";

export interface ConfirmDocumentUploadRequest {
  fileSizeBytes: number;
  mimeType: string;
}

export interface DocumentResponse {
  id: string;
  branchId: string;
  createdAt: string;
  documentType: DocumentType;
  fileName: string;
  fileSizeBytes: number;
  fileStorageUrl: string;
  mimeType: string;
  organizationId: string;
  status: "PENDING" | "UPLOADED";
  uploadedAt: string;
  version: number;
}

export interface DocumentUploadInfo {
  documentType: DocumentType;
  expiryDate?: string;
  fileName: string;
  fileSizeBytes: number;
  key: string;
  mimeType: string;
}

export interface InitiateDocumentUploadRequest {
  branchId: string;
  contentType: string;
  documentType: DocumentType;
  fileName: string;
  organizationId: string;
}

export interface InitiateDocumentUploadResponse {
  documentId: string;
  expiryTime: string;
  key: string;
  signedHeaders: Record<string, string[]>;
  url: string;
}
