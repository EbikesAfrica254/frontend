"use server";

import { revalidatePath } from "next/cache";
import { withAction, withPaginatedAction } from "@repo/shared/actions";

import {
  createUserResource,
  deleteUserResource,
  deprovisionUserResource,
  restoreUserResource,
  searchUsersResource,
  updateUserResource,
  updateUserStatusResource,
} from "../resources/users";
import type {
  CreateUserRequest,
  UpdateUserExtensionRequest,
} from "../types/users";
import type { UserStatus } from "../types/enums";

export const createUser = withAction(async (data: CreateUserRequest) => {
  const result = await createUserResource(data);

  revalidatePath("/iam/users");

  return result;
});

export const deleteUser = withAction(async (id: string) => {
  const result = await deleteUserResource(id);

  revalidatePath(`/iam/users/${id}`);
  revalidatePath("/iam/users");

  return result;
});

export const deprovisionUser = withAction(async (id: string) => {
  const result = await deprovisionUserResource(id);

  revalidatePath(`/iam/users/${id}`);
  revalidatePath("/iam/users");

  return result;
});

export const updateUser = withAction(
  async (id: string, data: UpdateUserExtensionRequest) => {
    const result = await updateUserResource(id, data);

    revalidatePath(`/iam/users/${id}`);
    revalidatePath("/iam/users");

    return result;
  },
);

export const updateUserStatus = withAction(
  async (id: string, status: UserStatus) => {
    const result = await updateUserStatusResource(id, status);

    revalidatePath(`/iam/users/${id}`);
    revalidatePath("/iam/users");

    return result;
  },
);

export const restoreUser = withAction(async (id: string) => {
  const result = await restoreUserResource(id);

  revalidatePath(`/iam/users/${id}`);
  revalidatePath("/iam/users");

  return result;
});

export const searchUsers = withPaginatedAction(async (queryString: string) => {
  return await searchUsersResource(queryString);
});
