export interface NavLink {
  href: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: "/buy", label: "Buy an e-bike" },
  { href: "/deliver", label: "Deliver Goods" },
];
