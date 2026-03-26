import { CapabilityClass } from "../types/enums";

type BadgeVariant = "default" | "destructive" | "outline" | "secondary";

export function formatCapabilityClass(
  capabilityClass: CapabilityClass,
): string {
  const labels: Record<CapabilityClass, string> = {
    [CapabilityClass.BICYCLE_RIDER]: "Bicycle Rider",
    [CapabilityClass.LIGHT_MOTOR_RIDER]: "Light Motor Rider",
    [CapabilityClass.VEHICLE_DRIVER]: "Vehicle Driver",
  };

  return labels[capabilityClass] ?? capabilityClass;
}

export function getCapabilityClassBadge(capabilityClass: CapabilityClass): {
  label: string;
  variant: BadgeVariant;
} {
  const classMap: Record<
    CapabilityClass,
    { label: string; variant: BadgeVariant }
  > = {
    [CapabilityClass.BICYCLE_RIDER]: {
      label: "Bicycle Rider",
      variant: "outline",
    },
    [CapabilityClass.LIGHT_MOTOR_RIDER]: {
      label: "Light Motor Rider",
      variant: "secondary",
    },
    [CapabilityClass.VEHICLE_DRIVER]: {
      label: "Vehicle Driver",
      variant: "default",
    },
  };

  return classMap[capabilityClass];
}
