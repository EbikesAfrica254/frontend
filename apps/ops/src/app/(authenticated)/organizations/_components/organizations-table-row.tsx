"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import type { OrganizationSummaryResponse } from "@repo/features-organizations/client";
import {
  ComplianceStatusBadge,
  OrganizationStatusBadge,
} from "@repo/features-organizations/client";
import { Button } from "@repo/ui/primitives/button";
import { TableCell, TableRow } from "@repo/ui/primitives/table";
import { formatDateTime } from "@repo/shared/client";

interface OrganizationsTableRowProps {
  organization: OrganizationSummaryResponse;
}

export function OrganizationsTableRow({
  organization,
}: OrganizationsTableRowProps) {
  return (
    <TableRow>
      <TableCell className="max-w-56">
        <div className="min-w-0">
          <div className="truncate font-medium">{organization.displayName}</div>
          <div className="truncate text-sm text-muted-foreground">
            {organization.legalName}
          </div>
        </div>
      </TableCell>

      <TableCell className="hidden max-w-36 sm:table-cell">
        <span className="block truncate text-sm">
          {organization.registrationType.replace(/_/g, " ")}
        </span>
      </TableCell>

      <TableCell className="max-w-32">
        <OrganizationStatusBadge status={organization.status} />
      </TableCell>

      <TableCell className="hidden max-w-36 md:table-cell">
        <ComplianceStatusBadge status={organization.complianceStatus} />
      </TableCell>

      <TableCell className="hidden max-w-45 lg:table-cell">
        <span className="block truncate text-sm text-muted-foreground">
          {formatDateTime(organization.createdAt)}
        </span>
      </TableCell>

      <TableCell className="w-18 text-right">
        <Button variant="ghost" size="sm" asChild>
          <Link
            href={`/organizations/${organization.id}`}
            aria-label={`View ${organization.displayName}`}
          >
            <Eye className="h-4 w-4" />
          </Link>
        </Button>
      </TableCell>
    </TableRow>
  );
}
