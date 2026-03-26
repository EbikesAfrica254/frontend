import type { LocationSource } from "./enums";

export interface UpdateLocationRequest {
  latitude: number;
  longitude: number;
}

export interface LocationHistoryEntry {
  createdAt: string;
  h3Index: string;
  id: string;
  latitude: number;
  longitude: number;
  source: LocationSource;
}
