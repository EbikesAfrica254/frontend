import type {
  ComplianceStatus,
  OrganizationStatus,
  RegistrationType,
} from "./enums";
import type { DocumentUploadInfo } from "./documents";

export interface AddressRequest {
  addressTag: string;
  city: string;
  country: string;
  latitude?: number;
  longitude?: number;
  postalCode?: string;
  streetAddress: string;
}

export interface AddressResponse {
  addressTag: string;
  city: string;
  country: string;
  id: string;
  latitude?: number;
  longitude?: number;
  postalCode?: string;
  streetAddress: string;
}

export interface CreateOrganizationRequest {
  addresses: AddressRequest[];
  displayName: string;
  documents: DocumentUploadInfo[];
  email: string;
  incorporationDate?: string;
  kraPin?: string;
  legalName: string;
  phoneNumber: string;
  registrationNumber?: string;
  registrationType: RegistrationType;
}

export interface DeactivateOrganizationRequest {
  reason: string;
}

export interface OrganizationResponse {
  addresses: AddressResponse[];
  complianceStatus: ComplianceStatus;
  createdAt: string;
  createdBy: string;
  displayName: string;
  email: string;
  id: string;
  incorporationDate?: string;
  kraPin?: string;
  legalName: string;
  phoneNumber: string;
  registrationNumber?: string;
  registrationType: RegistrationType;
  status: OrganizationStatus;
  updatedAt: string;
  updatedBy: string;
}

export interface OrganizationSummaryResponse {
  complianceStatus: ComplianceStatus;
  createdAt: string;
  createdBy: string;
  displayName: string;
  email: string;
  id: string;
  legalName: string;
  phoneNumber: string;
  registrationType: RegistrationType;
  status: OrganizationStatus;
  updatedAt: string;
  updatedBy: string;
}

export interface UpdateOrganizationRequest {
  addresses?: AddressRequest[];
  displayName?: string;
  documents?: DocumentUploadInfo[];
  email?: string;
  incorporationDate?: string;
  kraPin?: string;
  legalName?: string;
  phoneNumber?: string;
  registrationNumber?: string;
  registrationType?: RegistrationType;
}
