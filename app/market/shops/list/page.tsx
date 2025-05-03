"use client";

import Pagination from "@/app/_components/Pagination";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { use } from "react";
import LoadingShopspPage from "./loading";
import { useFetchShops } from "../_features/hooks";
import { ShopsToolBar, ShopsTable } from "../_components";
import { useSession } from "next-auth/react";
import { Flex } from "@radix-ui/themes";

const ShopsPage = ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { status } = useSession();
  const axios = useAxiosAuth();
  const { page } = use(searchParams);

  const {
    data: shopsResponse,
    isLoading,
    error,
  } = useFetchShops({ axios, page, enabled: status === "authenticated" });

  if (isLoading || status === "loading") return <LoadingShopspPage />;

  if (error) return;

  return (
    <Flex direction="column" gap="4">
      <ShopsToolBar />
      {shopsResponse && <ShopsTable shopsResponse={shopsResponse} />}
      <Pagination
        pageSize={10}
        currentPage={parseInt(page)}
        itemCount={shopsResponse?.count ?? 0}
        className="mt-4"
      />
    </Flex>
  );
};

export default ShopsPage;
