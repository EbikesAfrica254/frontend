"use client";

import React from "react";
import { Sheet, SheetContent } from "@repo/ui/primitives/sheet";
import { ScrollArea } from "@repo/ui/primitives/scroll-area";
import { NotificationCard } from "./notification-card";
import { NotificationEmpty } from "./notification-empty";
import { NotificationPanelHeader } from "./notification-panel-header";
import { useNotifications } from "../store/notification-provider";
import { NotificationBell } from "./notification-bell";

export function NotificationPanel() {
  const [open, setOpen] = React.useState(false);
  const { markAllAsRead, notifications, unreadCount } = useNotifications();

  return (
    <>
      <NotificationBell onClick={() => setOpen(true)} />

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="flex flex-col gap-0 p-0 w-notification-panel"
        >
          <div className="px-6 pt-6">
            <NotificationPanelHeader
              unreadCount={unreadCount}
              onMarkAllRead={markAllAsRead}
            />
          </div>

          <ScrollArea className="flex-1">
            {notifications.length === 0 ? (
              <NotificationEmpty />
            ) : (
              <div className="divide-y">
                {notifications.map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    onClose={() => setOpen(false)}
                  />
                ))}
              </div>
            )}
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}
