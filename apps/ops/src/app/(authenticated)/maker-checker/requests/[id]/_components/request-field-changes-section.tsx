import type { FieldChangeResponse } from "@repo/features-maker-checker/client";
import { ApprovalChangesTable } from "@repo/features-maker-checker/client";

interface RequestFieldChangesSectionProps {
  fieldChanges: FieldChangeResponse[];
}

export function RequestFieldChangesSection({
  fieldChanges,
}: RequestFieldChangesSectionProps) {
  return (
    <ApprovalChangesTable
      fieldChanges={fieldChanges}
      excludeFields={["documents"]}
    />
  );
}
