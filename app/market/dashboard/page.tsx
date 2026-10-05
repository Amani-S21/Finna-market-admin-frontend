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
import DashboardView from "@/app/_components/DashboardView";

const MarketHomePage = () => {
  const { status, data: session } = useSession();
  const axios = useAxiosAuth();

  // const shopAffectation = session?.data.shopAffectations;
  // let shopId = undefined;

  if (session?.data.role !== "SUPER_ADMIN") {
    // if (shopAffectation && shopAffectation.length > 0) {
    //   shopId = shopAffectation[0].shop.id;
    // }
  }

  const {
    data: orderSummaryCounts,
    isLoading: isLoadingOrdercounts,
    error,
  } = useFetchOrdersSummary({
    axios,
    shopId : undefined ,
    enabled: status === "authenticated",
  });

  const { data: recentOrders, isLoading: isLoadingRecentOrders } =
    useFetchRecentOrders({
      axios,
      shopId : undefined,
      enabled: status === "authenticated",
    });

  if (isLoadingOrdercounts || isLoadingRecentOrders || status === "loading")
    return <LoadingDashboardPage />;

  if (error) return;

  return (
    <DashboardView title="Tableau de bord du marché" description="Suivez vos commandes et retrouvez les dernières activités de votre marché."
      summary={<OrdersSummary orderSummaryCounts={orderSummaryCounts!} />}
      chart={<OrdersChart orderSummaryCounts={orderSummaryCounts!} />}
      recent={<RecentOrders orders={recentOrders!} />}
    />
  );
};

export default MarketHomePage;
