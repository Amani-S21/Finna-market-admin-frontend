import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { RoomBookingResponse } from "../../dashboard/_features/types";
import { fetchRoomBookings } from "./api";

type UseFetRoomBookings = {
  axios: AxiosInstance;
  page: string;
  enabled: boolean;
};

export const useFetchRoomBookings = ({
  axios,
  page,
  enabled,
}: UseFetRoomBookings) => {
  return useQuery<RoomBookingResponse>({
    queryKey: ["room-bookings", page],
    queryFn: () => fetchRoomBookings(axios, page),
    staleTime: 60 * 1000 * 60,
    retry: 3,
    enabled,
  });
};
