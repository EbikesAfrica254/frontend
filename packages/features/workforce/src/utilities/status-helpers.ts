import {
  AvailabilityStatus,
  CertificationType,
  DocumentStatus,
} from "../types/enums";

type BadgeVariant = "default" | "destructive" | "outline" | "secondary";

export function getAvailabilityStatusBadge(status: AvailabilityStatus): {
  label: string;
  variant: BadgeVariant;
} {
  const statusMap: Record<
    AvailabilityStatus,
    { label: string; variant: BadgeVariant }
  > = {
    [AvailabilityStatus.AVAILABLE]: { label: "Available", variant: "default" },
    [AvailabilityStatus.BUSY]: { label: "Busy", variant: "secondary" },
    [AvailabilityStatus.DEACTIVATED]: {
      label: "Deactivated",
      variant: "destructive",
    },
    [AvailabilityStatus.OFFLINE]: { label: "Offline", variant: "outline" },
    [AvailabilityStatus.PENDING]: { label: "Pending", variant: "outline" },
    [AvailabilityStatus.SUSPENDED]: {
      label: "Suspended",
      variant: "destructive",
    },
    [AvailabilityStatus.UNAVAILABLE]: {
      label: "Unavailable",
      variant: "secondary",
    },
  };

  return statusMap[status];
}

export function getDocumentStatusBadge(status: DocumentStatus): {
  label: string;
  variant: BadgeVariant;
} {
  const statusMap: Record<
    DocumentStatus,
    { label: string; variant: BadgeVariant }
  > = {
    [DocumentStatus.ACTIVE]: { label: "Active", variant: "default" },
    [DocumentStatus.EXPIRED]: { label: "Expired", variant: "destructive" },
    [DocumentStatus.PENDING]: { label: "Pending", variant: "outline" },
    [DocumentStatus.REPLACED]: { label: "Replaced", variant: "secondary" },
    [DocumentStatus.UPLOADED]: { label: "Uploaded", variant: "default" },
  };

  return statusMap[status];
}

export function getCertificationTypeBadge(type: CertificationType): {
  label: string;
  variant: BadgeVariant;
} {
  const typeMap: Record<
    CertificationType,
    { label: string; variant: BadgeVariant }
  > = {
    [CertificationType.DEFENSIVE_DRIVING]: {
      label: "Defensive Driving",
      variant: "secondary",
    },
    [CertificationType.FIRST_AID]: { label: "First Aid", variant: "secondary" },
    [CertificationType.GOOD_CONDUCT_CERTIFICATE]: {
      label: "Good Conduct",
      variant: "outline",
    },
    [CertificationType.NTSA_DRIVING_LICENSE_CLASS_BCE]: {
      label: "NTSA License (BCE)",
      variant: "default",
    },
    [CertificationType.NTSA_DRIVING_LICENSE_CLASS_G]: {
      label: "NTSA License (G)",
      variant: "default",
    },
  };

  return typeMap[type];
}

export function getSuspensionStatusBadge(isActive: boolean): {
  label: string;
  variant: BadgeVariant;
} {
  return isActive
    ? { label: "Active", variant: "destructive" }
    : { label: "Lifted", variant: "outline" };
}

export function formatCertificationType(type: CertificationType): string {
  const labels: Record<CertificationType, string> = {
    [CertificationType.DEFENSIVE_DRIVING]: "Defensive Driving",
    [CertificationType.FIRST_AID]: "First Aid",
    [CertificationType.GOOD_CONDUCT_CERTIFICATE]: "Certificate of Good Conduct",
    [CertificationType.NTSA_DRIVING_LICENSE_CLASS_BCE]:
      "NTSA Driving License (Class BCE)",
    [CertificationType.NTSA_DRIVING_LICENSE_CLASS_G]:
      "NTSA Driving License (Class G)",
  };

  return labels[type] ?? type;
}
