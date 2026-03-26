"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  type CreateDraftsFromDocumentFormData,
  createDraftsFromDocumentSchema,
  DocumentType,
  type DocumentUploadInfo,
  type UseDocumentUploadConfig,
  useDocumentUpload,
} from "@repo/features-orders/client";
import {
  type BranchSummaryResponse,
  OrganizationBranchSearch,
  type OrganizationSummaryResponse,
  OrganizationSearch,
} from "@repo/features-organizations/client";
import { geocodeAddress } from "@repo/shared/actions";
import { type ActionResult, type PaginatedResponse } from "@repo/shared/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/primitives/select";
import React, { useCallback, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  LocationSearchInput,
  LocationValue,
} from "@repo/ui/inputs/location-search";

interface CreateFromDocumentFormProps {
  branchId?: string;
  onFetchBranches?: (
    organizationId: string,
  ) => Promise<ActionResult<BranchSummaryResponse[]>>;
  onFetchOrganizations?: (
    query: string,
  ) => Promise<ActionResult<PaginatedResponse<OrganizationSummaryResponse>>>;
  onSubmit: (data: CreateDraftsFromDocumentFormData) => void | Promise<void>;
  organizationId?: string;
  organizationName?: string;
  uploadConfig: UseDocumentUploadConfig;
}

export function CreateFromDocumentForm({
  branchId,
  onFetchBranches,
  onFetchOrganizations,
  onSubmit,
  organizationId,
  organizationName,
  uploadConfig,
}: CreateFromDocumentFormProps) {
  const [selectedDocumentType, setSelectedDocumentType] =
    useState<DocumentType>(DocumentType.PARCELS_MANIFEST);
  const [uploadedDocument, setUploadedDocument] =
    useState<DocumentUploadInfo | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const {
    error: uploadError,
    isUploading,
    uploadDocument,
  } = useDocumentUpload(uploadConfig);

  const {
    control,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    register,
    resetField,
    setValue,
  } = useForm<CreateDraftsFromDocumentFormData>({
    defaultValues: {
      branchId,
      organizationId,
      organizationName,
      pickupAddress: "",
      pickupLatitude: 0,
      pickupLongitude: 0,
    },
    mode: "onChange",
    resolver: zodResolver(createDraftsFromDocumentSchema),
  });

  const watchedBranchId = useWatch({ control, name: "branchId" });
  const watchedOrganizationId = useWatch({ control, name: "organizationId" });
  const watchedPickupAddress = useWatch({ control, name: "pickupAddress" });
  const watchedPickupLatitude = useWatch({ control, name: "pickupLatitude" });
  const watchedPickupLongitude = useWatch({ control, name: "pickupLongitude" });

  const pickupLocationValue: LocationValue | null =
    watchedPickupAddress && watchedPickupLatitude && watchedPickupLongitude
      ? {
          address: watchedPickupAddress,
          latitude: watchedPickupLatitude,
          longitude: watchedPickupLongitude,
        }
      : null;

  const handleBranchChange = useCallback(
    (_value: string, branch: BranchSummaryResponse) => {
      setValue("branchId", branch.id, { shouldValidate: true });
    },
    [setValue],
  );

  const handleDocumentRemove = useCallback(() => {
    resetField("document");
    setUploadedDocument(null);
    setUploadProgress(0);
  }, [resetField]);

  const handleDocumentTypeChange = useCallback((value: string) => {
    setSelectedDocumentType(value as DocumentType);
  }, []);

  const handleFileSelect = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file || !watchedOrganizationId) return;

      try {
        const result = await uploadDocument({
          branchId: watchedBranchId,
          documentType: selectedDocumentType,
          file,
          onProgress: setUploadProgress,
          organizationId: watchedOrganizationId,
        });

        setUploadedDocument(result);
        setValue("document", result, { shouldValidate: true });
      } catch (error) {
        console.error("Upload failed:", error);
      }
    },
    [
      selectedDocumentType,
      uploadDocument,
      setValue,
      watchedBranchId,
      watchedOrganizationId,
    ],
  );

  const handleOrganizationChange = useCallback(
    (_value: string, organization: OrganizationSummaryResponse) => {
      resetField("document");
      setUploadedDocument(null);
      setUploadProgress(0);
      setValue("branchId", "");
      setValue("organizationId", organization.id, { shouldValidate: true });
      setValue("organizationName", organization.displayName, {
        shouldValidate: true,
      });
    },
    [resetField, setValue],
  );

  const handlePickupLocationChange = useCallback(
    (location: LocationValue) => {
      setValue("pickupAddress", location.address, { shouldValidate: true });
      setValue("pickupLatitude", location.latitude, { shouldValidate: true });
      setValue("pickupLongitude", location.longitude, {
        shouldValidate: true,
      });
    },
    [setValue],
  );

  const pickupLocationError =
    errors.pickupAddress?.message ??
    errors.pickupLatitude?.message ??
    errors.pickupLongitude?.message;

  const showOrganizationSearch = !organizationId && !!onFetchOrganizations;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4">
      <input type="hidden" {...register("organizationName")} />

      {(showOrganizationSearch || !!onFetchBranches) && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Assignment</h3>

          {showOrganizationSearch && (
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Organization <span className="text-red-500">*</span>
              </label>
              <input type="hidden" {...register("organizationId")} />
              <OrganizationSearch
                disabled={isSubmitting}
                onFetch={onFetchOrganizations}
                onValueChange={handleOrganizationChange}
                placeholder="Search organizations..."
                value={watchedOrganizationId}
              />
              {errors.organizationId && (
                <p className="text-sm text-red-600">
                  {errors.organizationId.message}
                </p>
              )}
            </div>
          )}

          {!!onFetchBranches && (
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Branch <span className="text-red-500">*</span>
              </label>
              <input type="hidden" {...register("branchId")} />
              <OrganizationBranchSearch
                disabled={isSubmitting}
                onFetch={onFetchBranches}
                onValueChange={handleBranchChange}
                organizationId={watchedOrganizationId}
                placeholder="Search branches..."
                value={watchedBranchId}
              />
              {errors.branchId && (
                <p className="text-sm text-red-600">
                  {errors.branchId.message}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Document Upload</h3>

        <div className="space-y-2">
          <label htmlFor="documentType" className="text-sm font-medium">
            Document Type
          </label>
          <Select
            disabled={isSubmitting || isUploading || !!uploadedDocument}
            onValueChange={handleDocumentTypeChange}
            value={selectedDocumentType}
          >
            <SelectTrigger id="documentType">
              <SelectValue>
                {selectedDocumentType.replace(/_/g, " ")}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {Object.values(DocumentType).map((type) => (
                <SelectItem key={type} value={type}>
                  {type.replace(/_/g, " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="csvFile" className="text-sm font-medium">
            CSV File
          </label>
          {!uploadedDocument ? (
            <div className="space-y-2">
              <input
                id="csvFile"
                type="file"
                accept=".csv,text/csv,application/csv"
                disabled={isUploading || isSubmitting}
                onChange={handleFileSelect}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              {isUploading && (
                <div className="space-y-1">
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div
                      className="h-2 rounded-full bg-primary transition-all"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Uploading... {uploadProgress}%
                  </p>
                </div>
              )}
              {uploadError && (
                <p className="text-sm text-red-600">{uploadError}</p>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-between rounded-md border border-input bg-background px-3 py-2">
              <span className="text-sm">{uploadedDocument.fileName}</span>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleDocumentRemove}
                className="text-sm text-red-600 hover:text-red-700 disabled:opacity-50"
              >
                Remove
              </button>
            </div>
          )}
          {errors.document && (
            <p className="text-sm text-red-600">
              Please upload a document CSV file
            </p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Pickup Location</h3>
        <input type="hidden" {...register("pickupAddress")} />
        <input
          type="hidden"
          {...register("pickupLatitude", { valueAsNumber: true })}
        />
        <input
          type="hidden"
          {...register("pickupLongitude", { valueAsNumber: true })}
        />
        <LocationSearchInput
          disabled={isSubmitting}
          error={pickupLocationError}
          onChange={handlePickupLocationChange}
          onGeocode={geocodeAddress}
          value={pickupLocationValue}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting || isUploading || !isValid}
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          {isSubmitting ? "Creating Drafts..." : "Create Drafts"}
        </button>
      </div>
    </form>
  );
}
