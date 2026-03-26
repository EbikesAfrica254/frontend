import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@repo/ui/primitives/button";

export function CreateAgentButton() {
  return (
    <Button asChild size="sm">
      <Link href="/workforce/agents/create">
        <Plus className="mr-2 h-4 w-4" />
        New Agent
      </Link>
    </Button>
  );
}
