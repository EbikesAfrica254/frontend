"use client";

import React from "react";
import { useEffect, useRef, useState } from "react";

const HEIGHT_DEFAULT = 480;
const HEIGHT_MAX = 2000;
const POST_MESSAGE_TYPE = "ebikes-notifications-resize";

const RESIZE_SCRIPT = `
<script>
  window.addEventListener('load', function () {
    window.parent.postMessage(
      { type: '${POST_MESSAGE_TYPE}', height: document.body.scrollHeight },
      '*'
    );
  });
</script>
`;

interface MessageBodyPreviewProps {
  sanitizedHtml: string;
  contentType: "HTML" | "PLAIN_TEXT";
}

export function MessageBodyPreview({
  sanitizedHtml,
  contentType,
}: MessageBodyPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState(HEIGHT_DEFAULT);

  useEffect(() => {
    if (contentType !== "HTML") return;

    function handleMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin) return;
      if (
        typeof event.data !== "object" ||
        event.data?.type !== POST_MESSAGE_TYPE
      )
        return;

      const reported = Number(event.data.height);
      if (!Number.isFinite(reported) || reported <= 0) return;

      setIframeHeight(Math.min(reported + 32, HEIGHT_MAX));
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [contentType]);

  if (contentType === "PLAIN_TEXT") {
    return (
      <pre className="whitespace-pre-wrap rounded-md bg-muted p-3 font-mono text-xs">
        {sanitizedHtml}
      </pre>
    );
  }

  return (
    <iframe
      ref={iframeRef}
      sandbox="allow-scripts"
      srcDoc={`${RESIZE_SCRIPT}${sanitizedHtml}`}
      style={{ height: iframeHeight }}
      className="w-full rounded-md border bg-white"
      title="Message preview"
    />
  );
}
