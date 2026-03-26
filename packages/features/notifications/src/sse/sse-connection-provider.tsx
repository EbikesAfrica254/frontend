"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import { useNotificationDispatch } from "../store/notification-provider";
import { parseNotificationMessage } from "../utilities/notification-parser";
import { sanitizeNotification } from "./sse-sanitizer";

type ConnectionState = "connecting" | "connected" | "disconnected";

const SseConnectionContext = createContext<ConnectionState>("disconnected");

export function useSseConnection(): ConnectionState {
  return useContext(SseConnectionContext);
}

export function SseConnectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const addNotification = useNotificationDispatch();
  const eventSourceRef = useRef<EventSource | null>(null);
  const { status } = useSession();
  const [connectionState, setConnectionState] =
    useState<ConnectionState>("disconnected");

  useEffect(() => {
    if (status === "loading") {
      setConnectionState("connecting");
      return;
    }

    if (status === "unauthenticated") {
      setConnectionState("disconnected");
      return;
    }

    setConnectionState("connecting");

    const eventSource = new EventSource("/api/notifications");
    eventSourceRef.current = eventSource;

    eventSource.onopen = () => setConnectionState("connected");

    eventSource.onerror = () => {
      setConnectionState("disconnected");
      eventSource.close();
    };

    eventSource.onmessage = (event: MessageEvent) => {
      const raw = parseNotificationMessage(event.data);
      if (!raw) return;
      addNotification(sanitizeNotification(raw));
    };

    return () => {
      eventSourceRef.current?.close();
      eventSourceRef.current = null;
    };
  }, [addNotification, status]);

  return (
    <SseConnectionContext.Provider value={connectionState}>
      {children}
    </SseConnectionContext.Provider>
  );
}
