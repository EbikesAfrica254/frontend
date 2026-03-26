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
import type { CreateUserPreferenceFormData } from "@repo/features-notifications/client";
import { UserPreferenceForm } from "@repo/features-notifications/client";
import type { UserPreferenceResponse } from "@repo/features-notifications/client";
import { createUserPreference } from "@repo/features-notifications/actions";

interface AddUserPreferenceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  keycloakUserId: string;
  onAdded: (preference: UserPreferenceResponse) => void;
}

export function AddUserPreferenceDialog({
  open,
  onOpenChange,
  keycloakUserId,
  onAdded,
}: AddUserPreferenceDialogProps) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (data: CreateUserPreferenceFormData) => {
    startTransition(async () => {
      const result = await createUserPreference(keycloakUserId, {
        category: data.category,
        channel: data.channel,
        enabled: data.enabled,
      });

      if (result.success) {
        toast.success("Preference created successfully");
        onAdded(result.data);
        onOpenChange(false);
      } else {
        toast.error(result.error || "Failed to create preference");
      }
    });
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!isPending) onOpenChange(newOpen);
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add Notification Preference</SheetTitle>
          <SheetDescription>
            Configure a notification channel preference for this user
          </SheetDescription>
        </SheetHeader>
        <div className="px-6">
          <UserPreferenceForm onSubmit={handleSubmit} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
