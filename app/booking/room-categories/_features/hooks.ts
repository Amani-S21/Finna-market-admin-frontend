import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import {
  createRoomCategpries,
  fetchBookingTypes,
  fetchComodities,
  fetchRoomCategories,
  fetchRoomCategoryTypes,
  searchHotels,
  sendRoomCategoriesLinks,
} from "./api";
import {
  ComoditiesListResponse,
  RoomCategoriesResponse,
  RoomCategory,
  RoomCategoryTypeListResponse,
  SubmitRoomCategoriesPictures,
} from "./types";

import { BookingTypeResponse, CategoriesResponse } from "@/app/lib/types";
import {
  Hotel,
  HotelResponse,
  RoomCategoryPayload,
} from "../../hotels/_features/types";

type UseSearchHotels = {
  axios: AxiosInstance;
  term: string;
  enabled: boolean;
};

export const useSearchHotels = ({ axios, term, enabled }: UseSearchHotels) => {
  return useQuery<Hotel[]>({
    queryKey: ["searched-hotels", term],
    queryFn: () => searchHotels(axios, term),
    staleTime: 60 * 1000 * 5,
    retry: 3,
    enabled,
  });
};

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

type UseFetchBookingTypes = {
  axios: AxiosInstance;
  page: string;
  enabled: boolean;
};

export const useFetchBookingTypes = ({
  axios,
  page,
  enabled,
}: UseFetchBookingTypes) => {
  return useQuery<BookingTypeResponse>({
    queryKey: ["booking-types", page],
    queryFn: () => fetchBookingTypes(axios, page),
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
  return useMutation<RoomCategory, Error, RoomCategoryPayload>({
    mutationFn: (data: RoomCategoryPayload) =>
      createRoomCategpries(axios, data),
  });
};

type UseFetchRoomCategoryTypes = {
  axios: AxiosInstance;
  page: string;
  bookingTypeId: string;
  enabled: boolean;
};

export const useFetchRoomCategoryTypes = ({
  axios,
  page,
  bookingTypeId,
  enabled,
}: UseFetchRoomCategoryTypes) => {
  return useQuery<RoomCategoryTypeListResponse>({
    queryKey: ["room-category-types", page, bookingTypeId],
    queryFn: () => fetchRoomCategoryTypes(axios, page, bookingTypeId),
    staleTime: 60 * 1000 * 60,
    retry: 3,
    enabled,
  });
};

type UseFetchComodities = {
  axios: AxiosInstance;
  page: string;
  enabled: boolean;
};

export const useFetchComodities = ({
  axios,
  page,
  enabled,
}: UseFetchComodities) => {
  return useQuery<ComoditiesListResponse>({
    queryKey: ["comodities", page],
    queryFn: () => fetchComodities(axios, page),
    staleTime: 60 * 1000 * 60,
    retry: 3,
    enabled,
  });
};

type UseCreateRoomCategoryPictures = {
  axios: AxiosInstance;
};

export const usesendRoomCategoriesLinks = ({
  axios,
}: UseCreateRoomCategoryPictures) => {
  return useMutation<RoomCategory, Error, SubmitRoomCategoriesPictures>({
    mutationFn: (data: SubmitRoomCategoriesPictures) =>
      sendRoomCategoriesLinks(axios, data),
  });
};
