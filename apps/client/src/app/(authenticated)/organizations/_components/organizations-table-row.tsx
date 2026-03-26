"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import type { OrganizationSummaryResponse } from "@repo/features-organizations/client";
import {
  OrganizationStatusBadge,
  ComplianceStatusBadge,
} from "@repo/features-organizations/client";
import { TableCell, TableRow } from "@repo/ui/primitives/table";
import { Button } from "@repo/ui/primitives/button";

interface OrganizationsTableRowProps {
  organization: OrganizationSummaryResponse;
}

export function OrganizationsTableRow({
  organization,
}: OrganizationsTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">{organization.displayName}</div>
        <div className="text-sm text-muted-foreground">
          {organization.legalName}
        </div>
      </TableCell>
      <TableCell>
        <span className="text-sm">
          {organization.registrationType.replace(/_/g, " ")}
        </span>
      </TableCell>
      <TableCell>
        <OrganizationStatusBadge status={organization.status} />
      </TableCell>
      <TableCell>
        <ComplianceStatusBadge status={organization.complianceStatus} />
      </TableCell>
      <TableCell>
        {new Date(organization.createdAt).toLocaleDateString()}
      </TableCell>
      <TableCell>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/organizations/${organization.id}`}>
            <Eye className="h-4 w-4" />
          </Link>
        </Button>
      </TableCell>
    </TableRow>
  );
}
