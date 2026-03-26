import { DocumentType } from "../types/enums";

export function formatDocumentType(type: DocumentType): string {
  const labels: Record<DocumentType, string> = {
    [DocumentType.DEFENSIVE_DRIVING_CERTIFICATE_COPY]:
      "Defensive Driving Certificate",
    [DocumentType.FIRST_AID_CERTIFICATE_COPY]: "First Aid Certificate",
    [DocumentType.GOOD_CONDUCT_CERTIFICATE_COPY]: "Certificate of Good Conduct",
    [DocumentType.MOTORCYCLE_LICENSE_COPY]: "Motorcycle License",
    [DocumentType.NATIONAL_ID_BACK]: "National ID (Back)",
    [DocumentType.NATIONAL_ID_FRONT]: "National ID (Front)",
    [DocumentType.VEHICLE_LICENSE_COPY]: "Vehicle License",
  };

  return labels[type] ?? type;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export function getDaysUntilExpiry(expiryDate?: string): number | null {
  if (!expiryDate) return null;

  const expiry = new Date(expiryDate);
  if (isNaN(expiry.getTime())) return null;

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  expiry.setHours(0, 0, 0, 0);

  const diffTime = expiry.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function isDocumentExpired(expiryDate?: string): boolean {
  if (!expiryDate) return false;

  const days = getDaysUntilExpiry(expiryDate);
  return days !== null && days < 0;
}

export function isDocumentExpiringSoon(
  expiryDate?: string,
  daysThreshold: number = 30,
): boolean {
  if (!expiryDate) return false;

  const days = getDaysUntilExpiry(expiryDate);
  return days !== null && days >= 0 && days <= daysThreshold;
}

export function isInstantExpired(iso: string): boolean {
  const ts = new Date(iso).getTime();
  return isNaN(ts) ? true : Date.now() > ts;
}

export function isSafeUrl(url: string): boolean {
  try {
    return new URL(url).protocol === "https:";
  } catch {
    return false;
  }
}
