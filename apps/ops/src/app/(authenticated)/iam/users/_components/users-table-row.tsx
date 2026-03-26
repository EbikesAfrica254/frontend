"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { UserExtensionSummaryResponse } from "@repo/features-iam/client";
import { UserStatusBadge } from "@repo/features-iam/client";
import { TableCell, TableRow } from "@repo/ui/primitives/table";
import { Button } from "@repo/ui/primitives/button";
import { Avatar, AvatarFallback } from "@repo/ui/primitives/avatar";
import { ConfirmationDialog } from "@repo/ui/dialogs/confirmation-dialog";
import { getUserInitials } from "@repo/ui/utilities/avatar-utilities";
import { deleteUser } from "@repo/features-iam/actions";
import { formatDateTime } from "@repo/shared/client";

interface UsersTableRowProps {
  user: UserExtensionSummaryResponse;
}

export function UsersTableRow({ user }: UsersTableRowProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fullName = `${user.firstName} ${user.lastName}`;

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteUser(user.id);

    if (result.success) {
      toast.success("User deleted successfully");
      setDeleteDialogOpen(false);
    } else {
      toast.error(result.error || "Failed to delete user");
    }
    setIsDeleting(false);
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{getUserInitials(fullName)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{fullName}</div>
              <div className="text-sm text-muted-foreground">
                @{user.username}
              </div>
            </div>
          </div>
        </TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.phoneNumber || "—"}</TableCell>
        <TableCell>
          <UserStatusBadge status={user.status} />
        </TableCell>
        <TableCell>{formatDateTime(user.createdAt)}</TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/iam/users/${user.id}`}>
                <Eye className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDeleteDialogOpen(true)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>

      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete User"
        entityName={fullName}
        isPending={isDeleting}
        confirmText="Delete User"
        variant="destructive"
      />
    </>
  );
}
