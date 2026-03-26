import { DocumentUploadInfo } from "./documents";
import { ContactStatus, DraftStatus } from "./enums";

export interface CreateDraftsFromDocumentRequest {
  branchId: string;
  document: DocumentUploadInfo;
  organizationId: string;
  organizationName: string;
  pickupAddress: string;
  pickupLatitude: number;
  pickupLongitude: number;
}

export interface DeliveryPortalResponse {
  draft: DraftDetailResponse;
  deliveryToken: string | null;
}

export interface DraftDetailResponse {
  id: string;
  branchId: string;
  contactStatus: ContactStatus;
  createdAt: string;
  currency: string;
  customerId: string | null;
  customerPhone: string;
  deliveryAddress: string | null;
  deliveryLatitude: number | null;
  deliveryLongitude: number | null;
  documentId: string | null;
  expiresAt: string;
  items: DraftItemResponse[];
  organizationId: string;
  pickupAddress: string;
  pickupLatitude: number;
  pickupLongitude: number;
  status: DraftStatus;
  version: number;
}

export interface DraftItemResponse {
  id: string;
  createdAt: string;
  description: string | null;
  externalReference: string | null;
  rowNumber: number;
  weight: number | null;
}

export interface DraftSummaryResponse {
  id: string;
  branchId: string;
  contactStatus: ContactStatus;
  createdAt: string;
  customerPhone: string;
  expiresAt: string;
  itemCount: number;
  organizationId: string;
  status: DraftStatus;
}

export interface UpdateDeliveryLocationRequest {
  deliveryAddress: string;
  deliveryLatitude: number;
  deliveryLongitude: number;
}
