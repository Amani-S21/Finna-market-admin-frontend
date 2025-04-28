import { ShopsListResponse } from "@/app/lib/types";
import { useQuery } from "@tanstack/react-query";
import { fetchShops } from "./api";
import { AxiosInstance } from "axios";

type UseFetchShops = {
  axios: AxiosInstance;
  page: string;
};

export const useFetchShops = ({ axios, page }: UseFetchShops) => {
  return useQuery<ShopsListResponse>({
    queryKey: ["shops", page],
    queryFn: () => fetchShops(axios, page),
    staleTime: 60 * 1000,
  });
};
