"use client";

import { useState } from "react";
import { Button } from "@repo/ui/primitives/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/primitives/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@repo/ui/primitives/input-otp";
import { Loader2 } from "lucide-react";
import Link from "next/link";

interface VerifyCodeFormProps {
  error: string | null | undefined;
  formAction: (formData: FormData) => void;
  isPending: boolean;
}

export function VerifyCodeForm({
  error,
  formAction,
  isPending,
}: VerifyCodeFormProps) {
  const [code, setCode] = useState("");

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Verify Phone Number</CardTitle>
        <CardDescription>
          Enter the verification code we sent to your phone number.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <input name="code" type="hidden" value={code} />

          <div className="space-y-2">
            <div className="flex justify-center">
              <InputOTP maxLength={6} onChange={setCode} value={code}>
                <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-14 *:data-[slot=input-otp-slot]:w-14 *:data-[slot=input-otp-slot]:text-xl">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator className="mx-2" />
                <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-14 *:data-[slot=input-otp-slot]:w-14 *:data-[slot=input-otp-slot]:text-xl">
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          {error && <div className="text-sm text-destructive">{error}</div>}

          <Button
            className="w-full"
            disabled={isPending || code.length < 6}
            type="submit"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center">
        <Link
          className="text-sm text-primary hover:underline"
          href="/api/auth/signin/keycloak"
        >
          Log in instead
        </Link>
      </CardFooter>
    </Card>
  );
}
