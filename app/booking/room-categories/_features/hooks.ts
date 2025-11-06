import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { createRoomCategpries, fetchRoomCategories, fetchRoomCategoryTypes } from "./api";
import { RoomCategoriesResponse, RoomCategoryTypeListResponse } from "./types";
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

export const useCreateRoomCategories = ({
  axios,
}: {
  axios: AxiosInstance;
}) => {
  return useMutation<CategoriesResponse, Error, RoomCategoryPayload>({
    mutationFn: (data: RoomCategoryPayload) =>
      createRoomCategpries(axios, data),
  });
};

type UseFetchRoomCategoryTypes = {
  axios: AxiosInstance;
  page: string;
  enabled: boolean;
};

export const useFetchRoomCategoryTypes = ({
  axios,
  page,
  enabled,
}: UseFetchRoomCategoryTypes) => {
  return useQuery<RoomCategoryTypeListResponse>({
    queryKey: ["room-category-types", page],
    queryFn: () => fetchRoomCategoryTypes(axios, page),
    staleTime: 60 * 1000 * 60,
    retry: 3,
    enabled,
  });
};
