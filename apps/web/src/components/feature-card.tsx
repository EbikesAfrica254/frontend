import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  description: string;
  icon: LucideIcon;
  title: string;
}

export function FeatureCard({
  description,
  icon: Icon,
  title,
}: FeatureCardProps) {
  return (
    <article className="flex flex-col gap-4">
      {/* Icon Container */}
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
        <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold">{title}</h3>

      {/* Description */}
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </article>
  );
}
