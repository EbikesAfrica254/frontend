import { buildQueryString } from "@repo/shared/client";
import {
  searchUsersResource,
  userParamsCache,
} from "@repo/features-iam/server";
import { UserFilters } from "@repo/features-iam/client";
import { CreateUserSheet } from "./_components/create-user-sheet";
import { UsersTable } from "../users/_components/users-table";

interface UsersPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const resolvedParams = await searchParams;
  const filters = userParamsCache.parse(resolvedParams);

  const queryString = buildQueryString({
    email: filters.email,
    firstName: filters.firstName,
    lastName: filters.lastName,
    organizationId: filters.organizationId,
    page: filters.page ?? 1,
    phoneNumber: filters.phoneNumber,
    size: filters.size ?? 20,
    sortBy: filters.sortBy,
    sortDirection: filters.sortDirection,
    status: filters.status,
    username: filters.username,
  });

  const response = await searchUsersResource(queryString);

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-end">
        <CreateUserSheet />
      </div>
      <UserFilters />
      <UsersTable
        data={response.data}
        pageCount={response.totalPages}
        totalElements={response.totalElements}
      />
    </div>
  );
}
