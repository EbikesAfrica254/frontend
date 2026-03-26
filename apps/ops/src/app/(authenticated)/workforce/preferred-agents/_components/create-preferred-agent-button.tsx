"use client";

import {useState, useTransition} from "react";
import {useRouter} from "next/navigation";
import {Plus} from "lucide-react";
import {toast} from "sonner";
import type {CreatePreferredAgentFormData} from "@repo/features-workforce/client";
import {CreatePreferredAgentForm} from "@repo/features-workforce/client";
import {createPreferredAgent, searchAgents,} from "@repo/features-workforce/actions";
import {Button} from "@repo/ui/primitives/button";
import {Sheet, SheetContent, SheetHeader, SheetTitle,} from "@repo/ui/primitives/sheet";

interface CreatePreferredAgentButtonProps {
  organizationId: string | null;
}

export function CreatePreferredAgentButton({
  organizationId,
}: CreatePreferredAgentButtonProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [, startTransition] = useTransition();

  const handleSubmit = (data: CreatePreferredAgentFormData) => {
    startTransition(async () => {
      const result = await createPreferredAgent(data);

      if (result && !result.success) {
        toast.error(result.error ?? "Failed to add preferred agent");
      } else {
        toast.success("Preferred agent added");
        setIsOpen(false);
        router.refresh();
      }
    });
  };

  return (
    <>
      <Button size="sm" onClick={() => setIsOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Add Preferred Agent
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add Preferred Agent</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            {organizationId && (
              <CreatePreferredAgentForm
                organizationId={organizationId}
                onFetch={(query) => searchAgents(query)}
                onSubmit={handleSubmit}
              />
            )}
            {!organizationId && (
              <p className="text-sm text-muted-foreground">
                No active organization found in session.
              </p>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
