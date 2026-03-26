export enum OutboxStatus {
  DEAD_LETTER = "DEAD_LETTER",
  PENDING = "PENDING",
  SENT = "SENT",
  FAILED = "FAILED",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  DELETED = "DELETED",
  INACTIVE = "INACTIVE",
}
