import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { Seat, SeatPayload, SeatsResponse } from "./types";
import { createSeats, fetchSeat, fetchSeats, updateSeats } from "./api";

type UseCreateSeat = {
  axios: AxiosInstance;
};

export const useCreateSeat = ({ axios }: UseCreateSeat) => {
  return useMutation<void, Error, SeatPayload>({
    mutationFn: (data: SeatPayload) => createSeats(axios, data),
  });
};

type UseUpdateSeat = {
  axios: AxiosInstance;
  id: string;
};

export const useUpdateSeat = ({ axios, id }: UseUpdateSeat) => {
  return useMutation<void, Error, SeatPayload>({
    mutationFn: (data: SeatPayload) => updateSeats(axios, data, id),
  });
};

type UseFetchSeats = {
  axios: AxiosInstance;
  page: string;
  vehicleId: string;
  enabled: boolean;
};

export const useFetchSeats = ({
  axios,
  page,
  vehicleId,
  enabled,
}: UseFetchSeats) => {
  return useQuery<SeatsResponse>({
    queryKey: ["seats-by-vehicle", vehicleId],
    queryFn: () => fetchSeats(axios, page, vehicleId),
    staleTime: 60 * 1000,
    retry: 3,
    enabled,
  });
};

type UseFetchSeat = {
  axios: AxiosInstance;
  id: string;
  enabled: boolean;
};

export const useFetchSeat = ({ axios, id, enabled }: UseFetchSeat) => {
  return useQuery<Seat>({
    queryKey: ["seat", id],
    queryFn: () => fetchSeat(axios, id),
    staleTime: 60 * 1000,
    retry: 3,
    enabled,
  });
};
