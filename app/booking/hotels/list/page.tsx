"use client"

import React from "react";
import { useFetchHotels } from "../_features/hooks";
import LoadingHotelsList from "./loading";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Flex } from "@radix-ui/themes";
import { Pagination } from "@/app/_components";
import HotelsToolBar from "../_components/HotelsToolBar";
import HotelsTable from "../_components/HotelsTable";

const HotelsListPage = () => {
  const { status } = useSession();
  const axios = useAxiosAuth();
  const searchParams = useSearchParams();
  const page: string = searchParams.get("page") ?? "";

  const {
    data: hotelsResponse,
    isLoading,
    error,
  } = useFetchHotels({ axios, page, enabled: status === "authenticated" });

  if (isLoading || status === "loading") return <LoadingHotelsList />;

  if (error) return;

  return (
    <Flex direction="column" gap="4">
      <HotelsToolBar />
      {hotelsResponse && <HotelsTable hotelResponse={hotelsResponse} />}
      <Pagination
        pageSize={10}
        currentPage={parseInt(page)}
        itemCount={hotelsResponse?.count ?? 0}
        className="mt-4"
      />
    </Flex>
  );
};

export default HotelsListPage;
