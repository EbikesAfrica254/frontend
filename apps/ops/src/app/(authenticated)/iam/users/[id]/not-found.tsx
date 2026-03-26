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

export default function UserNotFound() {
  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>User not found</CardTitle>
          <CardDescription>
            The user you&#39;re looking for doesn&#39;t exist or may have been
            deleted.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Please check the user ID or return to the users list to find the
            user you&#39;re looking for.
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="/access/users">Back to users list</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
