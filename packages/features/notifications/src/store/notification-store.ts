import { createStore, useStore } from "zustand";
import type { SseNotification } from "../types/sse";

interface NotificationState {
  notifications: SseNotification[];
  addNotification: (notification: SseNotification) => void;
  markAllAsRead: () => void;
  markAsRead: (id: string) => void;
  removeNotification: (id: string) => void;
}

export function createNotificationStore() {
  return createStore<NotificationState>((set) => ({
    notifications: [],

    addNotification: (notification) =>
      set((state) => ({
        notifications: [notification, ...state.notifications],
      })),

    markAllAsRead: () =>
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
      })),

    markAsRead: (id) =>
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n,
        ),
      })),

    removeNotification: (id) =>
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      })),
  }));
}

type NotificationStore = ReturnType<typeof createNotificationStore>;

export function useNotificationSelector<T>(
  store: NotificationStore,
  selector: (state: NotificationState) => T,
): T {
  return useStore(store, selector);
}

export type { NotificationState, NotificationStore };
