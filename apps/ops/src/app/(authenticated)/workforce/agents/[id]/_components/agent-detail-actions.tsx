"use client";

import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { resubmitAgent } from "@repo/features-workforce/actions";
import { Button } from "@repo/ui/primitives/button";
import { ConfirmationDialog } from "@repo/ui/dialogs/confirmation-dialog";
import { AvailabilityStatus } from "@repo/features-workforce/client";
import type { AgentDetailResponse } from "@repo/features-workforce/client";

interface AgentDetailActionsProps {
  agent: AgentDetailResponse;
}

export function AgentDetailActions({ agent }: AgentDetailActionsProps) {
  const router = useRouter();
  const [isResubmitOpen, setIsResubmitOpen] = useState(false);
  const [isResubmitting, setIsResubmitting] = useState(false);

  const canResubmit = agent.availabilityStatus === AvailabilityStatus.PENDING;

  if (!canResubmit) return null;

  const handleResubmitConfirm = async () => {
    setIsResubmitting(true);
    const result = await resubmitAgent(agent.id);

    if (result && !result.success) {
      toast.error(result.error ?? "Failed to resubmit agent");
      setIsResubmitting(false);
    } else {
      toast.success("Agent resubmitted for review");
      setIsResubmitOpen(false);
      setIsResubmitting(false);
      router.refresh();
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsResubmitOpen(true)}
        size="sm"
        variant="outline"
      >
        <RefreshCw className="mr-2 h-4 w-4" />
        Resubmit
      </Button>

      <ConfirmationDialog
        confirmText="Resubmit"
        description={
          <>
            This will resubmit{" "}
            <strong>
              {agent.firstName} {agent.lastName}
            </strong>{" "}
            for maker-checker review.
          </>
        }
        isPending={isResubmitting}
        onConfirm={handleResubmitConfirm}
        onOpenChange={(open) => {
          if (!isResubmitting && !open) setIsResubmitOpen(false);
        }}
        open={isResubmitOpen}
        title="Resubmit agent?"
        variant="default"
      />
    </>
  );
}
