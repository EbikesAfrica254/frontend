"use client";

import {usePathname} from "next/navigation";
import {useCallback} from "react";

export function useActivePath() {
    const pathname = usePathname();

    const isLeafActive = useCallback(
        (href: string): boolean => {
            return pathname === href;
        },
        [pathname],
    );

    const isAncestorOf = useCallback(
        (href: string): boolean => {
            if (href === "/") return false;
            return pathname.startsWith(`${href}/`) || pathname === href;
        },
        [pathname],
    );

    return {isAncestorOf, isLeafActive, pathname};
}
