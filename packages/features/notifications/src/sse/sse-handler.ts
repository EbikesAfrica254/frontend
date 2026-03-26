import "server-only";
import { getServerSession, type AuthOptions, type Session } from "next-auth";

export interface SseHandlerConfig {
  apiBaseUrl: string;
  authOptions: AuthOptions;
  extractToken: (session: Session) => string;
}

const SSE_HEADERS: HeadersInit = {
  "Cache-Control": "no-cache",
  Connection: "keep-alive",
  "Content-Type": "text/event-stream",
};

export async function handleSseNotifications(
  _request: Request,
  config: SseHandlerConfig,
): Promise<Response> {
  const session = await getServerSession(config.authOptions);

  if (!session) {
    return new Response(null, { status: 401 });
  }

  const upstream = await fetch(`${config.apiBaseUrl}/notifications/stream`, {
    headers: {
      Accept: "text/event-stream",
      Authorization: `Bearer ${config.extractToken(session)}`,
    },
  });

  if (!upstream.ok || !upstream.body) {
    return new Response(null, { status: 502 });
  }

  return new Response(upstream.body, { headers: SSE_HEADERS });
}
