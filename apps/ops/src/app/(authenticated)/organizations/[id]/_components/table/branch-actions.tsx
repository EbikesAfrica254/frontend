"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@repo/ui/primitives/button";
import { CreateBranchSheet } from "../sheets/create-branch-sheet";

interface BranchActionsProps {
  organizationId: string;
}

export function BranchActions({ organizationId }: BranchActionsProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsCreateOpen(true)} size="sm">
        <Plus className="mr-2 h-4 w-4" />
        Create Branch
      </Button>

      <CreateBranchSheet
        onOpenChange={setIsCreateOpen}
        open={isCreateOpen}
        organizationId={organizationId}
      />
    </>
  );
}
