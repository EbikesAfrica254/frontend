import {AppBreadcrumbItem} from "../types/breadcrumbs";

function formatSegment(
    segment: string,
    labels?: Record<string, string>,
): string {
    if (labels?.[segment]) {
        return labels[segment];
    }

    // auto-format: capitalize and replace hyphens/underscores with spaces
    return segment
        .split(/[-_]/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export function generateItemsFromPath(
    pathname: string,
    labels?: Record<string, string>,
): AppBreadcrumbItem[] {
    const segments = pathname.split("/").filter(Boolean);

    return segments.map((segment, index) => {
        const path = "/" + segments.slice(0, index + 1).join("/");
        const label = formatSegment(segment, labels);
        const isLast = index === segments.length - 1;

        return {
            label,
            href: isLast ? undefined : path,
        };
    });
}
