"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Info,
  X,
  XCircle,
} from "lucide-react";
import { Button } from "@repo/ui/primitives/button";
import { Badge } from "@repo/ui/primitives/badge";
import type {
  NotificationPriority,
  NotificationType,
  SseNotification,
} from "../types/sse";
import { useNotifications } from "../store/notification-provider";

interface NotificationCardProps {
  notification: SseNotification;
  onClose?: () => void;
}

const TYPE_ICONS: Record<NotificationType, React.ReactElement> = {
  APPROVAL_APPROVED: <CheckCircle className="h-5 w-5 text-green-500" />,
  APPROVAL_CANCELLED: <XCircle className="h-5 w-5 text-gray-500" />,
  APPROVAL_REJECTED: <XCircle className="h-5 w-5 text-red-500" />,
  MAKER_CHECKER_REQUEST: <Clock className="h-5 w-5 text-blue-500" />,
  SYSTEM_ALERT: <AlertCircle className="h-5 w-5 text-orange-500" />,
  INFO: <Info className="h-5 w-5 text-gray-500" />,
};

const PRIORITY_BORDER: Record<NotificationPriority, string> = {
  high: "border-l-orange-500",
  low: "border-l-gray-400",
  normal: "border-l-blue-500",
  urgent: "border-l-red-500",
};

function getRelativeTime(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(timestamp).toLocaleDateString();
}

export function NotificationCard({
  notification,
  onClose,
}: NotificationCardProps) {
  const router = useRouter();
  const { markAsRead, removeNotification } = useNotifications();

  const handleClick = () => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    if (notification.actionUrl) {
      router.push(notification.actionUrl);
      onClose?.();
    }
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeNotification(notification.id);
  };

  return (
    <div
      className={[
        "relative border-l-4 p-4 transition-colors hover:bg-muted/50",
        PRIORITY_BORDER[notification.priority],
        !notification.read ? "bg-muted/30" : "",
        notification.actionUrl ? "cursor-pointer" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={handleClick}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0">
          {TYPE_ICONS[notification.type] ?? TYPE_ICONS.INFO}
        </div>

        <div className="flex-1 space-y-1">
          {notification.title && (
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-semibold leading-tight">
                {notification.title}
              </p>
              {!notification.read && (
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
              )}
            </div>
          )}

          <p className="text-sm leading-snug text-muted-foreground">
            {notification.message}
          </p>

          <div className="flex items-center gap-2 pt-1">
            <span className="text-xs text-muted-foreground">
              {getRelativeTime(notification.timestamp)}
            </span>
            {notification.priority === "urgent" && (
              <Badge variant="destructive" className="h-5 text-xs">
                Urgent
              </Badge>
            )}
            {notification.priority === "high" && (
              <Badge variant="default" className="h-5 text-xs">
                High
              </Badge>
            )}
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 shrink-0"
          onClick={handleDismiss}
          aria-label="Dismiss notification"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
