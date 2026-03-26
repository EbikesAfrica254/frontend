"use server";

import { parsePhoneNumberFromString } from "libphonenumber-js";
import { signupResource } from "../resources/users";
import { signupSchema } from "../schemas/user-schemas";
import { withAction } from "@repo/shared/actions";
import { SuccessResponse } from "@repo/shared/client";

async function signupHandler(
  formData: FormData,
): Promise<SuccessResponse<void>> {
  const rawData = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
    username: formData.get("username"),
    termsAccepted: true,
  };

  const validation = signupSchema.safeParse(rawData);

  if (!validation.success) {
    throw new Error(validation.error.issues[0]?.message || "Validation failed");
  }

  const parsed = parsePhoneNumberFromString(validation.data.phoneNumber);
  const countryCode = parsed?.country || "KE";

  return await signupResource({
    firstName: validation.data.firstName,
    lastName: validation.data.lastName,
    email: validation.data.email,
    phoneNumber: validation.data.phoneNumber,
    username: validation.data.username,
    countryCode,
  });
}

export const signup = withAction(signupHandler);
