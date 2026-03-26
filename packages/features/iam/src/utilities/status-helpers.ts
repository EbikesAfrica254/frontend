import { OutboxStatus, UserStatus } from "../types/enums";

type BadgeVariant = "default" | "destructive" | "outline" | "secondary";

export function getOrganizationStatusBadge(
  isActive: boolean,
  deletedAt?: string,
): { label: string; variant: BadgeVariant } {
  if (deletedAt) {
    return { label: "Deleted", variant: "destructive" };
  }

  if (!isActive) {
    return { label: "Inactive", variant: "secondary" };
  }

  return { label: "Active", variant: "default" };
}

export function getUserStatusBadge(status: UserStatus): {
  label: string;
  variant: BadgeVariant;
} {
  const statusMap: Record<
    UserStatus,
    { label: string; variant: BadgeVariant }
  > = {
    [UserStatus.ACTIVE]: { label: "Active", variant: "default" },
    [UserStatus.DELETED]: { label: "Deleted", variant: "destructive" },
    [UserStatus.INACTIVE]: { label: "Inactive", variant: "secondary" },
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
    [OutboxStatus.DEAD_LETTER]: { label: "Dead Letter", variant: "outline" },
    [OutboxStatus.PENDING]: { label: "Pending", variant: "secondary" },
    [OutboxStatus.SENT]: { label: "Sent", variant: "default" },
    [OutboxStatus.FAILED]: { label: "Failed", variant: "destructive" },
  };

  return statusMap[status];
}
