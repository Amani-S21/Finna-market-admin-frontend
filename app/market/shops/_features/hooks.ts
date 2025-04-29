import { ShopsListResponse } from "@/app/lib/types";
import { useQuery } from "@tanstack/react-query";
import { fetchShops } from "./api";
import { AxiosInstance } from "axios";

type UseFetchShops = {
  axios: AxiosInstance;
  page: string;
  enabled: boolean;
};

export const useFetchShops = ({ axios, page, enabled }: UseFetchShops) => {
  return useQuery<ShopsListResponse>({
    queryKey: ["shops", page],
    queryFn: () => fetchShops(axios, page),
    staleTime: 60 * 1000 * 60,
    retry: 3,
    enabled,
  });
};
