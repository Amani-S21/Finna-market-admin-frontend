import { Taxe, TaxeSchema, TaxesResponse, TaxeSubmit } from "@/app/lib/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { createTaxes, fetchTaxeById, fetchTaxes, updateTaxes } from "./api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taxeSchema } from "@/app/lib/validationSchemas";

export const useTaxeForm = () => {
  return useForm<TaxeSchema>({
    resolver: zodResolver(taxeSchema),
  });
};

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

export const useFetchTaxeById = ({
  axios,
  taxeId,
  enabled,
}: UseFetchTaxeById) => {
  return useQuery<Taxe>({
    queryKey: ["taxe", taxeId],
    queryFn: () => fetchTaxeById(axios, taxeId),
    staleTime: 60 * 1000 * 60,
    retry: 3,
    enabled,
  });
};

export const useCreateTaxes = ({ axios }: { axios: AxiosInstance }) => {
  return useMutation<void, Error, TaxeSubmit>({
    mutationFn: (data: TaxeSubmit) => createTaxes(axios, data),
  });
};

export const useUpdateTaxes = ({ axios }: { axios: AxiosInstance }) => {
  return useMutation<void, Error, TaxeSubmit>({
    mutationFn: (data: TaxeSubmit) => updateTaxes(axios, data),
  });
};
