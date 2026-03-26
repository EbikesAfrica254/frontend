export enum Decision {
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum EntityType {
  DOCUMENT = "DOCUMENT",
  ORGANIZATION = "ORGANIZATION",
}

export enum FieldType {
  BOOLEAN = "BOOLEAN",
  DATE = "DATE",
  ENUM = "ENUM",
  NUMBER = "NUMBER",
  OBJECT = "OBJECT",
  STRING = "STRING",
}

export enum OutboxStatus {
  DEAD_LETTER = "DEAD_LETTER",
  PENDING = "PENDING",
  SENT = "SENT",
  FAILED = "FAILED",
}

export enum RequestStatus {
  APPROVED = "APPROVED",
  CANCELLED = "CANCELLED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}
