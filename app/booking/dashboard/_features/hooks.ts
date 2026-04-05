import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { fetchRecentRoomBookings, fetchRoomBookingsSummary } from "./api";
import { RoomBooking, RoomBookingSummary } from "./types";

type FetchOrdersSummary = {
  axios: AxiosInstance;
  enabled: boolean;
  // shopId?: string;
};

export const useFetchRoomBookingsSummary = ({
  axios,
  enabled,
  // shopId,
}: FetchOrdersSummary) => {
  return useQuery<RoomBookingSummary>({
    queryKey: ["room-bookings-summary"],
    queryFn: () =>
      fetchRoomBookingsSummary(
        axios,
        // shopId
      ),
    staleTime: 60 * 1000 * 5,
    retry: 3,
    enabled,
  });
};

export const useFetchRecentRoomBookings = ({
  axios,
  enabled,
  // hotelId,
}: FetchOrdersSummary) => {
  return useQuery<RoomBooking[]>({
    queryKey: ["room-bookings-recent"],
    queryFn: () =>
      fetchRecentRoomBookings(
        axios,
        // hotelId
      ),
    staleTime: 60 * 1000 * 5,
    retry: 3,
    enabled,
  });
};
