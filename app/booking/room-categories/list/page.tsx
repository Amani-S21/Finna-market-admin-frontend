"use client"

import React from "react";
import RoomCategoriesListLoadingPage from "./loading";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { useFetchRooms } from "../_features/hooks";
import { Flex } from "@radix-ui/themes";
import RoomCategoriesTable from "../_components/RoomCategoriesTable";
import { Pagination } from "@/app/_components";
import RoomCategoriesToolBar from "../_components/RoomCategoriesToolBar";

const RoomCategoriesListpage = () => {
  const { status } = useSession();
  const axios = useAxiosAuth();
  const searchParams = useSearchParams();
  const page: string = searchParams.get("page") ?? "";

  const {
    data: roomsResponse,
    isLoading,
    error,
  } = useFetchRooms({ axios, page, enabled: status === "authenticated" });

  if (isLoading || status === "loading")
    return <RoomCategoriesListLoadingPage />;

  if (error) return;

  return (
    <Flex direction="column" gap="4">
      <RoomCategoriesToolBar />
      {roomsResponse && (
        <RoomCategoriesTable roomCategoriesResponse={roomsResponse} />
      )}
      <Pagination
        pageSize={10}
        currentPage={parseInt(page)}
        itemCount={roomsResponse?.count ?? 0}
        className="mt-4"
      />
    </Flex>
  );
};

export default RoomCategoriesListpage;
