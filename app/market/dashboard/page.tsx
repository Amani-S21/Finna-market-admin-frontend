"use client";

import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import {
  useFetchOrdersSummary,
  useFetchRecentOrders,
} from "../orders/_features/hooks";
import OrdersSummary from "./_components/OrdersSummary";
import LoadingDashboardPage from "./loading";
import { RecentOrders } from "./_components";
import { Flex } from "@radix-ui/themes";

const MarketHomePage = () => {
  const { status } = useSession();
  const axios = useAxiosAuth();

  const {
    data: orderSummaryCounts,
    isLoading: isLoadingOrdercounts,
    error,
  } = useFetchOrdersSummary({ axios, enabled: status === "authenticated" });

  const { data: recentOrders, isLoading: isLoadingRecentOrders } =
    useFetchRecentOrders({ axios, enabled: status === "authenticated" });

  if (isLoadingOrdercounts || isLoadingRecentOrders || status === "loading")
    return <LoadingDashboardPage />;

  if (error) return;

  return (
    <Flex direction="column" gap="4">
      <OrdersSummary orderSummaryCounts={orderSummaryCounts!} />
      <RecentOrders orders={recentOrders!} />
    </Flex>
  );
};

export default MarketHomePage;
