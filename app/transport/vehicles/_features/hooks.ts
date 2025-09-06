import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { Vehicle, VehiclesResponse } from "../../agencies/_features/type";
import { fetchVehicle, fetchVehicles } from "./api";

type UseFetchVehicles = {
  axios: AxiosInstance;
  page: number;
  enabled: boolean;
};

export const useFetchVehicles = ({
  axios,
  page,
  enabled,
}: UseFetchVehicles) => {
  return useQuery<VehiclesResponse>({
    queryKey: ["vehicles", page],
    queryFn: () => fetchVehicles(axios, page),
    staleTime: 60 * 1000 * 60,
    retry: 3,
    enabled,
  });
};

type UseFetchVehicle = {
  axios: AxiosInstance;
  id: string;
  enabled: boolean;
};

export const useFetchVehicle = ({ axios, id, enabled }: UseFetchVehicle) => {
  return useQuery<Vehicle>({
    queryKey: ["vehicle", id],
    queryFn: () => fetchVehicle(axios, id),
    staleTime: 60 * 1000 * 60,
    retry: 3,
    enabled,
  });
};
