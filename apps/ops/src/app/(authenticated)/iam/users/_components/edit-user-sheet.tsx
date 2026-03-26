"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import type { UpdateUserFormData } from "@repo/features-iam/client";
import {
  UserDetailForm,
  UserExtensionResponse,
  UserStatus,
} from "@repo/features-iam/client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@repo/ui/primitives/sheet";
import { updateUser } from "@repo/features-iam/actions";

interface EditUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserExtensionResponse;
}

export function EditUserSheet({
  open,
  onOpenChange,
  user,
}: EditUserDialogProps) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (data: UpdateUserFormData) => {
    startTransition(async () => {
      const result = await updateUser(user.id, {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        status: data.status as UserStatus,
      });

      if (result.success) {
        toast.success("User updated successfully");
        onOpenChange(false);
      } else {
        toast.error(result.error || "Failed to update user");
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
          <SheetTitle>Edit User</SheetTitle>
          <SheetDescription>
            Update user information. Changes will be saved immediately.
          </SheetDescription>
        </SheetHeader>

        <UserDetailForm user={user} onSubmit={handleSubmit} />
      </SheetContent>
    </Sheet>
  );
}
