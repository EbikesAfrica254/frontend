"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@repo/ui/primitives/sheet";
import type { CreateMembershipFormData } from "@repo/features-iam/client";
import { MembershipForm } from "@repo/features-iam/client";
import { createMembership } from "@repo/features-iam/actions";
import {
  getOrganizationBranches,
  searchOrganizations,
} from "@repo/features-organizations/actions";

interface AddMembershipDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  keycloakUserId: string;
  userExtensionId: string;
}

export function AddMembershipDialog({
  open,
  onOpenChange,
  keycloakUserId,
  userExtensionId,
}: AddMembershipDialogProps) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (data: CreateMembershipFormData) => {
    startTransition(async () => {
      const result = await createMembership(
        keycloakUserId,
        data,
        userExtensionId,
      );

      if (result.success) {
        toast.success("Membership created successfully");
        onOpenChange(false);
      } else {
        toast.error(result.error || "Failed to create membership");
      }
    });
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!isPending) {
      onOpenChange(newOpen);
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent className="sm:max-w-150 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add Membership</SheetTitle>
          <SheetDescription>
            Add the user to an organization or branch with assigned roles
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6">
          <MembershipForm
            onFetchOrganizations={searchOrganizations}
            onFetchBranches={getOrganizationBranches}
            onSubmit={handleSubmit}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
