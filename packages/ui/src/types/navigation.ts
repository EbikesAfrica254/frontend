import {
    Bell,
    BellRing,
    Building2,
    Circle,
    GitPullRequestArrow,
    Home,
    LucideIcon,
    PackageSearch,
    ShieldCheck,
    User,
    Motorbike,
} from "lucide-react";

export interface NavigationConfig {
    id: string;
    label: string;
    items: NavigationConfigItem[];
}

export interface NavigationConfigItem {
    href: string;
    iconName: string;
    label: string;
    items?: NavigationConfigSubItem[];
}

export interface NavigationConfigSubItem {
    href: string;
    label: string;
}

export interface NavigationGroup {
    id: string;
    label: string;
    items: NavigationItem[];
}

export interface NavigationItem {
    href?: string;
    icon: LucideIcon;
    label: string;
    isActive: boolean;
    isOpen?: boolean;
    items?: NavigationSubItem[];
}

export interface NavigationSubItem {
    href: string;
    label: string;
    isActive: boolean;
}

export const NAV_ICONS: Record<string, LucideIcon> = {
    Bell,
    BellRing,
    Motorbike,
    Building2,
    GitPullRequestArrow,
    Home,
    PackageSearch,
    ShieldCheck,
    User,
};

export function getIconComponent(name: string): LucideIcon {
    return NAV_ICONS[name] ?? Circle;
}
