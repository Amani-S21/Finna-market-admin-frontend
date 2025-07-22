"use client";

import { Pagination } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Roles } from "@/app/lib/types";
import { Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import UsersTable from "../_components/UsersTable";
import UsersToolBar from "../_components/UsersToolBar";
import { useFetchUsers, useFetchUsersByShop } from "../_features/hooks";
import LoadingUsersPage from "./loading";

const BuildUsersPage = () => {
  const { status, data: session } = useSession();
  const axios = useAxiosAuth();
  const searchParams = useSearchParams();

  const page: string = searchParams.get("page") ?? "";
  const role: Roles = searchParams.get("role") as Roles;

  const affectations = session?.data?.shopAffectations ?? [];
  const shopId = affectations.length > 0 ? affectations[0]?.shop.id : null;

  const fetchUsers = useFetchUsers({
    axios,
    page,
    role,
    enabled: status === "authenticated" && !shopId,
  });

  const fetchUsersByShop = useFetchUsersByShop({
    axios,
    shopId: `${shopId}`,
    page,
    enabled: status === "authenticated" && !!shopId,
  });

  const usersResponse = shopId ? fetchUsersByShop.data : fetchUsers.data;
  const isLoading = shopId ? fetchUsersByShop.isLoading : fetchUsers.isLoading;

  const currentUserRole = () => {
    if (affectations.length > 0) {
      if (affectations && affectations.length > 0) {
        return affectations[0].role as Roles;
      }
    } else {
      return session?.data.role as Roles;
    }
  };

  if (isLoading || status === "loading") return <LoadingUsersPage />;

  return (
    <Suspense fallback={<LoadingUsersPage />}>
      <Flex direction="column">
        <UsersToolBar userRole={currentUserRole()!} />
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
