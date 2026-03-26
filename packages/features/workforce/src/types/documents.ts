import { DocumentStatus, DocumentType } from "./enums";

export interface DocumentPreviewResponse {
  documentType: DocumentType;
  expiryDate?: string;
  fileName: string;
  id: string;
  mimeType: string;
  organizationId: string;
  previewUrl: string;
  previewUrlExpiresAt: string;
  status: DocumentStatus;
  uploadedAt: string;
}

export interface DocumentUploadInfo {
  documentType: DocumentType;
  expiryDate?: string;
  fileName: string;
  fileSizeBytes: number;
  key: string;
  mimeType: string;
}

export interface DocumentSummaryResponse {
  documentType: DocumentType;
  expiryDate?: string;
  fileName: string;
  fileSizeBytes: number;
  id: string;
  mimeType: string;
  status: DocumentStatus;
  uploadedAt: string;
}

export interface UploadInitiationResponse {
  documentId: string;
  expiryTime: string;
  key: string;
  signedHeaders: Record<string, string[]>;
  url: string;
}

export interface InitiateUploadRequest {
  contentType: string;
  documentType: DocumentType;
  fileName: string;
}

export interface ConfirmUploadRequest {
  expiryDate?: string;
  fileSizeBytes: number;
  mimeType: string;
}
