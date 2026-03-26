import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/primitives/card";

export default function DeliveryNotFound() {
  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Invalid delivery link</CardTitle>
          <CardDescription>
            This delivery link is not valid or does not exist.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Please check the link you received via SMS and try again. If the
            problem persists, contact the sender for assistance.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
