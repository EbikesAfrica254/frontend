import Link from "next/link";

interface PolicyFooterProps {
  type: "terms" | "privacy";
  lastUpdated?: string;
}

export function PolicyFooter({ type, lastUpdated }: PolicyFooterProps) {
  const otherPolicy = type === "terms" ? "privacy" : "terms";
  const otherPolicyName =
    type === "terms" ? "Privacy Policy" : "Terms & Conditions";

  return (
    <footer className="border-t mt-8">
      <div className="px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm text-muted-foreground">
          {/* Left side - Cross reference */}
          <div className="flex items-center gap-1 shrink-0">
            <span>Please also review our</span>
            <Link
              href={`/${otherPolicy}`}
              className="font-medium underline underline-offset-4 hover:text-primary"
            >
              {otherPolicyName}
            </Link>
          </div>

          {/* Right side - Contact */}
          <div className="flex items-center gap-1 shrink-0 md:ml-auto">
            <span>Questions?</span>
            <Link
              href="/contact"
              className="font-medium underline underline-offset-4 hover:text-primary"
            >
              Contact us
            </Link>
          </div>
        </div>

        {/* Last updated - separate row */}
        {lastUpdated && (
          <div className="text-xs text-muted-foreground mt-2">
            Last Updated: {lastUpdated}
          </div>
        )}
      </div>
    </footer>
  );
}
