"use client";

import { useState } from "react";
import { Button } from "@repo/ui/primitives/button";
import { Input } from "@repo/ui/primitives/input";
import { Label } from "@repo/ui/primitives/label";
import { Check, Eye, EyeOff, Loader2, X } from "lucide-react";
import Link from "next/link";
import { PASSWORD_CRITERIA } from "@repo/features-iam/client";

interface ActivationFormProps {
  error: string | null | undefined;
  formAction: (formData: FormData) => void;
  isPending: boolean;
}

export function ActivationForm({
  error,
  formAction,
  isPending,
}: ActivationFormProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const criteriaResults = PASSWORD_CRITERIA.map((c) => ({
    ...c,
    met: c.test(password),
  }));

  const allCriteriaMet = criteriaResults.every((c) => c.met);
  const passwordsMatch =
    password === confirmPassword && confirmPassword.length > 0;

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Set Your Password</h1>
        <p className="text-muted-foreground">
          Complete your account activation by setting a password
        </p>
      </div>

      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              disabled={isPending}
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              type={showPassword ? "text" : "password"}
              value={password}
            />
            <button
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setShowPassword((v) => !v)}
              type="button"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          <div className="space-y-1 pt-1">
            {criteriaResults.map((criterion) => (
              <div
                className={`flex items-center gap-2 text-sm ${criterion.met ? "text-green-600" : "text-muted-foreground"}`}
                key={criterion.id}
              >
                {criterion.met ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <X className="h-3.5 w-3.5" />
                )}
                {criterion.label}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Input
              disabled={isPending}
              id="confirmPassword"
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
            />
            <button
              aria-label={showConfirm ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setShowConfirm((v) => !v)}
              type="button"
            >
              {showConfirm ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {confirmPassword.length > 0 && (
            <p
              className={`text-sm ${passwordsMatch ? "text-green-600" : "text-destructive"}`}
            >
              {passwordsMatch ? "Passwords match" : "Passwords do not match"}
            </p>
          )}
        </div>

        {error && <div className="text-sm text-destructive">{error}</div>}

        <Button
          className="w-full"
          disabled={isPending || !allCriteriaMet || !passwordsMatch}
          type="submit"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Activating Account...
            </>
          ) : (
            "Activate Account"
          )}
        </Button>
      </form>

      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          className="text-primary hover:underline"
          href="/api/auth/signin/keycloak"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}
