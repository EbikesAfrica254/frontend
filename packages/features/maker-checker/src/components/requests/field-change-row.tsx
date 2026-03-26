"use client";

import { TableCell, TableRow } from "@repo/ui/primitives/table";
import { getFieldChangeIndicator } from "../../utilities/field-change-formatters";
import { FieldValue } from "./field-value";
import type { FieldChangeResponse } from "../../types/requests";
import React from "react";

interface FieldChangeRowProps {
  change: FieldChangeResponse;
}

export function FieldChangeRow({ change }: FieldChangeRowProps) {
  const indicator = getFieldChangeIndicator(change.oldValue, change.newValue);

  return (
    <TableRow>
      <TableCell className="font-medium">{change.fieldName}</TableCell>
      <TableCell>
        <span
          className={
            indicator === "removed"
              ? "line-through text-destructive"
              : "text-muted-foreground"
          }
        >
          <FieldValue value={change.oldValue} fieldType={change.fieldType} />
        </span>
      </TableCell>
      <TableCell>
        <span
          className={
            indicator === "added"
              ? "font-semibold text-green-600"
              : indicator === "modified"
                ? "font-semibold text-primary"
                : ""
          }
        >
          <FieldValue value={change.newValue} fieldType={change.fieldType} />
        </span>
      </TableCell>
    </TableRow>
  );
}
