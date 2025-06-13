"use client";

import { Pagination } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Roles } from "@/app/lib/types";
import { Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import UsersTable from "../_components/UsersTable";
import UsersToolBar from "../_components/UsersToolBar";
import { useFetchUsers } from "../_features/hooks";
import LoadingUsersPage from "./loading";
import { Suspense } from "react";

const BuildUsersPage = () => {
  const { status } = useSession();
  const axios = useAxiosAuth();
  const searchParams = useSearchParams();
  const page: string = searchParams.get("page") ?? "";
  const role: Roles = searchParams.get("role") as Roles;

  const { data: usersResponse, isLoading } = useFetchUsers({
    axios,
    page,
    role,
    enabled: status === "authenticated",
  });

  if (isLoading || status === "loading") return <LoadingUsersPage />;

  return (
    <Suspense fallback={<LoadingUsersPage />}>
      <Flex direction="column" gap="4">
        <UsersToolBar />
        {usersResponse && <UsersTable usersResponse={usersResponse} />}
        <Pagination
          pageSize={10}
          currentPage={parseInt(page)}
          itemCount={usersResponse?.count ?? 0}
        />
      </Flex>
    </Suspense>
  );
};

const UsersPage = () => {
  return (
    <Suspense fallback={<LoadingUsersPage />}>
      <BuildUsersPage />
    </Suspense>
  );
};

export default UsersPage;
