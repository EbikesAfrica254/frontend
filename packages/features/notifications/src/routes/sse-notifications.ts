import { NextRequest } from "next/server";
import { auth } from "@repo/features-auth/server";
import { getRequiredEnv } from "@repo/shared/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session?.accessToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const response = await fetch(
      `${getRequiredEnv("NOTIFICATIONS_SERVICE_BASE_URL")}/sse/stream`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          Accept: "text/event-stream",
        },
        signal: req.signal,
      },
    );

    if (!response.ok) {
      return new Response("Failed to connect to notification service", {
        status: response.status,
      });
    }

    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error) {
    console.error("SSE proxy error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
