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

export default function RequestNotFound() {
  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Request not found</CardTitle>
          <CardDescription>
            The approval request you&#39;re looking for doesn&#39;t exist or may
            have already been processed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Please check the request ID or return to the requests list.
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="/maker-checker/requests">Back to requests list</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
