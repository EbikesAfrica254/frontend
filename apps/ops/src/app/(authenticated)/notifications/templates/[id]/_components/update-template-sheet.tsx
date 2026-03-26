"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { updateTemplate } from "@repo/features-notifications/actions";
import {
  TemplateDetailForm,
  type TemplateResponse,
  type UpdateTemplateFormData,
} from "@repo/features-notifications/client";
import { Button } from "@repo/ui/primitives/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@repo/ui/primitives/sheet";

const FORM_ID = "update-template-form";

interface UpdateTemplateSheetProps {
  onOpenChange: (open: boolean) => void;
  open: boolean;
  template: TemplateResponse;
}

export function UpdateTemplateSheet({
  onOpenChange,
  open,
  template,
}: UpdateTemplateSheetProps) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (data: UpdateTemplateFormData) => {
    startTransition(async () => {
      const result = await updateTemplate(template.id, data);

      if (result.success) {
        toast.success("Template updated successfully");
        onOpenChange(false);
      } else {
        toast.error(result.error ?? "Failed to update template");
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
      <SheetContent className="flex flex-col w-full sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>Edit Template</SheetTitle>
          <SheetDescription>
            Update the template body, subject, and variable definitions.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6">
          <TemplateDetailForm
            formId={FORM_ID}
            template={template}
            onSubmit={handleSubmit}
          />
        </div>

        <SheetFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={() => handleOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="submit" form={FORM_ID} disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
