import { Bell } from "lucide-react";
import React from "react";

export function NotificationEmpty() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
      <Bell className="h-8 w-8 text-muted-foreground/50" />
      <p className="text-sm text-muted-foreground">No notifications yet</p>
    </div>
  );
}
