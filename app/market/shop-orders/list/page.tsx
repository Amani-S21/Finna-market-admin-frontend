"use client";

import { Pagination } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Status } from "@/app/lib/types";
import { Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  useFetchShopOrders
} from "../../orders/_features/hooks";
import ShopOrdersTable from "../_components/ShopOrdersTable";
import ShopOrdersToolBar from "../_components/ShopOrdersToolBar";
import LoadingOrdersPage from "./loading";

const BuildShopOrdersPage = () => {
  const { status } = useSession();
  const axios = useAxiosAuth();
  const searchParams = useSearchParams();
  const page: string = searchParams.get("page") ?? "1";
  const orderStatus: Status = searchParams.get("status") as Status;

  const {
    data: ordersResponse,
    isLoading,
    error,
  } = useFetchShopOrders({
    axios,
    page,
    shopId: `43599fb2-2b3c-4075-8531-8c6ccdc0a5d1`, // Finna shop id
    status: orderStatus,
    enabled: status === "authenticated",
  });

  if (isLoading || status === "loading") return <LoadingOrdersPage />;

  if (error) return;

  return (
    <Flex direction="column">
      {ordersResponse && <ShopOrdersToolBar order={ordersResponse} />}
      {ordersResponse && <ShopOrdersTable ordersResponse={ordersResponse} />}
      <Pagination
        pageSize={10}
        currentPage={parseInt(page)}
        itemCount={ordersResponse?.count ?? 0}
        className="mt-4"
      />
    </Flex>
  );
};

const ShopOrdersPage = () => {
  return (
    <Suspense>
      <BuildShopOrdersPage />
    </Suspense>
  );
};

export default ShopOrdersPage;
