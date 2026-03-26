"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@repo/ui/primitives/button";
import { Input } from "@repo/ui/primitives/input";
import { Label } from "@repo/ui/primitives/label";
import { PhoneInput } from "@repo/ui/inputs/phone-input";

import { SignupSuccess } from "./signup-success";
import { TermsCheckbox } from "./terms-checkbox";
import {
  CURRENT_PRIVACY_VERSION,
  CURRENT_TERMS_VERSION,
} from "@/data/constants";
import { SignupFormData, signupSchema } from "@repo/features-iam/client";
import { signup } from "@repo/features-iam/actions";
import { handleSignupError } from "@repo/features-iam/client";

export function SignupForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      username: "",
      termsAccepted: false,
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("username", data.username);

      const result = await signup(formData);

      if (!result.success) {
        handleSignupError(result, form);
        return;
      }

      form.reset();
      setShowSuccess(true);
      toast.success(
        "Account created! Check your email and phone for verification codes.",
      );
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return <SignupSuccess />;
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <div className="space-y-4">
        <div className="space-y-3">
          <Controller
            control={form.control}
            name="firstName"
            render={({ field, fieldState }) => (
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  {...field}
                  id="firstName"
                  placeholder="Enter your first name"
                  autoComplete="given-name"
                  disabled={isSubmitting}
                  aria-invalid={!!fieldState.error}
                />
                {fieldState.error && (
                  <p className="text-sm text-destructive">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            control={form.control}
            name="lastName"
            render={({ field, fieldState }) => (
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  {...field}
                  id="lastName"
                  placeholder="Enter your last name"
                  autoComplete="family-name"
                  disabled={isSubmitting}
                  aria-invalid={!!fieldState.error}
                />
                {fieldState.error && (
                  <p className="text-sm text-destructive">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">
            Contact Information
          </h3>

          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  {...field}
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={isSubmitting}
                  aria-invalid={!!fieldState.error}
                />
                <p className="text-xs text-muted-foreground">
                  We&#39;ll send a verification link to this address
                </p>
                {fieldState.error && (
                  <p className="text-sm text-destructive">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            control={form.control}
            name="phoneNumber"
            render={({ field, fieldState }) => (
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <PhoneInput
                  {...field}
                  id="phoneNumber"
                  placeholder="Enter phone number"
                  defaultCountry="KE"
                  disabled={isSubmitting}
                  aria-invalid={!!fieldState.error}
                />
                <p className="text-xs text-muted-foreground">
                  You&#39;ll receive an SMS verification code
                </p>
                {fieldState.error && (
                  <p className="text-sm text-destructive">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">
            Account Information
          </h3>

          <Controller
            control={form.control}
            name="username"
            render={({ field, fieldState }) => (
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  {...field}
                  id="username"
                  placeholder="Choose a username"
                  autoComplete="username"
                  disabled={isSubmitting}
                  aria-invalid={!!fieldState.error}
                />
                <p className="text-xs text-muted-foreground">
                  Letters, numbers, underscores, and hyphens only
                </p>
                {fieldState.error && (
                  <p className="text-sm text-destructive">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        <Controller
          control={form.control}
          name="termsAccepted"
          render={({ field, fieldState }) => (
            <TermsCheckbox
              id="terms"
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={isSubmitting}
              error={fieldState.error?.message}
              termsVersion={CURRENT_TERMS_VERSION}
              privacyVersion={CURRENT_PRIVACY_VERSION}
            />
          )}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating Account...
          </>
        ) : (
          "Create Account"
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/api/auth/signin/keycloak"
          className="font-medium underline underline-offset-4 hover:text-primary"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}
