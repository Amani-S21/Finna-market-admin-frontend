import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { fetchRoomCategories } from "./api";
import { RoomCategoriesResponse } from "./types";

type UseFetchRooms = {
  axios: AxiosInstance;
  page: string;
  enabled: boolean;
};

export const useFetchRooms = ({ axios, page, enabled }: UseFetchRooms) => {
  return useQuery<RoomCategoriesResponse>({
    queryKey: ["room-categories", page],
    queryFn: () => fetchRoomCategories(axios, page),
    staleTime: 60 * 1000 * 60,
    retry: 3,
    enabled,
  });
};
