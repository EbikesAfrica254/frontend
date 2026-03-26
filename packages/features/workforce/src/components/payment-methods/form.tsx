"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
  createPaymentMethodSchema,
  type CreatePaymentMethodFormData,
} from "../../schemas/payment-methods-schemas";
import { PaymentMethodType } from "../../types/enums";

interface CreatePaymentMethodFormProps {
  onSubmit: (data: CreatePaymentMethodFormData) => void | Promise<void>;
}

export function CreatePaymentMethodForm({
  onSubmit,
}: CreatePaymentMethodFormProps) {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    watch,
  } = useForm<CreatePaymentMethodFormData>({
    defaultValues: {
      accountName: "",
      accountReference: undefined,
      isPrimary: false,
      paybillNumber: undefined,
      paymentMethodType: PaymentMethodType.MPESA_PERSONAL,
      phoneNumber: undefined,
      tillNumber: undefined,
    },
    resolver: zodResolver(createPaymentMethodSchema),
  });

  const selectedType = watch("paymentMethodType");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="paymentMethodType" className="text-sm font-medium">
          Payment Method Type <span className="text-red-500">*</span>
        </label>
        <select
          id="paymentMethodType"
          {...register("paymentMethodType")}
          disabled={isSubmitting}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          aria-invalid={!!errors.paymentMethodType}
        >
          <option value={PaymentMethodType.MPESA_PERSONAL}>
            M-Pesa Personal
          </option>
          <option value={PaymentMethodType.MPESA_TILL}>M-Pesa Till</option>
          <option value={PaymentMethodType.MPESA_PAYBILL}>
            M-Pesa Paybill
          </option>
        </select>
        {errors.paymentMethodType && (
          <p className="text-sm text-red-600">
            {errors.paymentMethodType.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="accountName" className="text-sm font-medium">
          Account Name <span className="text-red-500">*</span>
        </label>
        <input
          id="accountName"
          type="text"
          {...register("accountName")}
          disabled={isSubmitting}
          placeholder="James Mwangi"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          aria-invalid={!!errors.accountName}
        />
        {errors.accountName && (
          <p className="text-sm text-red-600">{errors.accountName.message}</p>
        )}
      </div>

      {selectedType === PaymentMethodType.MPESA_PERSONAL && (
        <div className="space-y-2">
          <label htmlFor="phoneNumber" className="text-sm font-medium">
            M-Pesa Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="phoneNumber"
            type="tel"
            {...register("phoneNumber")}
            disabled={isSubmitting}
            placeholder="+254712345678"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            aria-invalid={!!errors.phoneNumber}
          />
          {errors.phoneNumber && (
            <p className="text-sm text-red-600">{errors.phoneNumber.message}</p>
          )}
        </div>
      )}

      {selectedType === PaymentMethodType.MPESA_TILL && (
        <div className="space-y-2">
          <label htmlFor="tillNumber" className="text-sm font-medium">
            Till Number <span className="text-red-500">*</span>
          </label>
          <input
            id="tillNumber"
            type="text"
            {...register("tillNumber")}
            disabled={isSubmitting}
            placeholder="5678901"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            aria-invalid={!!errors.tillNumber}
          />
          {errors.tillNumber && (
            <p className="text-sm text-red-600">{errors.tillNumber.message}</p>
          )}
        </div>
      )}

      {selectedType === PaymentMethodType.MPESA_PAYBILL && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="paybillNumber" className="text-sm font-medium">
              Paybill Number <span className="text-red-500">*</span>
            </label>
            <input
              id="paybillNumber"
              type="text"
              {...register("paybillNumber")}
              disabled={isSubmitting}
              placeholder="123456"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              aria-invalid={!!errors.paybillNumber}
            />
            {errors.paybillNumber && (
              <p className="text-sm text-red-600">
                {errors.paybillNumber.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="accountReference" className="text-sm font-medium">
              Account Reference <span className="text-red-500">*</span>
            </label>
            <input
              id="accountReference"
              type="text"
              {...register("accountReference")}
              disabled={isSubmitting}
              placeholder="account-001"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              aria-invalid={!!errors.accountReference}
            />
            {errors.accountReference && (
              <p className="text-sm text-red-600">
                {errors.accountReference.message}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          id="isPrimary"
          type="checkbox"
          {...register("isPrimary")}
          disabled={isSubmitting}
          className="h-4 w-4 rounded border-input"
        />
        <label htmlFor="isPrimary" className="text-sm font-medium">
          Set as primary payment method
        </label>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Add Payment Method"}
        </button>
      </div>
    </form>
  );
}
