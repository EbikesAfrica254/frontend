"use client";

import Link from "next/link";
import { Checkbox } from "@repo/ui/primitives/checkbox";
import { Label } from "@repo/ui/primitives/label";
import { useId } from "react";

interface TermsCheckboxProps {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean, metadata: AcceptanceMetadata) => void;
  disabled?: boolean;
  error?: string;
  termsVersion: string;
  privacyVersion: string;
  required?: boolean;
}

interface AcceptanceMetadata {
  timestamp: string;
  termsVersion: string;
  privacyVersion: string;
  userAgent: string;
}

export function TermsCheckbox({
  id,
  checked,
  onCheckedChange,
  disabled = false,
  error,
  termsVersion,
  privacyVersion,
  required = true,
}: TermsCheckboxProps) {
  const errorId = useId();
  const descriptionId = useId();

  const handleChange = (isChecked: boolean) => {
    const metadata: AcceptanceMetadata = {
      timestamp: new Date().toISOString(),
      termsVersion,
      privacyVersion,
      userAgent: navigator.userAgent,
    };
    onCheckedChange(isChecked, metadata);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-start space-x-3">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={handleChange}
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : descriptionId}
        />
        <div className="space-y-1 leading-none">
          <Label
            htmlFor={id}
            className="text-sm font-normal leading-relaxed cursor-pointer"
          >
            <span id={descriptionId}>
              I agree to the{" "}
              <Link
                href={`/terms?v=${termsVersion}`}
                className="font-medium underline underline-offset-4 hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms & Conditions
              </Link>{" "}
              (v{termsVersion}) and{" "}
              <Link
                href={`/privacy?v=${privacyVersion}`}
                className="font-medium underline underline-offset-4 hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </Link>{" "}
              (v{privacyVersion})
            </span>
          </Label>
        </div>
      </div>
      {error && (
        <p id={errorId} className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
