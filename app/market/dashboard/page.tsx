"use client";

import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import {
  useFetchOrdersSummary,
  useFetchRecentOrders,
} from "../orders/_features/hooks";
import OrdersSummary from "./_components/OrdersSummary";
import LoadingDashboardPage from "./loading";
import { OrdersChart, RecentOrders } from "./_components";
import { Flex, Grid } from "@radix-ui/themes";

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
    <Grid columns={{ initial: "1", md: "2" }} gap="4">
      <Flex direction="column" gap="4">
        <OrdersSummary orderSummaryCounts={orderSummaryCounts!} />
        <OrdersChart orderSummaryCounts={orderSummaryCounts!} />
      </Flex>
      <RecentOrders orders={recentOrders!} />
    </Grid>
  );
};

export default MarketHomePage;
