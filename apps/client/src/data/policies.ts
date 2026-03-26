export interface ConsentMetadata {
  timestamp: string;
  termsVersion: string;
  privacyVersion: string;
  userAgent: string;
}

export interface PolicyData {
  id: string;
  type: "terms" | "privacy";
  version: string;
  effectiveDate: string;
  lastUpdated: string;
  content: string;
}
