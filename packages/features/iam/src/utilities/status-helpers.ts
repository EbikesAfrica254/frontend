import { UserStatus } from "../types/enums";

type BadgeVariant = "default" | "destructive" | "outline" | "secondary";

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
