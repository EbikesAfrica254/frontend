import * as React from "react";
import {ArrowDown, ArrowUp, ArrowUpDown} from "lucide-react";

interface SortableHeaderProps {
    isSorted: false | "asc" | "desc";
    onSort: () => void;
    title: string;
}

export function SortableHeader({
                                   isSorted,
                                   onSort,
                                   title,
                               }: SortableHeaderProps) {
    return (
        <button
            type="button"
            onClick={onSort}
            className="group inline-flex max-w-full items-center gap-2 text-left text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label={`Sort by ${title}`}
        >
            <span className="truncate">{title}</span>

            {isSorted === "desc" ? (
                <ArrowDown className="h-4 w-4 shrink-0 text-foreground"/>
            ) : isSorted === "asc" ? (
                <ArrowUp className="h-4 w-4 shrink-0 text-foreground"/>
            ) : (
                <ArrowUpDown className="h-4 w-4 shrink-0 opacity-50 transition-opacity group-hover:opacity-100"/>
            )}
        </button>
    );
}
