import { Button } from "@repo/ui/primitives/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/primitives/card";
import { XCircle } from "lucide-react";
import Link from "next/link";

export function InvalidTokenCard() {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          <XCircle className="h-16 w-16 text-destructive" />
        </div>
        <CardTitle>Invalid Verification Link</CardTitle>
        <CardDescription>
          This link is invalid or missing required information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild className="w-full">
          <Link href="/signup">Return to Signup</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
