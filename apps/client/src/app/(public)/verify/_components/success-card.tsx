import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@repo/ui/primitives/button";
import { Card, CardContent } from "@repo/ui/primitives/card";

interface SuccessCardProps {
  message: string;
  onVerifyPhone?: () => void;
}

export function SuccessCard({ message, onVerifyPhone }: SuccessCardProps) {
  return (
    <Card className="max-w-md mx-auto">
      <CardContent className="pt-8 pb-6 space-y-6">
        <div className="text-center space-y-3">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
          <h2 className="text-2xl font-semibold">Success!</h2>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>

        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link href="/api/auth/signin/keycloak">Log in</Link>
          </Button>
          {onVerifyPhone && (
            <Button
              className="w-full"
              onClick={onVerifyPhone}
              variant="outline"
            >
              Verify phone number
            </Button>
          )}
        </div>

        {onVerifyPhone && (
          <p className="text-center text-xs text-muted-foreground">
            Phone verification is optional. It will be required before making
            payments.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
