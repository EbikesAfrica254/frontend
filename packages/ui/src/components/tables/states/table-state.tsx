import React from "react";

interface TableLoadingStateProps {
  columnCount: number;
  message?: string;
}

export function TableLoadingState({
  columnCount,
  message = "Loading...",
}: TableLoadingStateProps) {
  return (
    <tr>
      <td colSpan={columnCount} className="h-24 text-center">
        <div className="flex items-center justify-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          <span className="text-sm text-muted-foreground">{message}</span>
        </div>
      </td>
    </tr>
  );
}

interface TableEmptyStateProps {
  columnCount: number;
  message?: string;
}

export function TableEmptyState({
  columnCount,
  message = "No results found.",
}: TableEmptyStateProps) {
  return (
    <tr>
      <td
        colSpan={columnCount}
        className="h-24 text-center text-sm text-muted-foreground"
      >
        {message}
      </td>
    </tr>
  );
}
