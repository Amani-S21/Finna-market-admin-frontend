import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { createRoomCategpries, fetchRoomCategories } from "./api";
import { RoomCategoriesResponse } from "./types";
import { CategoriesResponse } from "@/app/lib/types";
import { RoomCategoryPayload } from "../../hotels/_features/types";

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

export const useCreateRoomCategories = ({ axios }: { axios: AxiosInstance }) => {
  return useMutation<CategoriesResponse, Error, RoomCategoryPayload>({
    mutationFn: (data: RoomCategoryPayload) =>
      createRoomCategpries(axios, data),
  });
};
