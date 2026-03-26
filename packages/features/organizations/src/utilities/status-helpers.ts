import {
  BranchStatus,
  ComplianceStatus,
  DocumentStatus,
  OrganizationStatus,
  OutboxStatus,
} from "../types/enums";

type BadgeVariant = "default" | "destructive" | "outline" | "secondary";

export function getBranchStatusBadge(status: BranchStatus): {
  label: string;
  variant: BadgeVariant;
} {
  const statusMap: Record<
    BranchStatus,
    { label: string; variant: BadgeVariant }
  > = {
    [BranchStatus.ACTIVE]: { label: "Active", variant: "default" },
    [BranchStatus.DEACTIVATED]: {
      label: "Deactivated",
      variant: "destructive",
    },
    [BranchStatus.SUSPENDED]: { label: "Suspended", variant: "secondary" },
  };

  return statusMap[status];
}

export function getComplianceStatusBadge(status: ComplianceStatus): {
  label: string;
  variant: BadgeVariant;
} {
  const statusMap: Record<
    ComplianceStatus,
    { label: string; variant: BadgeVariant }
  > = {
    [ComplianceStatus.COMPLIANT]: { label: "Compliant", variant: "default" },
    [ComplianceStatus.NON_COMPLIANT]: {
      label: "Non-Compliant",
      variant: "destructive",
    },
    [ComplianceStatus.SUSPENDED]: { label: "Suspended", variant: "secondary" },
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

export function getOrganizationStatusBadge(status: OrganizationStatus): {
  label: string;
  variant: BadgeVariant;
} {
  const statusMap: Record<
    OrganizationStatus,
    { label: string; variant: BadgeVariant }
  > = {
    [OrganizationStatus.ACTIVE]: { label: "Active", variant: "default" },
    [OrganizationStatus.APPROVED]: { label: "Approved", variant: "default" },
    [OrganizationStatus.DEACTIVATED]: {
      label: "Deactivated",
      variant: "destructive",
    },
    [OrganizationStatus.PENDING_APPROVAL]: {
      label: "Pending Approval",
      variant: "outline",
    },
    [OrganizationStatus.REJECTED]: {
      label: "Rejected",
      variant: "destructive",
    },
  };

  return statusMap[status];
}

export function getOutboxStatusBadge(status: OutboxStatus): {
  label: string;
  variant: BadgeVariant;
} {
  const statusMap: Record<
    OutboxStatus,
    { label: string; variant: BadgeVariant }
  > = {
    [OutboxStatus.FAILED]: { label: "Failed", variant: "destructive" },
    [OutboxStatus.PENDING]: { label: "Pending", variant: "outline" },
    [OutboxStatus.SENT]: { label: "Sent", variant: "default" },
  };

  return statusMap[status];
}
