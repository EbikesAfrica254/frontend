import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { BranchResponse } from "@repo/features-organizations/client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/primitives/card";

interface BranchOverviewProps {
  branch: BranchResponse;
}

const DAY_LABELS: Record<string, string> = {
  FRIDAY: "Friday",
  MONDAY: "Monday",
  SATURDAY: "Saturday",
  SUNDAY: "Sunday",
  THURSDAY: "Thursday",
  TUESDAY: "Tuesday",
  WEDNESDAY: "Wednesday",
};

const DAY_ORDER = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

export function BranchOverview({ branch }: BranchOverviewProps) {
  const sortedHours = [...(branch.operatingHours ?? [])].sort(
    (a, b) => DAY_ORDER.indexOf(a.dayOfWeek) - DAY_ORDER.indexOf(b.dayOfWeek),
  );

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            Address
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-sm">
          <p>{branch.address.streetAddress}</p>
          <p>
            {branch.address.city}
            {branch.address.postalCode && `, ${branch.address.postalCode}`}
          </p>
          <p>{branch.address.country}</p>
          {branch.address.latitude && branch.address.longitude && (
            <p className="text-muted-foreground">
              {branch.address.latitude}, {branch.address.longitude}
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Phone className="h-4 w-4 text-muted-foreground" />
            Contact
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 text-muted-foreground" />
            <span>{branch.phoneNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-3.5 w-3.5 text-muted-foreground" />
            <span>{branch.email}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Clock className="h-4 w-4 text-muted-foreground" />
            Operating Hours
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sortedHours.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No operating hours configured.
            </p>
          ) : (
            <div className="divide-y">
              {sortedHours.map((schedule) => (
                <div
                  key={schedule.dayOfWeek}
                  className="flex items-center justify-between py-2 text-sm"
                >
                  <span className="font-medium">
                    {DAY_LABELS[schedule.dayOfWeek] ?? schedule.dayOfWeek}
                  </span>
                  <span className="text-muted-foreground">
                    {schedule.opens} – {schedule.closes}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
