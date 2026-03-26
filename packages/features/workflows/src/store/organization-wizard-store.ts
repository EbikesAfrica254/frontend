import { create } from "zustand";

import { ORGANIZATION_WIZARD_LAST_STEP } from "../lib/organization-wizard-steps";
import {
  CreateOrganizationFormData,
  DocumentType,
  RegistrationType,
} from "@repo/features-organizations/client";

export type OrganizationInfoData = Omit<
  CreateOrganizationFormData,
  "registrationType" | "addresses" | "documents"
>;

type AddressData = CreateOrganizationFormData["addresses"][number];
type DocumentData = CreateOrganizationFormData["documents"][number];

export interface OrganizationWizardState {
  currentStep: number;
  registrationType: RegistrationType | null;
  organizationInfo: OrganizationInfoData | null;
  addresses: AddressData[];
  documents: DocumentData[];
  ownerId: string | null;
  requiredDocumentTypes: DocumentType[];
  setRegistrationType: (type: RegistrationType) => void;
  setOrganizationInfo: (
    info: OrganizationInfoData,
    addresses: AddressData[],
  ) => void;
  setDocuments: (documents: DocumentData[]) => void;
  setOwnerId: (ownerId: string) => void;
  setRequiredDocumentTypes: (types: DocumentType[]) => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
  reset: () => void;
  toFormData: () => CreateOrganizationFormData | null;
}

const initialState = {
  currentStep: 0,
  registrationType: null,
  organizationInfo: null,
  addresses: [],
  documents: [],
  ownerId: null,
  requiredDocumentTypes: [],
} satisfies Omit<
  OrganizationWizardState,
  | "setRegistrationType"
  | "setOrganizationInfo"
  | "setDocuments"
  | "setOwnerId"
  | "setRequiredDocumentTypes"
  | "nextStep"
  | "previousStep"
  | "goToStep"
  | "reset"
  | "toFormData"
>;

export const useOrganizationWizardStore = create<OrganizationWizardState>(
  (set, get) => ({
    ...initialState,

    setRegistrationType: (type) =>
      set({
        registrationType: type,
        documents: [],
        requiredDocumentTypes: [],
      }),

    setOrganizationInfo: (info, addresses) =>
      set({ organizationInfo: info, addresses }),

    setDocuments: (documents) => set({ documents }),

    setOwnerId: (ownerId) => set({ ownerId }),

    setRequiredDocumentTypes: (types) => set({ requiredDocumentTypes: types }),

    nextStep: () =>
      set((state) => ({
        currentStep: Math.min(
          state.currentStep + 1,
          ORGANIZATION_WIZARD_LAST_STEP,
        ),
      })),

    previousStep: () =>
      set((state) => ({
        currentStep: Math.max(state.currentStep - 1, 0),
      })),

    goToStep: (step) =>
      set({
        currentStep: Math.max(0, Math.min(step, ORGANIZATION_WIZARD_LAST_STEP)),
      }),

    reset: () => set(initialState),

    toFormData: () => {
      const {
        registrationType,
        organizationInfo,
        addresses,
        documents,
        ownerId,
      } = get();

      if (
        !registrationType ||
        !organizationInfo ||
        addresses.length === 0 ||
        !ownerId
      ) {
        return null;
      }

      return {
        ...organizationInfo,
        ownerId,
        registrationType,
        addresses,
        documents,
      };
    },
  }),
);
