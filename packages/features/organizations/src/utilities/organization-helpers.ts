import { RegistrationType } from "../types/enums";

export function formatRegistrationType(type: RegistrationType): string {
  const labels: Record<RegistrationType, string> = {
    [RegistrationType.SOLE_PROPRIETOR]: "Sole Proprietor",
    [RegistrationType.PARTNERSHIP]: "Partnership",
    [RegistrationType.LIMITED_LIABILITY_ENTITY]: "Limited Liability Company",
  };

  return labels[type] ?? type;
}
