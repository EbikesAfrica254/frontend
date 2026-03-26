"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  activateTemplate,
  deactivateTemplate,
} from "@repo/features-notifications/actions";
import type { TemplateResponse } from "@repo/features-notifications/client";
import { Button } from "@repo/ui/primitives/button";
import { ConfirmationDialog } from "@repo/ui/dialogs/confirmation-dialog";
import { UpdateTemplateSheet } from "./update-template-sheet";

interface TemplateDetailActionsProps {
  template: TemplateResponse;
}

export function TemplateDetailActions({
  template,
}: TemplateDetailActionsProps) {
  const router = useRouter();
  const [editSheetOpen, setEditSheetOpen] = useState(false);
  const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleActivate = async () => {
    setIsPending(true);
    const result = await activateTemplate(template.id);

    if (result && !result.success) {
      toast.error(result.error ?? "Failed to activate template");
    } else {
      toast.success("Template activated");
      router.refresh();
    }

    setIsPending(false);
  };

  const handleDeactivateConfirm = async () => {
    setIsPending(true);
    const result = await deactivateTemplate(template.id);

    if (result && !result.success) {
      toast.error(result.error ?? "Failed to deactivate template");
      setIsPending(false);
    } else {
      toast.success("Template deactivated");
      router.refresh();
      setDeactivateDialogOpen(false);
      setIsPending(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          disabled={isPending}
          onClick={() => setEditSheetOpen(true)}
          variant="outline"
        >
          Edit Template
        </Button>

        {template.isActive ? (
          <Button
            disabled={isPending}
            onClick={() => setDeactivateDialogOpen(true)}
            variant="destructive"
          >
            Deactivate Template
          </Button>
        ) : (
          <Button
            disabled={isPending}
            onClick={handleActivate}
            variant="outline"
          >
            Activate Template
          </Button>
        )}
      </div>

      <UpdateTemplateSheet
        onOpenChange={setEditSheetOpen}
        open={editSheetOpen}
        template={template}
      />

      <ConfirmationDialog
        confirmText="Deactivate Template"
        description="This template will no longer be available for use in notifications."
        isPending={isPending}
        onConfirm={handleDeactivateConfirm}
        onOpenChange={(open) => {
          if (!isPending && !open) {
            setDeactivateDialogOpen(false);
          }
        }}
        open={deactivateDialogOpen}
        title="Deactivate Template"
        variant="destructive"
      />
    </>
  );
}
