"use client"

import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import DashboardView from "@/app/_components/DashboardView";
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
    <DashboardView title="Tableau de bord des réservations" description="Consultez vos indicateurs et les dernières réservations de vos établissements."
      summary={<RoomBookingSummaryArea roomBookingSummaryCounts={roomBookingsSummaryCounts!} />}
      chart={<RoomBookingsChart roomBookingSummaryCounts={roomBookingsSummaryCounts!} />}
      recent={<RecentRoomBookings roomBookings={recentRoomBookings!} />}
    />
  );
};

export default RoomBookingDashboard;
