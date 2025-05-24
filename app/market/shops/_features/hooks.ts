import { Shop, ShopsListResponse, SubmitShop } from "@/app/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {  createShop, fetchShopById, fetchShops, updateShop } from "./api";
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

type UseCreateOrUpdateShop = {
  axios: AxiosInstance;
};

export const useCreateShop = ({ axios }: UseCreateOrUpdateShop) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, SubmitShop>({
    mutationFn: (data: SubmitShop) => createShop(axios, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shop"] });
      queryClient.invalidateQueries({ queryKey: ["shops"] });
    },
  });
};

export const useUpdateShop = ({ axios }: UseCreateOrUpdateShop) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, SubmitShop>({
    mutationFn: (data: SubmitShop) => updateShop(axios, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shop"] });
      queryClient.invalidateQueries({ queryKey: ["shops"] });
    },
  });
};
