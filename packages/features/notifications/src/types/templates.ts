import type {
  NotificationChannel,
  TemplateContentType,
  TemplateVariableType,
} from "./enums";

export interface CreateTemplateRequest {
  bodyTemplate: string;
  channel: NotificationChannel;
  contentType: TemplateContentType;
  name: string;
  subject?: string;
  variableDefinitions: TemplateVariable[];
}

export interface TemplateResponse {
  bodyTemplate: string;
  channel: NotificationChannel;
  contentType: TemplateContentType;
  createdAt: string;
  createdBy: string;
  id: string;
  isActive: boolean;
  name: string;
  subject?: string;
  updatedAt: string;
  updatedBy: string;
  variableDefinitions: TemplateVariable[];
  version: number;
}

export interface TemplateSummaryResponse {
  channel: NotificationChannel;
  contentType: TemplateContentType;
  createdAt: string;
  createdBy: string;
  id: string;
  isActive: boolean;
  name: string;
  updatedAt: string;
  updatedBy: string;
  version: number;
}

export interface TemplateVariable {
  description: string;
  name: string;
  required?: boolean;
  sensitive?: boolean;
  type: TemplateVariableType;
}

export interface UpdateTemplateRequest {
  bodyTemplate: string;
  subject?: string;
  variableDefinitions: TemplateVariable[];
}
