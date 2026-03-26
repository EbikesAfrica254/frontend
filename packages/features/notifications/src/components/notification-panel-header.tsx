import { Button } from "@repo/ui/primitives/button";
import { SheetHeader, SheetTitle } from "@repo/ui/primitives/sheet";
import React from "react";

interface NotificationPanelHeaderProps {
  unreadCount: number;
  onMarkAllRead: () => void;
}

export function NotificationPanelHeader({
  unreadCount,
  onMarkAllRead,
}: NotificationPanelHeaderProps) {
  return (
    <SheetHeader className="flex flex-row items-center justify-between space-y-0 border-b pb-4">
      <div className="flex items-center gap-2">
        <SheetTitle>Notifications</SheetTitle>
        {unreadCount > 0 && (
          <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
            {unreadCount}
          </span>
        )}
      </div>
      {unreadCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onMarkAllRead}
          className="h-auto p-1 text-xs text-muted-foreground hover:text-foreground"
        >
          Mark all read
        </Button>
      )}
    </SheetHeader>
  );
}
