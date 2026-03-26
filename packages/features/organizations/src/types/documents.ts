import type { DocumentStatus, DocumentType } from "./enums";

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

export interface DocumentResponse {
  createdAt: string;
  createdBy: string;
  documentType: DocumentType;
  expiryDate?: string;
  fileName: string;
  fileSizeBytes: number;
  id: string;
  mimeType: string;
  organizationId: string;
  status: DocumentStatus;
  updatedAt: string;
  updatedBy: string;
}

export interface DocumentSummaryResponse {
  documentType: DocumentType;
  expiryDate?: string;
  fileName: string;
  id: string;
  organizationId: string;
  status: DocumentStatus;
  uploadedAt: string;
}

export interface DocumentUploadConfirmationRequest {
  fileSizeBytes: number;
  mimeType: string;
}

export interface DocumentUploadInfo {
  documentType: DocumentType;
  expiryDate?: string;
  fileName: string;
  fileSizeBytes: number;
  key: string;
  mimeType: string;
}

export interface DocumentUploadInitiationRequest {
  contentType: string;
  documentType: DocumentType;
  fileName: string;
}

export interface DocumentUploadInitiationResponse {
  documentId: string;
  key: string;
  url: string;
}
