import { AxiosInstance } from "axios";
import { SchedulesResponse, TripPayload } from "./types";
import { createTripes, fetchVehicleSchedules, updateTripes } from "./api";
import { useMutation, useQuery } from "@tanstack/react-query";

type UseCreatePlace = {
  axios: AxiosInstance;
};

export const useCreateTrip = ({ axios }: UseCreatePlace) => {
  return useMutation<void, Error, TripPayload>({
    mutationFn: (data: TripPayload) => createTripes(axios, data),
  });
};

type UseUpdatePlace = {
  axios: AxiosInstance;
};

export const useUpdateTrip = ({ axios }: UseUpdatePlace) => {
  return useMutation<void, Error, TripPayload>({
    mutationFn: (data: TripPayload) => updateTripes(axios, data),
  });
};

type UseFetchVehicleSchedules = {
  axios: AxiosInstance;
  page: string;
  vehicleId?: string;
  enabled: boolean;
};

export const useFetchVehicleSchedules = ({
  axios,
  page,
  vehicleId,
  enabled,
}: UseFetchVehicleSchedules) => {
  return useQuery<SchedulesResponse>({
    queryKey: ["vehicles", vehicleId],
    queryFn: () => fetchVehicleSchedules(axios, page, vehicleId),
    staleTime: 60 * 1000,
    retry: 3,
    enabled,
  });
};
