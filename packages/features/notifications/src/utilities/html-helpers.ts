import sanitizeHtml from "sanitize-html";

export function sanitize(raw: string): string {
  return sanitizeHtml(raw, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      "*": ["style", "class"],
    },
  });
}
