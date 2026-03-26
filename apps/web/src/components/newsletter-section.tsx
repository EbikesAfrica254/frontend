"use client";

import { Button } from "@repo/ui/primitives/button";
import { Input } from "@repo/ui/primitives/input";
import { Mail } from "lucide-react";
import React, { useState } from "react";

interface FormState {
  email: string;
  error: string | null;
  isLoading: boolean;
  isSuccess: boolean;
}

const INITIAL_STATE: FormState = {
  email: "",
  error: null,
  isLoading: false,
  isSuccess: false,
};

export function NewsletterSection() {
  const [state, setState] = useState<FormState>(INITIAL_STATE);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(state.email)) {
      setState((prev) => ({
        ...prev,
        error: "Please enter a valid email address",
      }));
      return;
    }

    setState((prev) => ({ ...prev, error: null, isLoading: true }));

    try {
      // TODO: Call server action when implemented
      // await subscribeNewsletter(state.email);

      // Simulate API call for now
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setState({ email: "", error: null, isLoading: false, isSuccess: true });

      // Reset success message after 3 seconds
      setTimeout(() => {
        setState((prev) => ({ ...prev, isSuccess: false }));
      }, 3000);
    } catch (error) {
      console.error(`An error occurred while subscribing: ${error}`);
      setState((prev) => ({
        ...prev,
        error: "Something went wrong. Please try again.",
        isLoading: false,
      }));
    }
  };

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Mail className="h-12 w-12 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated with Electric Mobility News
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Get the latest updates on electric mobility trends, new features,
            and exclusive offers delivered to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={state.email}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, email: e.target.value }))
                }
                disabled={state.isLoading}
                required
                aria-label="Email address"
                aria-invalid={!!state.error}
                aria-describedby={state.error ? "email-error" : undefined}
                className="bg-primary-foreground text-foreground border-0 flex-1"
              />
              <Button
                type="submit"
                size="lg"
                disabled={state.isLoading}
                className="whitespace-nowrap bg-black text-white hover:bg-black/90"
              >
                {state.isLoading ? "Subscribing..." : "Subscribe"}
              </Button>
            </div>

            {state.error && (
              <p
                id="email-error"
                className="mt-4 text-sm opacity-90"
                role="alert"
              >
                {state.error}
              </p>
            )}

            {state.isSuccess && (
              <p className="mt-4 text-sm opacity-90" role="status">
                ✓ Successfully subscribed! Check your inbox.
              </p>
            )}
          </form>

          <p className="text-sm mt-4 opacity-75">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
}
