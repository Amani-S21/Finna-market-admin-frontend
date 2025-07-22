"use client";

import { Pagination } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Status } from "@/app/lib/types";
import { Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { OrdersToolBar } from "../_components";
import { useFetchOrders } from "../_features/hooks";
import LoadingOrdersPage from "./loading";
import { Suspense } from "react";
import OrdersTable from "../_components/OrdersTable";

const BuildOrdersPage = () => {
  const { status } = useSession();
  const axios = useAxiosAuth();
  const searchParams = useSearchParams();
  const page: string = searchParams.get("page") ?? "1";
  const orderStatus: Status = searchParams.get("status") as Status;

  const {
    data: ordersResponse,
    isLoading,
    error,
  } = useFetchOrders({
    axios,
    page,
    status: orderStatus,
    enabled: status === "authenticated",
  });

  if (isLoading || status === "loading") return <LoadingOrdersPage />;

  if (error) return;

  return (
    <Flex direction="column">
      {ordersResponse && <OrdersToolBar order={ordersResponse} />}
      {ordersResponse && <OrdersTable ordersResponse={ordersResponse} />}
      <Pagination
        pageSize={10}
        currentPage={parseInt(page)}
        itemCount={ordersResponse?.count ?? 0}
        className="mt-4"
      />
    </Flex>
  );
};

const OrdersPage = () => {
  return (
    <Suspense>
      <BuildOrdersPage />
    </Suspense>
  );
};

export default OrdersPage;
