import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { HotelResponse } from "./types";
import { fetchHotels } from "./api";

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
