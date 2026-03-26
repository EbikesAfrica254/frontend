"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, RotateCcw, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@repo/ui/primitives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/primitives/dropdown-menu";
import { ConfirmationDialog } from "@repo/ui/dialogs/confirmation-dialog";
import { UserStatus } from "@repo/features-iam/client";
import {
  deleteUser,
  deprovisionUser,
  restoreUser,
} from "@repo/features-iam/actions";

interface UserDetailActionsProps {
  userId: string;
  userName: string;
  userStatus: UserStatus;
  isSystemAdmin: boolean;
}

export function UserDetailActions({
  userId,
  userName,
  userStatus,
  isSystemAdmin,
}: UserDetailActionsProps) {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);
  const [deprovisionDialogOpen, setDeprovisionDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [isDeprovisioning, setIsDeprovisioning] = useState(false);

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    const result = await deleteUser(userId);

    if (result && !result.success) {
      toast.error(result.error || "Failed to delete user");
      setIsDeleting(false);
    } else {
      toast.success("User deleted successfully");
      router.push("/iam/users");
    }
  };

  const handleRestoreConfirm = async () => {
    setIsRestoring(true);
    const result = await restoreUser(userId);

    if (result && !result.success) {
      toast.error(result.error || "Failed to restore user");
      setIsRestoring(false);
    } else {
      toast.success("User restored successfully");
      setRestoreDialogOpen(false);
      setIsRestoring(false);
      router.refresh();
    }
  };

  const handleDeprovisionConfirm = async () => {
    setIsDeprovisioning(true);
    const result = await deprovisionUser(userId);

    if (result && !result.success) {
      toast.error(result.error || "Failed to deprovision user");
      setIsDeprovisioning(false);
    } else {
      toast.success("User deprovisioned successfully");
      router.push("/iam/users");
    }
  };

  const isDeleted = userStatus === UserStatus.DELETED;

  return (
    <>
      <div className="flex items-center gap-2">
        {isDeleted ? (
          <Button
            variant="default"
            onClick={() => setRestoreDialogOpen(true)}
            disabled={isRestoring}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Restore User
          </Button>
        ) : (
          <Button
            variant="destructive"
            onClick={() => setDeleteDialogOpen(true)}
            disabled={isDeleting}
          >
            Delete User
          </Button>
        )}

        {isSystemAdmin && isDeleted && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setDeprovisionDialogOpen(true)}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Deprovision User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          if (!isDeleting && !open) {
            setDeleteDialogOpen(false);
          }
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete User"
        description={
          <>
            This will soft delete <strong>{userName}</strong>. The user can be
            restored later.
          </>
        }
        confirmText="Delete User"
        isPending={isDeleting}
        variant="destructive"
      />

      <ConfirmationDialog
        open={restoreDialogOpen}
        onOpenChange={(open) => {
          if (!isRestoring && !open) {
            setRestoreDialogOpen(false);
          }
        }}
        onConfirm={handleRestoreConfirm}
        title="Restore User"
        description={
          <>
            Are you sure you want to restore <strong>{userName}</strong>? This
            will reactivate their account and restore their access to the
            system.
          </>
        }
        confirmText="Restore User"
        isPending={isRestoring}
        variant="default"
      />

      <ConfirmationDialog
        open={deprovisionDialogOpen}
        onOpenChange={(open) => {
          if (!isDeprovisioning && !open) {
            setDeprovisionDialogOpen(false);
          }
        }}
        onConfirm={handleDeprovisionConfirm}
        title="Deprovision User"
        description={
          <>
            <strong>WARNING:</strong> This will permanently remove{" "}
            <strong>{userName}</strong> from the identity provider. This action
            is irreversible and the user cannot be restored.
          </>
        }
        confirmText="Deprovision User"
        isPending={isDeprovisioning}
        variant="destructive"
      />
    </>
  );
}
