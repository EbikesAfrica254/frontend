"use client";

import { Check, X } from "lucide-react";
import { Badge } from "@repo/ui/primitives/badge";
import { FieldType } from "../../types/enums";
import { formatDateTime } from "@repo/shared/client";
import React from "react";

interface FieldValueProps {
  fieldType: FieldType;
  formatValue?: (value: unknown) => string;
  value: unknown;
}

export function FieldValue({ fieldType, formatValue, value }: FieldValueProps) {
  if (value === null || value === undefined) {
    return <span className="text-muted-foreground">—</span>;
  }

  switch (fieldType) {
    case FieldType.BOOLEAN:
      return value ? (
        <Check className="h-4 w-4 text-green-600" />
      ) : (
        <X className="h-4 w-4 text-destructive" />
      );

    case FieldType.DATE:
      try {
        return <span>{formatDateTime(value as string)}</span>;
      } catch {
        return <span>{String(value)}</span>;
      }

    case FieldType.ENUM: {
      const label = formatValue ? formatValue(value) : String(value);
      return <Badge variant="outline">{label}</Badge>;
    }

    case FieldType.NUMBER:
      return <span>{new Intl.NumberFormat().format(value as number)}</span>;

    case FieldType.OBJECT: {
      const jsonString = JSON.stringify(value, null, 2);
      return (
        <details className="cursor-pointer">
          <summary className="text-sm text-muted-foreground hover:text-foreground">
            View details
          </summary>
          <pre className="mt-2 text-xs bg-muted p-2 rounded max-w-md overflow-auto">
            {jsonString}
          </pre>
        </details>
      );
    }

    case FieldType.STRING:
    default:
      return <span>{String(value)}</span>;
  }
}
