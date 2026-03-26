import { formatDate } from "@repo/shared/client";

interface PolicyHeaderProps {
  title: string;
  version: string;
  effectiveDate: string;
  lastUpdated: string;
}

export function PolicyHeader({
  title,
  version,
  effectiveDate,
  lastUpdated,
}: PolicyHeaderProps) {
  return (
    <header className="space-y-4 border-b pb-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
        <div className="flex flex-col gap-1 text-sm text-muted-foreground">
          <p>Version {version}</p>
          <p>Effective Date: {formatDate(effectiveDate)}</p>
          <p>Last Updated: {formatDate(lastUpdated)}</p>
        </div>
      </div>
    </header>
  );
}
