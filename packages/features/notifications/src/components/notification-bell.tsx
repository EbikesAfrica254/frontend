"use client";

import { Bell, BellOff } from "lucide-react";
import { Button } from "@repo/ui/primitives/button";
import { Badge } from "@repo/ui/primitives/badge";
import { useNotifications } from "../store/notification-provider";
import { useSseConnection } from "../sse/sse-connection-provider";
import React from "react";

interface NotificationBellProps {
  onClick: () => void;
}

export function NotificationBell({ onClick }: NotificationBellProps) {
  const { unreadCount } = useNotifications();
  const connectionState = useSseConnection();

  const isConnected = connectionState === "connected";
  const isDisconnected = connectionState === "disconnected";
  const displayCount = unreadCount > 99 ? "99+" : unreadCount;

  const ariaLabel = [
    "Notifications",
    unreadCount > 0 ? `(${unreadCount} unread)` : null,
    isDisconnected ? "(disconnected)" : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {isDisconnected ? (
        <BellOff className="h-5 w-5 text-muted-foreground" />
      ) : (
        <Bell className="h-5 w-5" />
      )}

      {unreadCount > 0 && (
        <Badge
          variant="destructive"
          className="absolute -right-2 -top-1 h-5 min-w-[20px] px-1 text-xs"
        >
          {displayCount}
        </Badge>
      )}

      {isConnected && unreadCount === 0 && (
        <span className="absolute bottom-1 right-1 h-2 w-2 rounded-full bg-green-500" />
      )}
    </Button>
  );
}
