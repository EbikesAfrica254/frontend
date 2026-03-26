export function getFieldChangeIndicator(
  oldValue: unknown,
  newValue: unknown,
): "added" | "removed" | "modified" {
  if (oldValue === null || oldValue === undefined) {
    return "added";
  }
  if (newValue === null || newValue === undefined) {
    return "removed";
  }
  return "modified";
}
