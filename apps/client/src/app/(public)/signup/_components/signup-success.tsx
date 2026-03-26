"use client";

export function SignupSuccess() {
  return (
    <div className="space-y-6 rounded-lg border bg-card p-8 text-card-foreground shadow-sm">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold">Check Your Messages</h2>
        <p className="text-sm text-muted-foreground">
          We&#39;ve sent verification codes to your email and phone number.
        </p>
      </div>

      <div className="space-y-4 rounded-md bg-muted p-4">
        <div className="space-y-1">
          <p className="text-sm font-medium">Next Steps:</p>
          <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
            <li>Check your email for the verification link</li>
            <li>Check your phone for the SMS verification code</li>
            <li>Complete verification to activate your account</li>
          </ol>
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Didn&#39;t receive the codes?{" "}
        <button
          type="button"
          className="font-medium underline underline-offset-4 hover:text-primary"
          onClick={() => window.location.reload()}
        >
          Resend
        </button>
      </p>
    </div>
  );
}
