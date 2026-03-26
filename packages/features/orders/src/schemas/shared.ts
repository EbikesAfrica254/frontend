import { z } from "zod";

export const currencySchema = z
  .string()
  .regex(/^[A-Z]{3}$/, "Currency must be a valid ISO 4217 code (e.g. KES)");
