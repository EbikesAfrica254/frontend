"use client";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { PreferredAgentDetailResponse } from "@repo/features-workforce/client";
import { deletePreferredAgent } from "@repo/features-workforce/actions";
import { Button } from "@repo/ui/primitives/button";
import { TableCell, TableRow } from "@repo/ui/primitives/table";
import { formatDateTime } from "@repo/shared/client";
import { ConfirmationDialog } from "@repo/ui/dialogs/confirmation-dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface PreferredAgentsTableRowProps {
  entry: PreferredAgentDetailResponse;
}

export function PreferredAgentsTableRow({
  entry,
}: PreferredAgentsTableRowProps) {
  const router = useRouter();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    const result = await deletePreferredAgent(entry.id);

    if (result && !result.success) {
      toast.error(result.error ?? "Failed to remove preferred agent");
      setIsDeleting(false);
    } else {
      toast.success("Preferred agent removed");
      setIsDeleteOpen(false);
      setIsDeleting(false);
      router.refresh();
    }
  };

  return (
    <>
      <TableRow>
        <TableCell className="font-mono text-xs truncate">
          {entry.agentId}
        </TableCell>
        <TableCell className="font-mono text-xs truncate">
          {entry.organizationId}
        </TableCell>
        <TableCell>{entry.priority}</TableCell>
        <TableCell>{formatDateTime(entry.createdAt)}</TableCell>
        <TableCell>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDeleteOpen(true)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </TableCell>
      </TableRow>

      <ConfirmationDialog
        confirmText="Remove"
        description="This will remove the agent from the preferred list."
        isPending={isDeleting}
        onConfirm={handleDeleteConfirm}
        onOpenChange={(open) => {
          if (!isDeleting && !open) setIsDeleteOpen(false);
        }}
        open={isDeleteOpen}
        title="Remove preferred agent?"
        variant="destructive"
      />
    </>
  );
}
