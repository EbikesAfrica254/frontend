"use client";

import React, {
  createContext,
  type ReactNode,
  useContext,
  useRef,
} from "react";
import type { SseNotification } from "../types/sse";
import {
  createNotificationStore,
  type NotificationState,
  type NotificationStore,
  useNotificationSelector,
} from "./notification-store";

const NotificationContext = createContext<NotificationStore | null>(null);

function useNotificationStore<T>(selector: (state: NotificationState) => T): T {
  const store = useContext(NotificationContext);

  if (!store) {
    throw new Error(
      "useNotificationStore must be used within NotificationProvider",
    );
  }

  return useNotificationSelector(store, selector);
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<NotificationStore>(undefined);

  if (!storeRef.current) {
    storeRef.current = createNotificationStore();
  }

  return (
    <NotificationContext.Provider value={storeRef.current}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotificationDispatch(): (
  notification: SseNotification,
) => void {
  return useNotificationStore((state) => state.addNotification);
}

export function useNotifications() {
  const notifications = useNotificationStore((state) => state.notifications);
  const markAllAsRead = useNotificationStore((state) => state.markAllAsRead);
  const markAsRead = useNotificationStore((state) => state.markAsRead);
  const removeNotification = useNotificationStore(
    (state) => state.removeNotification,
  );
  const unreadCount = useNotificationStore(
    (state) => state.notifications.filter((n) => !n.read).length,
  );

  return {
    markAllAsRead,
    markAsRead,
    notifications,
    removeNotification,
    unreadCount,
  };
}
