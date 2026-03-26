import { Zap } from "lucide-react";
import Link from "next/link";

interface FooterLink {
  href: string;
  label: string;
}

interface FooterSection {
  links: FooterLink[];
  title: string;
}

const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Solutions",
    links: [
      { href: "/business-logistics", label: "Business Logistics" },
      { href: "/e-bike-sales", label: "E-Bike Sales" },
      { href: "/rider-network", label: "Rider Network" },
      { href: "/technician-program", label: "Technician Program" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/careers", label: "Careers" },
      { href: "/contact", label: "Contact" },
      { href: "/impact-report", label: "Impact Report" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/cookie-policy", label: "Cookie Policy" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
];

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">EBIKES AFRICA</span>
            </Link>
            <p className="text-sm text-secondary">
              Powering Africa&apos;s electric mobility future.
            </p>
          </div>

          {/* Footer Sections */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-secondary hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-secondary pt-8 text-center text-sm text-secondary">
          © {currentYear} Ebikes Africa. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
