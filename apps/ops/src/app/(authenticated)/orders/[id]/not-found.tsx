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

export default function OrderNotFound() {
  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Order not found</CardTitle>
          <CardDescription>
            The order you&#39;re looking for doesn&#39;t exist or may have been
            removed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Please check the order ID or return to the orders list to find the
            order you&#39;re looking for.
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="/orders">Back to orders list</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
