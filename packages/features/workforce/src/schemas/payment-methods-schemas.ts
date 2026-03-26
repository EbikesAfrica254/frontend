import { z } from "zod";
import { PaymentMethodType } from "../types/enums";

const paymentMethodTypeValues = Object.values(PaymentMethodType) as [
  PaymentMethodType,
  ...PaymentMethodType[],
];

const PHONE_PATTERN = /^\+[1-9][0-9]{6,14}$/;
const TILL_PAYBILL_PATTERN = /^[0-9]{4,8}$/;

export const createPaymentMethodSchema = z
  .object({
    accountName: z.string().min(1, "Account name is required").max(255),
    accountReference: z.string().max(100).optional(),
    isPrimary: z.boolean(),
    paybillNumber: z
      .string()
      .regex(TILL_PAYBILL_PATTERN, "Paybill number must be 4–8 digits")
      .optional(),
    paymentMethodType: z.enum(paymentMethodTypeValues, {
      message: "Payment method type is required",
    }),
    phoneNumber: z
      .string()
      .regex(PHONE_PATTERN, "Phone number must be in E.164 format")
      .max(20)
      .optional(),
    tillNumber: z
      .string()
      .regex(TILL_PAYBILL_PATTERN, "Till number must be 4–8 digits")
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.paymentMethodType === PaymentMethodType.MPESA_PERSONAL &&
      !data.phoneNumber
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Phone number is required for M-Pesa Personal",
        path: ["phoneNumber"],
      });
    }

    if (
      data.paymentMethodType === PaymentMethodType.MPESA_TILL &&
      !data.tillNumber
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Till number is required for M-Pesa Till",
        path: ["tillNumber"],
      });
    }

    if (data.paymentMethodType === PaymentMethodType.MPESA_PAYBILL) {
      if (!data.paybillNumber) {
        ctx.addIssue({
          code: "custom",
          message: "Paybill number is required for M-Pesa Paybill",
          path: ["paybillNumber"],
        });
      }
      if (!data.accountReference) {
        ctx.addIssue({
          code: "custom",
          message: "Account reference is required for M-Pesa Paybill",
          path: ["accountReference"],
        });
      }
    }
  });

export const updatePaymentMethodSchema = z.object({
  accountName: z.string().min(1, "Account name is required").max(255),
});

export type CreatePaymentMethodFormData = z.infer<
  typeof createPaymentMethodSchema
>;
export type UpdatePaymentMethodFormData = z.infer<
  typeof updatePaymentMethodSchema
>;
