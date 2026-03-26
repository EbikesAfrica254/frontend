"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PauseCircle, PlayCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { AgentDetailResponse } from "@repo/features-workforce/client";
import {
  AgentStatusBadge,
  CapabilityClassBadge,
} from "@repo/features-workforce/client";
import { AvailabilityStatus } from "@repo/features-workforce/client";
import { deactivateAgent } from "@repo/features-workforce/actions";
import { Button } from "@repo/ui/primitives/button";
import { ConfirmationDialog } from "@repo/ui/dialogs/confirmation-dialog";
import { SuspendAgentSheet } from "./sheets/suspend-agent-sheet";
import { LiftSuspensionSheet } from "./sheets/lift-suspension-sheet";

interface AgentPageHeaderProps {
  agent: AgentDetailResponse;
  isSystemAdmin: boolean;
}

export function AgentPageHeader({
  agent,
  isSystemAdmin,
}: AgentPageHeaderProps) {
  const router = useRouter();

  const [isSuspendOpen, setIsSuspendOpen] = useState(false);
  const [isLiftOpen, setIsLiftOpen] = useState(false);
  const [isDeactivateOpen, setIsDeactivateOpen] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const isDeactivated =
    agent.availabilityStatus === AvailabilityStatus.DEACTIVATED;
  const isSuspended = agent.hasActiveSuspension;

  const handleDeactivateConfirm = async () => {
    setIsDeactivating(true);
    const result = await deactivateAgent(agent.id);

    if (result && !result.success) {
      toast.error(result.error ?? "Failed to deactivate agent");
      setIsDeactivating(false);
    } else {
      toast.success("Agent deactivated");
      setIsDeactivateOpen(false);
      setIsDeactivating(false);
      router.refresh();
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold">
              {agent.firstName} {agent.lastName}
            </h1>
            <AgentStatusBadge status={agent.availabilityStatus} />
            <CapabilityClassBadge capabilityClass={agent.capabilityClass} />
          </div>
          <p className="text-sm text-muted-foreground">{agent.phoneNumber}</p>
        </div>

        {!isDeactivated && (
          <div className="flex items-center gap-2">
            {!isSuspended && (
              <Button
                onClick={() => setIsSuspendOpen(true)}
                size="sm"
                variant="outline"
              >
                <PauseCircle className="mr-2 h-4 w-4" />
                Suspend
              </Button>
            )}

            {isSuspended && (
              <Button
                onClick={() => setIsLiftOpen(true)}
                size="sm"
                variant="outline"
              >
                <PlayCircle className="mr-2 h-4 w-4" />
                Lift Suspension
              </Button>
            )}

            {isSystemAdmin && (
              <Button
                disabled={isDeactivating}
                onClick={() => setIsDeactivateOpen(true)}
                size="sm"
                variant="destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Deactivate
              </Button>
            )}
          </div>
        )}
      </div>

      <SuspendAgentSheet
        agentId={agent.id}
        onOpenChange={setIsSuspendOpen}
        open={isSuspendOpen}
      />

      <LiftSuspensionSheet
        agentId={agent.id}
        onOpenChange={setIsLiftOpen}
        open={isLiftOpen}
      />

      <ConfirmationDialog
        confirmText="Deactivate"
        description={
          <>
            This will permanently deactivate{" "}
            <strong>
              {agent.firstName} {agent.lastName}
            </strong>
            . This action cannot be undone.
          </>
        }
        isPending={isDeactivating}
        onConfirm={handleDeactivateConfirm}
        onOpenChange={(open) => {
          if (!isDeactivating && !open) setIsDeactivateOpen(false);
        }}
        open={isDeactivateOpen}
        title="Deactivate agent?"
        variant="destructive"
      />
    </>
  );
}
