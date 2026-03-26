"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { Loader2, Upload } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/ui/primitives/sheet";
import { Button } from "@repo/ui/primitives/button";
import {
  confirmDocumentUpload,
  createDraftsFromDocument,
  initiateDocumentUpload,
} from "@repo/features-orders/actions";
import {
  type CreateDraftsFromDocumentFormData,
  type UseDocumentUploadConfig,
} from "@repo/features-orders/client";
import { hasAnyRole } from "@repo/features-auth/client";
import {
  getOrganizationBranches,
  searchOrganizations,
} from "@repo/features-organizations/actions";
import { UserRole } from "@repo/shared/client";
import { CreateFromDocumentForm } from "../create-from-document-form";

const DRAFT_CREATION_ROLES = [
  UserRole.BRANCH_ADMIN,
  UserRole.ORGANIZATION_ADMIN,
  UserRole.SYSTEM_ADMIN,
];

const uploadConfig: UseDocumentUploadConfig = {
  confirmUpload: async (documentId, params) => {
    const result = await confirmDocumentUpload(documentId, params);
    if (!result.success)
      throw new Error(result.error ?? "Upload confirmation failed");
  },
  initiateUpload: async (params) => {
    const result = await initiateDocumentUpload(params);
    if (!result.success)
      throw new Error(result.error ?? "Upload initiation failed");
    return {
      documentId: result.data.documentId,
      key: result.data.key,
      url: result.data.url,
    };
  },
};

interface CreateDraftSheetProps {
  organizationName?: string;
}

export function CreateDraftSheet({ organizationName }: CreateDraftSheetProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Button disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    );
  }

  if (!session?.user) {
    throw new Error("User not found");
  }

  if (!hasAnyRole(session, DRAFT_CREATION_ROLES)) {
    return <Button disabled>Insufficient permissions</Button>;
  }

  const { activeBranch, activeOrganization, roles } = session.user;

  const isSystemAdmin = roles.includes("SYSTEM_ADMIN");
  const isOrganizationAdmin = roles.includes("ORGANIZATION_ADMIN");

  const defaultOrganizationId = isSystemAdmin ? undefined : activeOrganization;
  const defaultBranchId =
    isSystemAdmin || isOrganizationAdmin ? undefined : activeBranch;

  const handleOpenChange = (newOpen: boolean) => {
    if (!isPending) setOpen(newOpen);
  };

  const onSubmit = (data: CreateDraftsFromDocumentFormData) => {
    startTransition(async () => {
      const result = await createDraftsFromDocument(data);

      if (result.success) {
        toast.success("Drafts creation initiated", {
          description: "You will be notified when drafts are ready.",
        });
        setOpen(false);
      } else {
        toast.error("Failed to create drafts", {
          description: result.error ?? "Please check the form and try again.",
        });

        if (result.errors && result.errors.length > 0) {
          console.error("Validation errors:", result.errors);
        }
      }
    });
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Create Drafts
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-2xl overflow-hidden">
        <SheetHeader>
          <SheetTitle>Create Drafts from Document</SheetTitle>
          <SheetDescription>
            Upload a parcels manifest CSV and provide pickup location details.
            All fields are required.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          <CreateFromDocumentForm
            branchId={defaultBranchId}
            onFetchBranches={
              isSystemAdmin || isOrganizationAdmin
                ? getOrganizationBranches
                : undefined
            }
            onFetchOrganizations={
              isSystemAdmin ? searchOrganizations : undefined
            }
            onSubmit={onSubmit}
            organizationId={defaultOrganizationId}
            organizationName={organizationName}
            uploadConfig={uploadConfig}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
