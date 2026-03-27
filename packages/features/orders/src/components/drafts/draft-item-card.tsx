"use client";

import { Package } from "lucide-react";
import type { DraftItemResponse } from "../../types/drafts";
import React from "react";

interface DraftItemCardProps {
  item: DraftItemResponse;
}

export function DraftItemCard({ item }: DraftItemCardProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg border bg-card p-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted">
        <Package className="h-4 w-4 text-muted-foreground" />
      </div>

      <div className="min-w-0 space-y-1">
        <p className="text-sm font-medium leading-none">
          Item {item.rowNumber}
          {item.externalReference && (
            <span className="ml-2 font-normal text-muted-foreground">
              #{item.externalReference}
            </span>
          )}
        </p>
        {item.description && (
          <p className="truncate text-xs text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
}
