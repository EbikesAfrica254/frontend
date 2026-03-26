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
import type { UpdateMembershipRolesFormData } from "@repo/features-iam/client";
import { MembershipRolesForm } from "@repo/features-iam/client";
import { updateMembershipRoles } from "@repo/features-iam/actions";

interface EditMembershipRolesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  keycloakUserId: string;
  userExtensionId: string;
  organizationId: string;
  branchId?: string;
  currentRoles: string[];
  membershipName: string;
}

export function EditMembershipRolesDialog({
  open,
  onOpenChange,
  keycloakUserId,
  userExtensionId,
  organizationId,
  branchId,
  currentRoles,
  membershipName,
}: EditMembershipRolesDialogProps) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (data: UpdateMembershipRolesFormData) => {
    startTransition(async () => {
      const result = await updateMembershipRoles(
        keycloakUserId,
        organizationId,
        data,
        userExtensionId,
        branchId,
      );

      if (result.success) {
        toast.success("Roles updated successfully");
        onOpenChange(false);
      } else {
        toast.error(result.error || "Failed to update roles");
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
      <SheetContent className="sm:max-w-150 overflow-y-auto px-6">
        <SheetHeader>
          <SheetTitle>Edit Roles</SheetTitle>
          <SheetDescription>{membershipName}</SheetDescription>
        </SheetHeader>

        <div className="mt-6">
          <MembershipRolesForm
            currentRoles={currentRoles}
            onSubmit={handleSubmit}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
