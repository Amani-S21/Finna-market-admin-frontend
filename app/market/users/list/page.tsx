"use client";

import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import { use } from "react";
import UsersToolBar from "../_components/UsersToolBar";
import { useFetchUsers } from "../_features/hooks";
import LoadingUsersPage from "./loading";
import { Pagination } from "@/app/_components";
import UsersTable from "../_components/UsersTable";
import { Flex } from "@radix-ui/themes";

const UsersPage = ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { status } = useSession();
  const axios = useAxiosAuth();
  const { page } = use(searchParams);

  const { data: usersResponse, isLoading } = useFetchUsers({
    axios,
    page,
    enabled: status === "authenticated",
  });

  if (isLoading || status === "loading") return LoadingUsersPage();

  return (
    <Flex direction="column" gap="4">
      <UsersToolBar />
      {usersResponse && <UsersTable usersResponse={usersResponse} />}
      <Pagination
        pageSize={10}
        currentPage={parseInt(page)}
        itemCount={usersResponse?.count ?? 0}
      />
    </Flex>
  );
};

export default UsersPage;
