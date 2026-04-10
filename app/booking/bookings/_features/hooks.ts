import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { RoomBooking, RoomBookingResponse } from "../../dashboard/_features/types";
import { fetchRoomBookingById, fetchRoomBookings } from "./api";

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


type UseFetRoomBookingById = {
  axios: AxiosInstance;
  id: string;
  enabled: boolean;
};

export const useFetchRoomBookingById = ({
  axios,
  id,
  enabled,
}: UseFetRoomBookingById) => {
  return useQuery<RoomBooking>({
    queryKey: ["room-booking-by-id", id],
    queryFn: () => fetchRoomBookingById(axios, id),
    staleTime: 60 * 1000 * 60,
    retry: 3,
    enabled,
  });
};
