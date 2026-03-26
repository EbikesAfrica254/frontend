"use client";

import { ArrowUpDown } from "lucide-react";
import { useState } from "react";

import { Button } from "@repo/ui/primitives/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/primitives/table";

import type { FieldChangeResponse } from "../../types/requests";
import { FieldChangeRow } from "./field-change-row";
import React from "react";

interface ApprovalChangesTableProps {
  excludeFields?: string[];
  fieldChanges: FieldChangeResponse[];
}

export function ApprovalChangesTable({
  excludeFields,
  fieldChanges,
}: ApprovalChangesTableProps) {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const visibleChanges = excludeFields?.length
    ? fieldChanges.filter((c) => !excludeFields.includes(c.fieldName))
    : fieldChanges;

  if (!visibleChanges || visibleChanges.length === 0) {
    return (
      <div className="flex items-center justify-center py-8 text-muted-foreground">
        No changes detected
      </div>
    );
  }

  const handleSort = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const sortedChanges = [...visibleChanges].sort((a, b) => {
    const comparison = a.fieldName.localeCompare(b.fieldName);
    return sortDirection === "asc" ? comparison : -comparison;
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button
                variant="ghost"
                onClick={handleSort}
                className="h-8 px-2 lg:px-3"
              >
                Field Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Previous Value</TableHead>
            <TableHead>New Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedChanges.map((change, index) => (
            <FieldChangeRow
              key={`${change.fieldName}-${index}`}
              change={change}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
