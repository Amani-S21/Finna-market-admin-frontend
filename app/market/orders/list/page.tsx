"use client"

import { Pagination } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import { use } from "react";
import OrdersTable from "../_components/OrdersTable";
import OrdersToolBar from "../_components/OrdersToolBar";
import { useFetchOrders } from "../_features/hooks";
import LoadingOrdersPage from "./loading";

const OrdersPage = ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {

  const { status } = useSession();
  const axios = useAxiosAuth();
  const { page } = use(searchParams);

  const {
    data: ordersResponse,
    isLoading,
    error,
  } = useFetchOrders({ axios, page, enabled: status === "authenticated" });

  if (isLoading || status === "loading") return <LoadingOrdersPage />;

  if (error) return;
  
  return (
    <>
      <OrdersToolBar />
      {ordersResponse && <OrdersTable ordersResponse={ordersResponse} />}
      <Pagination
        pageSize={10}
        currentPage={parseInt(page)}
        itemCount={ordersResponse?.count ?? 0}
        className="mt-4"
      />
    </>
  );
};

export default OrdersPage;
