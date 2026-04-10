"use client";

import { Pagination } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import RoomBookingTable from "../_components/RoomBookingTable";
import RoomBookingToolBar from "../_components/RoomBookingToolBar";
import { useFetchRoomBookings } from "../_features/hooks";
import LoadingBookingsList from "./loading";

const BookingsListPage = () => {
  const { status } = useSession();
  const axios = useAxiosAuth();
  const searchParams = useSearchParams();
  const page: string = searchParams.get("page") ?? "";

  const {
    data: roomBookingResponse,
    isLoading,
    error,
  } = useFetchRoomBookings({
    axios,
    page,
    enabled: status === "authenticated",
  });

  if (isLoading || status === "loading") return <LoadingBookingsList />;

  if (error) return;

  return (
    <Flex direction="column" gap="4">
      <RoomBookingToolBar />
      {roomBookingResponse && (
        <RoomBookingTable roomBookingResponse={roomBookingResponse} />
      )}
      <Pagination
        pageSize={10}
        currentPage={parseInt(page)}
        itemCount={roomBookingResponse?.count ?? 0}
        className="mt-4"
      />
    </Flex>
  );
};

export default BookingsListPage;
