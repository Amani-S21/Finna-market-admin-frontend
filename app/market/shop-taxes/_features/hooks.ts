import { useMutation, useQuery } from "@tanstack/react-query";
import { createTaxePrice, fetchShopTaxe, fetchShopTaxes, updateTaxePrice } from "./api";
import { TaxePriceResponse, TaxePriceSubmit } from "./types";
import { AxiosInstance } from "axios";

type UseFetchShopTaxes = {
  axios: AxiosInstance;
  shopId: string;
  page: string;
  enabled: boolean;
};

export const useFetchShopTaxes = ({
  axios,
  shopId,
  page,
  enabled,
}: UseFetchShopTaxes) => {
  return useQuery<TaxePriceResponse>({
    queryKey: ["shop-taxes", page],
    queryFn: () => fetchShopTaxes(axios, shopId, page),
    staleTime: 60 * 1000 * 60,
    retry: 3,
    enabled,
  });
};

type UseFetchShopTaxe = {
  axios: AxiosInstance;
  shopId: string;
  taxeId: string;
  page: string;
  enabled: boolean;
};

export const useFetchShopTaxe = ({
  axios,
  shopId,
  taxeId,
  enabled,
}: UseFetchShopTaxe) => {
  return useQuery<TaxePriceResponse>({
    queryKey: ["shop-taxe"],
    queryFn: () => fetchShopTaxe(axios, shopId, taxeId),
    staleTime: 60 * 1000 * 60,
    retry: 3,
    enabled,
  });
};

export const useCreateTaxes = ({ axios }: { axios: AxiosInstance }) => {
  return useMutation<void, Error, TaxePriceSubmit>({
    mutationFn: (data: TaxePriceSubmit) => createTaxePrice(axios, data),
  });
};

export const useUpdateTaxes = ({ axios }: { axios: AxiosInstance }) => {
  return useMutation<void, Error, TaxePriceSubmit>({
    mutationFn: (data: TaxePriceSubmit) => updateTaxePrice(axios, data),
  });
};
