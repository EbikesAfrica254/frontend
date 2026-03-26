"use client";

import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@repo/ui/primitives/sheet";
import { Button } from "@repo/ui/primitives/button";
import { Textarea } from "@repo/ui/primitives/textarea";
import { Separator } from "@repo/ui/primitives/separator";
import { deactivateBranch } from "@repo/features-organizations/actions";
import type { BranchResponse } from "@repo/features-organizations/client";

const deactivateBranchSchema = z.object({
  reason: z
    .string()
    .min(1, "Reason is required")
    .max(500, "Reason must be 500 characters or less"),
});

type DeactivateBranchFormData = z.infer<typeof deactivateBranchSchema>;

interface DeactivateBranchSheetProps {
  branch: BranchResponse;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  organizationId: string;
}

export function DeactivateBranchSheet({
  branch,
  onOpenChange,
  open,
  organizationId,
}: DeactivateBranchSheetProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<DeactivateBranchFormData>({
    defaultValues: { reason: "" },
    resolver: zodResolver(deactivateBranchSchema),
  });

  const handleOpenChange = (next: boolean) => {
    if (isPending) return;
    onOpenChange(next);
    if (!next) reset();
  };

  const onSubmit = (data: DeactivateBranchFormData) => {
    startTransition(async () => {
      const result = await deactivateBranch(organizationId, branch.id, {
        reason: data.reason,
      });

      if (result.success) {
        toast.success("Branch deactivated successfully");
        handleOpenChange(false);
        router.refresh();
      } else {
        toast.error("Failed to deactivate branch", {
          description: result.error ?? "Please try again.",
        });
      }
    });
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Deactivate Branch</SheetTitle>
          <SheetDescription>
            Permanently deactivate <strong>{branch.displayName}</strong>. This
            action is irreversible.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6">
          <form
            className="space-y-6 py-4"
            id="deactivate-branch-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-foreground">
                  Reason for Deactivation
                </h4>
                <Separator className="flex-1" />
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="reason"
                >
                  Reason <span className="text-destructive">*</span>
                </label>
                <Controller
                  control={control}
                  name="reason"
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      aria-invalid={!!errors.reason}
                      disabled={isPending}
                      id="reason"
                      placeholder="Provide a reason for deactivating this branch..."
                      rows={4}
                    />
                  )}
                />
                {errors.reason && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.reason.message}
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>

        <SheetFooter className="gap-2">
          <Button
            disabled={isPending}
            onClick={() => handleOpenChange(false)}
            type="button"
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            disabled={isPending}
            form="deactivate-branch-form"
            type="submit"
            variant="destructive"
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Deactivating..." : "Deactivate Branch"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
