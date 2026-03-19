import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { Hotel, HotelPayload, HotelResponse, SubmitHotelPictures } from "./types";
import { createHotels, fetchHotels, sendHotelLinks } from "./api";
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

type UseCreateHotelPictures = {
  axios: AxiosInstance;
};

export const useSendHotelLinks = ({ axios }: UseCreateHotelPictures) => {
  return useMutation<Hotel, Error, SubmitHotelPictures>({
    mutationFn: (data: SubmitHotelPictures) => sendHotelLinks(axios, data),
  });
};

export const useCreateHotel = ({ axios }: { axios: AxiosInstance }) => {
  return useMutation<Hotel, Error, HotelPayload>({
    mutationFn: (data: HotelPayload) => createHotels(axios, data),
  });
};