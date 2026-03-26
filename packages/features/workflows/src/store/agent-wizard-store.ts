import { create } from "zustand";

import type { CreateAgentFormData } from "@repo/features-workforce/client";
import type {
  CapabilityClass,
  DocumentType,
} from "@repo/features-workforce/client";
import { AGENT_WIZARD_LAST_STEP } from "../lib/agent-wizard-steps";

export type AgentInfoData = Omit<CreateAgentFormData, "documents" | "userId">;

type DocumentData = CreateAgentFormData["documents"][number];

export interface AgentWizardState {
  currentStep: number;
  userId: string | null;
  agentInfo: AgentInfoData | null;
  capabilityClass: CapabilityClass | null;
  documents: DocumentData[];
  requiredDocumentTypes: DocumentType[];
  setUserId: (userId: string) => void;
  setAgentInfo: (info: AgentInfoData) => void;
  setDocuments: (documents: DocumentData[]) => void;
  setRequiredDocumentTypes: (types: DocumentType[]) => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
  reset: () => void;
  toFormData: () => CreateAgentFormData | null;
}

const initialState = {
  currentStep: 0,
  userId: null,
  agentInfo: null,
  capabilityClass: null,
  documents: [],
  requiredDocumentTypes: [],
} satisfies Omit<
  AgentWizardState,
  | "setUserId"
  | "setAgentInfo"
  | "setDocuments"
  | "setRequiredDocumentTypes"
  | "nextStep"
  | "previousStep"
  | "goToStep"
  | "reset"
  | "toFormData"
>;

export const useAgentWizardStore = create<AgentWizardState>((set, get) => ({
  ...initialState,

  setUserId: (userId) => set({ userId }),

  setAgentInfo: (info) => {
    const previousCapabilityClass = get().capabilityClass;
    const capabilityClassChanged =
      previousCapabilityClass !== info.capabilityClass;

    set({
      agentInfo: info,
      capabilityClass: info.capabilityClass,
      ...(capabilityClassChanged && {
        documents: [],
        requiredDocumentTypes: [],
      }),
    });
  },

  setDocuments: (documents) => set({ documents }),

  setRequiredDocumentTypes: (types) => set({ requiredDocumentTypes: types }),

  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, AGENT_WIZARD_LAST_STEP),
    })),

  previousStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 0),
    })),

  goToStep: (step) =>
    set({ currentStep: Math.max(0, Math.min(step, AGENT_WIZARD_LAST_STEP)) }),

  reset: () => set(initialState),

  toFormData: () => {
    const { userId, agentInfo, documents } = get();

    if (!userId || !agentInfo) {
      return null;
    }

    return {
      ...agentInfo,
      userId,
      documents,
    };
  },
}));
