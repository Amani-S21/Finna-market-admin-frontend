import { CategoriesResponse, Taxe, TaxesResponse } from "@/app/lib/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { fetchTaxeById, fetchTaxes } from "./api";

type UseFetchTaxes = {
  axios: AxiosInstance;
  page: string;
  enabled: boolean;
};

export const useFetchTaxes = ({ axios, page, enabled }: UseFetchTaxes) => {
  return useQuery<TaxesResponse>({
    queryKey: ["taxes", page],
    queryFn: () => fetchTaxes(axios, page),
    staleTime: 60 * 1000 * 60,
    retry: 3,
    enabled,
  });
};


type UseFetchTaxeById = {
  axios: AxiosInstance;
  taxeId: string;
  enabled: boolean;
};

export const useFetchTaxeById = ({ axios, taxeId, enabled }: UseFetchTaxeById) => {
  return useQuery<Taxe>({
    queryKey: ["taxe", taxeId],
    queryFn: () => fetchTaxeById(axios, taxeId),
    staleTime: 60 * 1000 * 60,
    retry: 3,
    enabled,
  });
};
