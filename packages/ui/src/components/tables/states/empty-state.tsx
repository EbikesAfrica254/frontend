import {cn} from "../../../utilities";
import React from "react";

interface EmptyStateProps {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    action?: React.ReactNode;
    className?: string;
}

export function EmptyState({
                               title,
                               description,
                               icon,
                               action,
                               className,
                           }: EmptyStateProps) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center",
                className,
            )}
        >
            {icon && (
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    {icon}
                </div>
            )}
            <p className="text-lg font-medium">{title}</p>
            {description && (
                <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            )}
            {action && <div className="mt-4">{action}</div>}
        </div>
    );
}
