export function generateAvatarFallback(seed: string | undefined): string {
  if (!seed) return "#808080";

  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

export function getContrastColor(hexColor: string): string {
  const matches = hexColor.replace("#", "").match(/.{2}/g);

  if (!matches || matches.length < 3) {
    return "#000000";
  }

  const rgb: [number, number, number] = [
    parseInt(matches[0]!, 16),
    parseInt(matches[1]!, 16),
    parseInt(matches[2]!, 16),
  ];

  const luminance = (rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114) / 255;
  return luminance > 0.6 ? "#000000" : "#ffffff";
}

export function getUserInitials(name: string | undefined): string {
  if (!name) return "U";

  return name
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");
}
