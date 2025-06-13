"use client";

import Pagination from "@/app/_components/Pagination";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { ShopsTable, ShopsToolBar } from "../_components";
import { useFetchShops } from "../_features/hooks";
import LoadingShopspPage from "./loading";
import { Suspense } from "react";

const ShopsPage = () => {
  const { status } = useSession();
  const axios = useAxiosAuth();
  const searchParams = useSearchParams();
  const page: string = searchParams.get("page") ?? "";

  const {
    data: shopsResponse,
    isLoading,
    error,
  } = useFetchShops({ axios, page, enabled: status === "authenticated" });

  if (isLoading || status === "loading") return <LoadingShopspPage />;

  if (error) return;

  return (
    <Suspense fallback={<LoadingShopspPage />}>
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
    </Suspense>
  );
};

export default ShopsPage;
