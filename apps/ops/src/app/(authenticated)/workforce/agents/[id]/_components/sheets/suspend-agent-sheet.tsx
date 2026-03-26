"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { SuspendAgentForm } from "@repo/features-workforce/client";
import type { SuspendAgentFormData } from "@repo/features-workforce/client";
import { suspendAgent } from "@repo/features-workforce/actions";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@repo/ui/primitives/sheet";

interface SuspendAgentSheetProps {
  agentId: string;
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

export function SuspendAgentSheet({
  agentId,
  onOpenChange,
  open,
}: SuspendAgentSheetProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const handleSubmit = (data: SuspendAgentFormData) => {
    startTransition(async () => {
      const result = await suspendAgent(agentId, data);

      if (result && !result.success) {
        toast.error(result.error ?? "Failed to suspend agent");
      } else {
        toast.success("Agent suspended");
        onOpenChange(false);
        router.refresh();
      }
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Suspend Agent</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <SuspendAgentForm onSubmit={handleSubmit} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
