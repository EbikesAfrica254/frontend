"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import type { TemplateSummaryResponse } from "@repo/features-notifications/client";
import { formatDateTime } from "@repo/shared/client";
import { Badge } from "@repo/ui/primitives/badge";
import { Button } from "@repo/ui/primitives/button";
import { TableCell, TableRow } from "@repo/ui/primitives/table";

interface TemplatesTableRowProps {
  template: TemplateSummaryResponse;
}

export function TemplatesTableRow({ template }: TemplatesTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">{template.name}</div>
        <div className="font-mono text-xs text-muted-foreground">
          {template.id}
        </div>
      </TableCell>
      <TableCell>
        <span className="text-sm">{template.channel.replace(/_/g, " ")}</span>
      </TableCell>
      <TableCell>
        <span className="text-sm">
          {template.contentType.replace(/_/g, " ")}
        </span>
      </TableCell>
      <TableCell>
        {
          <>
            <Badge variant={template.isActive ? "default" : "secondary"}>
              {template.isActive ? "Active" : "Inactive"}
            </Badge>
          </>
        }
      </TableCell>
      <TableCell>{formatDateTime(template.createdAt)}</TableCell>
      <TableCell>
        <Button asChild size="sm" variant="ghost">
          <Link href={`/notifications/templates/${template.id}`}>
            <Eye className="h-4 w-4" />
          </Link>
        </Button>
      </TableCell>
    </TableRow>
  );
}
