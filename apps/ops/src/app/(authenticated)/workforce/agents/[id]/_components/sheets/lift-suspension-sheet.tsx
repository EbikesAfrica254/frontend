"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { LiftSuspensionForm } from "@repo/features-workforce/client";
import type { LiftSuspensionFormData } from "@repo/features-workforce/client";
import { liftSuspension } from "@repo/features-workforce/actions";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@repo/ui/primitives/sheet";

interface LiftSuspensionSheetProps {
  agentId: string;
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

export function LiftSuspensionSheet({
  agentId,
  onOpenChange,
  open,
}: LiftSuspensionSheetProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const handleSubmit = (data: LiftSuspensionFormData) => {
    startTransition(async () => {
      const result = await liftSuspension(agentId, data);

      if (result && !result.success) {
        toast.error(result.error ?? "Failed to lift suspension");
      } else {
        toast.success("Suspension lifted");
        onOpenChange(false);
        router.refresh();
      }
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Lift Suspension</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <LiftSuspensionForm onSubmit={handleSubmit} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
