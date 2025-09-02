import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { VehicleTypePayload, VehicleTypeResponse } from "./types";
import { createVehicleType, fetchVehicleTypes, updateVehicleType } from "./api";

type UseFetchVehicleTypes = {
  axios: AxiosInstance;
  page: string;
  enabled: boolean;
};

export const useFetchVehicleTypes = ({
  axios,
  page,
  enabled,
}: UseFetchVehicleTypes) => {
  return useQuery<VehicleTypeResponse>({
    queryKey: ["vehicle-types", page],
    queryFn: () => fetchVehicleTypes(axios, page),
    staleTime: 60 * 1000 * 60,
    retry: 3,
    enabled,
  });
};

type UseCreateOrUpdateVehicleType = {
  axios: AxiosInstance;
};

export const useCreateVehicleType = ({
  axios,
}: UseCreateOrUpdateVehicleType) => {
  return useMutation<void, Error, VehicleTypePayload>({
    mutationFn: (data: VehicleTypePayload) => createVehicleType(axios, data),
  });
};

type UseUpdateVehicleType = {
  axios: AxiosInstance;
  id: string;
};

export const UseUpdateVehicleType = ({ axios, id }: UseUpdateVehicleType) => {
  return useMutation<void, Error, VehicleTypePayload>({
    mutationFn: (data: VehicleTypePayload) =>
      updateVehicleType(axios, id, data),
  });
};
