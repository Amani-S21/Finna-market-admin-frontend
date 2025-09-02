import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { TransportAgencyResponse } from "./type";
import { fetchAgencies } from "./api";

type UseFetchAgencies = {
  axios: AxiosInstance;
  page: string;
  enabled: boolean;
};

export const useFetchAgencies = ({
  axios,
  page,
  enabled,
}: UseFetchAgencies) => {
  return useQuery<TransportAgencyResponse>({
    queryKey: ["shops", page],
    queryFn: () => fetchAgencies(axios, page),
    staleTime: 60 * 1000 * 60,
    retry: 3,
    enabled,
  });
};
