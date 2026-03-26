"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PauseCircle, Pencil, PlayCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { BranchResponse } from "@repo/features-organizations/client";
import {
  BranchStatus,
  BranchStatusBadge,
} from "@repo/features-organizations/client";
import {
  reinstateBranch,
  suspendBranch,
} from "@repo/features-organizations/actions";
import { Button } from "@repo/ui/primitives/button";
import { ConfirmationDialog } from "@repo/ui/dialogs/confirmation-dialog";
import { DeactivateBranchSheet } from "./sheets/deactivate-branch-sheet";
import { UpdateBranchSheet } from "./sheets/update-branch-sheet";

interface BranchPageHeaderProps {
  branch: BranchResponse;
  organizationId: string;
}

export function BranchPageHeader({
  branch,
  organizationId,
}: BranchPageHeaderProps) {
  const router = useRouter();

  const [isDeactivateOpen, setIsDeactivateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isSuspendOpen, setIsSuspendOpen] = useState(false);
  const [isReinstateOpen, setIsReinstateOpen] = useState(false);
  const [isSuspending, setIsSuspending] = useState(false);
  const [isReinstating, setIsReinstating] = useState(false);

  const isActive = branch.status === BranchStatus.ACTIVE;
  const isDeactivated = branch.status === BranchStatus.DEACTIVATED;
  const isSuspended = branch.status === BranchStatus.SUSPENDED;

  const handleSuspendConfirm = async () => {
    setIsSuspending(true);
    const result = await suspendBranch(organizationId, branch.id);

    if (result && !result.success) {
      toast.error(result.error ?? "Failed to suspend branch");
      setIsSuspending(false);
    } else {
      toast.success("Branch suspended successfully");
      setIsSuspendOpen(false);
      setIsSuspending(false);
      router.refresh();
    }
  };

  const handleReinstateConfirm = async () => {
    setIsReinstating(true);
    const result = await reinstateBranch(organizationId, branch.id);

    if (result && !result.success) {
      toast.error(result.error ?? "Failed to reinstate branch");
      setIsReinstating(false);
    } else {
      toast.success("Branch reinstated successfully");
      setIsReinstateOpen(false);
      setIsReinstating(false);
      router.refresh();
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold">{branch.displayName}</h1>
            <BranchStatusBadge status={branch.status} />
          </div>
          <p className="text-sm text-muted-foreground">{branch.branchName}</p>
        </div>

        {!isDeactivated && (
          <div className="flex items-center gap-2">
            <Button
              disabled={isSuspending || isReinstating}
              onClick={() => setIsUpdateOpen(true)}
              size="sm"
              variant="outline"
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>

            {isActive && (
              <Button
                disabled={isSuspending}
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
                disabled={isReinstating}
                onClick={() => setIsReinstateOpen(true)}
                size="sm"
                variant="outline"
              >
                <PlayCircle className="mr-2 h-4 w-4" />
                Reinstate
              </Button>
            )}

            <Button
              disabled={isSuspending || isReinstating}
              onClick={() => setIsDeactivateOpen(true)}
              size="sm"
              variant="destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Deactivate
            </Button>
          </div>
        )}
      </div>

      <ConfirmationDialog
        confirmText="Suspend"
        description={
          <>
            This will suspend <strong>{branch.displayName}</strong>. It can be
            reinstated at any time.
          </>
        }
        isPending={isSuspending}
        onConfirm={handleSuspendConfirm}
        onOpenChange={(open) => {
          if (!isSuspending && !open) setIsSuspendOpen(false);
        }}
        open={isSuspendOpen}
        title="Suspend branch?"
        variant="destructive"
      />

      <ConfirmationDialog
        confirmText="Reinstate"
        description={
          <>
            This will reinstate <strong>{branch.displayName}</strong> back to
            active status.
          </>
        }
        isPending={isReinstating}
        onConfirm={handleReinstateConfirm}
        onOpenChange={(open) => {
          if (!isReinstating && !open) setIsReinstateOpen(false);
        }}
        open={isReinstateOpen}
        title="Reinstate branch?"
        variant="default"
      />

      <DeactivateBranchSheet
        branch={branch}
        onOpenChange={setIsDeactivateOpen}
        open={isDeactivateOpen}
        organizationId={organizationId}
      />

      <UpdateBranchSheet
        branch={branch}
        onOpenChange={setIsUpdateOpen}
        open={isUpdateOpen}
        organizationId={organizationId}
      />
    </>
  );
}
