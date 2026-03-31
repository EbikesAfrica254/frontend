import "server-only";

import { PaginatedResponse, SuccessResponse } from "@repo/shared/server";
import {
  authenticatedIamFetch,
  unauthenticatedIamFetch,
} from "./core/iam-fetch";
import {
  CreateUserRequest,
  SignupRequest,
  UpdateUserExtensionRequest,
  UserExtensionDetailResponse,
  UserExtensionSummaryResponse,
  UserProfileResponse,
} from "../types/users";
import { UserStatus } from "../types/enums";

export async function createUserResource(
  data: CreateUserRequest,
): Promise<SuccessResponse<void>> {
  return authenticatedIamFetch<SuccessResponse<void>>("/users", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deleteUserResource(
  id: string,
): Promise<SuccessResponse<void>> {
  return authenticatedIamFetch<SuccessResponse<void>>(`/users/${id}`, {
    method: "DELETE",
  });
}

export async function deprovisionUserResource(
  id: string,
): Promise<SuccessResponse<void>> {
  return authenticatedIamFetch<SuccessResponse<void>>(
    `/users/${id}/deprovision`,
    {
      method: "DELETE",
    },
  );
}

export async function getCurrentUserResource(): Promise<
  SuccessResponse<UserProfileResponse>
> {
  return authenticatedIamFetch<SuccessResponse<UserProfileResponse>>(
    "/users/me",
  );
}

export async function getUserResource(
  id: string,
): Promise<SuccessResponse<UserExtensionDetailResponse>> {
  return authenticatedIamFetch<SuccessResponse<UserExtensionDetailResponse>>(
    `/users/${id}`,
  );
}

export async function restoreUserResource(
  id: string,
): Promise<SuccessResponse<void>> {
  return authenticatedIamFetch<SuccessResponse<void>>(`/users/${id}/restore`, {
    method: "POST",
  });
}

export async function searchUsersResource(
  queryString: string,
): Promise<PaginatedResponse<UserExtensionSummaryResponse>> {
  return authenticatedIamFetch<PaginatedResponse<UserExtensionSummaryResponse>>(
    `/users?${queryString}`,
  );
}

export async function signupResource(
  data: SignupRequest,
): Promise<SuccessResponse<void>> {
  return await unauthenticatedIamFetch("/users/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateUserResource(
  id: string,
  data: UpdateUserExtensionRequest,
): Promise<SuccessResponse<UserExtensionDetailResponse>> {
  return authenticatedIamFetch<SuccessResponse<UserExtensionDetailResponse>>(
    `/users/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
  );
}

export async function updateUserStatusResource(
  id: string,
  status: UserStatus,
): Promise<SuccessResponse<void>> {
  return authenticatedIamFetch<SuccessResponse<void>>(
    `/users/${id}/status?status=${status}`,
    {
      method: "PUT",
    },
  );
}
