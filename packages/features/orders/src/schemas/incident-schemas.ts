import { z } from "zod";
import { IncidentType } from "../types/enums";

export const reportIncidentSchema = z.object({
  agentId: z.string().min(1, "Agent is required"),
  incidentType: z.enum(IncidentType, { error: "Incident type is required" }),
  lastKnownLatitude: z.number().min(-90).max(90).optional(),
  lastKnownLongitude: z.number().min(-180).max(180).optional(),
  notes: z.string().optional(),
});

export type ReportIncidentFormData = z.infer<typeof reportIncidentSchema>;
