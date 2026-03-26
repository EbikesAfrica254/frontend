"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@repo/ui/primitives/sheet";
import { Button } from "@repo/ui/primitives/button";
import { reportIncident } from "@repo/features-orders/actions";
import type { ReportIncidentFormData } from "@repo/features-orders/client";
import { ReportIncidentForm } from "@repo/features-orders/client";

interface ReportIncidentDialogProps {
  agentId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId: string;
}

export function ReportIncidentDialog({
  agentId,
  open,
  onOpenChange,
  orderId,
}: ReportIncidentDialogProps) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (data: ReportIncidentFormData) => {
    startTransition(async () => {
      const result = await reportIncident(orderId, {
        agentId: data.agentId,
        incidentType: data.incidentType,
        lastKnownLatitude: data.lastKnownLatitude,
        lastKnownLongitude: data.lastKnownLongitude,
        notes: data.notes,
      });

      if (result.success) {
        toast.success("Incident reported successfully");
        onOpenChange(false);
      } else {
        toast.error(result.error || "Failed to report incident");
      }
    });
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!isPending) {
      onOpenChange(newOpen);
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent className="sm:max-w-150 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Report Incident</SheetTitle>
          <SheetDescription>
            Report a goods incident for this order. Only allowed for orders in
            IN_TRANSIT, DELIVERED or ESCALATED status.
          </SheetDescription>
        </SheetHeader>

        <ReportIncidentForm agentId={agentId} onSubmit={handleSubmit} />

        <SheetFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="report-incident-form"
            disabled={isPending}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Reporting..." : "Report Incident"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
