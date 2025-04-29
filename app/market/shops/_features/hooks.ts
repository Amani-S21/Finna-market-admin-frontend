import { Shop, ShopsListResponse } from "@/app/lib/types";
import { useQuery } from "@tanstack/react-query";
import { fetchShopById, fetchShops } from "./api";
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

type UseFetchShopsById = {
  axios: AxiosInstance;
  shopId: string;
  enabled: boolean;
};

export const useFetchShopsById = ({
  axios,
  shopId,
  enabled,
}: UseFetchShopsById) => {
  return useQuery<Shop>({
    queryKey: ["shop", shopId],
    queryFn: () => fetchShopById(axios, shopId),
    staleTime: 60 * 1000,
    retry: 3,
    enabled,
  });
};
