"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import type { BranchSummaryResponse } from "@repo/features-organizations/client";
import { BranchStatusBadge } from "@repo/features-organizations/client";
import { TableCell, TableRow } from "@repo/ui/primitives/table";
import { Button } from "@repo/ui/primitives/button";
import { formatDateTime } from "@repo/shared/client";

interface BranchesTableRowProps {
  branch: BranchSummaryResponse;
  organizationId: string;
}

export function BranchesTableRow({
  branch,
  organizationId,
}: BranchesTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">{branch.displayName}</div>
        <div className="text-sm text-muted-foreground">{branch.branchName}</div>
      </TableCell>
      <TableCell>
        <span className="text-sm">{branch.email}</span>
      </TableCell>
      <TableCell>
        <span className="text-sm">{branch.phoneNumber}</span>
      </TableCell>
      <TableCell>
        <BranchStatusBadge status={branch.status} />
      </TableCell>
      <TableCell>{formatDateTime(branch.createdAt)}</TableCell>
      <TableCell>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/organizations/${organizationId}/branches/${branch.id}`}>
            <Eye className="h-4 w-4" />
          </Link>
        </Button>
      </TableCell>
    </TableRow>
  );
}
