import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { HotelPayload, HotelResponse } from "./types";
import { createHotels, fetchHotels } from "./api";
import { CategoriesResponse } from "@/app/lib/types";

type UseFetchHotels = {
  axios: AxiosInstance;
  page: string;
  enabled: boolean;
};

export const useFetchHotels = ({ axios, page, enabled }: UseFetchHotels) => {
  return useQuery<HotelResponse>({
    queryKey: ["hotels", page],
    queryFn: () => fetchHotels(axios, page),
    staleTime: 60 * 1000 * 60,
    retry: 3,
    enabled,
  });
};

export const useCreateHotels = ({ axios }: { axios: AxiosInstance }) => {
  return useMutation<CategoriesResponse, Error, HotelPayload>({
    mutationFn: (data: HotelPayload) => createHotels(axios, data),
  });
};