import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { TransportAgency, TransportAgencyPayload, TransportAgencyResponse } from "./type";
import { createAgency, fetchAgencies, fetchAgency, updateAgency } from "./api";

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
    queryKey: ["agencies", page],
    queryFn: () => fetchAgencies(axios, page),
    staleTime: 60 * 1000 * 60,
    retry: 3,
    enabled,
  });
};

type UseFetchAgency = {
  axios: AxiosInstance;
  id: string;
  enabled: boolean;
};

export const useFetchAgency = ({
  axios,
  id,
  enabled,
}: UseFetchAgency) => {
  return useQuery<TransportAgency>({
    queryKey: ["agency", id],
    queryFn: () => fetchAgency(axios, id),
    staleTime: 60 * 1000 * 60,
    retry: 3,
    enabled,
  });
};

type UseCreateOrUpdateShop = {
  axios: AxiosInstance;
};

export const useCreateAgency = ({ axios }: UseCreateOrUpdateShop) => {
  return useMutation<void, Error, TransportAgencyPayload>({
    mutationFn: (data: TransportAgencyPayload) => createAgency(axios, data),
  });
};

type UseUpdateShop = {
  axios: AxiosInstance;
  id: string;
};

export const useUpdateAgency = ({ axios, id }: UseUpdateShop) => {
  return useMutation<void, Error, TransportAgencyPayload>({
    mutationFn: (data: TransportAgencyPayload) => updateAgency(axios, id, data),
  });
};
