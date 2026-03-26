"use client";

import { PolicyHeader } from "./policy-header";
import { PolicyMarkdown } from "./policy-markdown";
import { PolicyFooter } from "./policy-footer";
import { PolicyData } from "@/data/policies";

export function PolicyContent({ policy }: { policy: PolicyData }) {
  const title =
    policy.type === "terms" ? "Terms & Conditions" : "Privacy Policy";
  return (
    <article className="px-4 py-4 space-y-8">
      <PolicyHeader
        title={title}
        version={policy.version}
        effectiveDate={policy.effectiveDate}
        lastUpdated={policy.lastUpdated}
      />

      <PolicyMarkdown content={policy.content} />

      <PolicyFooter type={policy.type} />
    </article>
  );
}
