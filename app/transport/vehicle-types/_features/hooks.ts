import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { VehicleType, VehicleTypePayload, VehicleTypeResponse } from "./types";
import {
  createVehicleType,
  fetchVehicleType,
  fetchVehicleTypes,
  searchVehicleTypes,
  updateVehicleType,
} from "./api";

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

type UseFetchVehicleType = {
  axios: AxiosInstance;
  id: string;
  enabled: boolean;
};

export const useFetchVehicleType = ({
  axios,
  id,
  enabled,
}: UseFetchVehicleType) => {
  return useQuery<VehicleType>({
    queryKey: ["vehicle-type", id],
    queryFn: () => fetchVehicleType(axios, id),
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

type UseSearchVehicleType = {
  axios: AxiosInstance;
  term: string;
  enabled: boolean;
};

export const useSearchVehicleType = ({
  axios,
  term,
  enabled,
}: UseSearchVehicleType) => {
  return useQuery<VehicleType[]>({
    queryKey: ["searched-vehicle-types", term],
    queryFn: () => searchVehicleTypes(axios, term),
    staleTime: 60 * 1000 * 5,
    retry: 3,
    enabled,
  });
};
