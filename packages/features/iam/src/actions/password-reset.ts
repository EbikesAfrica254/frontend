"use server";

import {
  CompletePasswordResetRequest,
  PasswordResetRequest,
} from "../types/password-reset";
import {
  completePasswordResetResource,
  requestPasswordResetResource,
} from "../resources/password-reset";
import { withAction } from "@repo/shared/actions";

export const completePasswordReset = withAction(
  async (data: CompletePasswordResetRequest) => {
    return await completePasswordResetResource(data);
  },
);

export const requestPasswordReset = withAction(
  async (data: PasswordResetRequest) => {
    return await requestPasswordResetResource(data);
  },
);
