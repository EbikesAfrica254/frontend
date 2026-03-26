import Link from "next/link";
import { Button } from "@repo/ui/primitives/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/primitives/card";

export default function AgentNotFound() {
  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Agent not found</CardTitle>
          <CardDescription>
            The agent you&#39;re looking for doesn&#39;t exist or may have been
            deactivated.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Please check the agent ID or return to the agents list to find the
            agent you&#39;re looking for.
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="/workforce/agents">Back to agents list</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
