"use client"

import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Flex, Grid } from "@radix-ui/themes";
import RecentRoomBookings from "./_components/RecentRoomBooking";
import RoomBookingsChart from "./_components/RoomBookingChart";
import RoomBookingSummaryArea from "./_components/RoomBookingSummary";
import {
  useFetchRecentRoomBookings,
  useFetchRoomBookingsSummary,
} from "./_features/hooks";
import LoadingRoomBookingDashboard from "./loading";
import { useSession } from "next-auth/react";

const RoomBookingDashboard = () => {
  const { status } = useSession();
  const axios = useAxiosAuth();

  const {
    data: roomBookingsSummaryCounts,
    isLoading: isLoadingRoomBookingscounts,
    error,
  } = useFetchRoomBookingsSummary({
    axios,
    // hotelId,
    enabled: status === "authenticated",
  });

  const { data: recentRoomBookings, isLoading: isLoadingRecentRoomBookings } =
    useFetchRecentRoomBookings({
      axios,
      // hotelId,
      enabled: status === "authenticated",
    });

  if (
    isLoadingRoomBookingscounts ||
    isLoadingRecentRoomBookings ||
    status === "loading"
  )
    return <LoadingRoomBookingDashboard />;

  if (error) return;

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="4">
      <Flex direction="column" gap="4">
        <RoomBookingSummaryArea
          roomBookingSummaryCounts={roomBookingsSummaryCounts!}
        />
        <RoomBookingsChart
          roomBookingSummaryCounts={roomBookingsSummaryCounts!}
        />
      </Flex>
      <RecentRoomBookings roomBookings={recentRoomBookings!} />
    </Grid>
  );
};

export default RoomBookingDashboard;
