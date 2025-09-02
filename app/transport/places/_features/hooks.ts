import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { PlacesResponse, PlaceType, PlaceTypePayload } from "./types";
import { createPlaces, fetchPlace, fetchPlaces, updatePlace } from "./api";

type UseFetchPlaces = {
  axios: AxiosInstance;
  page: string;
  enabled: boolean;
};

export const useFetchPlaces = ({ axios, page, enabled }: UseFetchPlaces) => {
  return useQuery<PlacesResponse>({
    queryKey: ["places", page],
    queryFn: () => fetchPlaces(axios, page),
    staleTime: 60 * 1000 * 60,
    retry: 3,
    enabled,
  });
};

type UseFetchPlace = {
  axios: AxiosInstance;
  id: string;
  enabled: boolean;
};

export const useFetchPlace = ({ axios, id, enabled }: UseFetchPlace) => {
  return useQuery<PlaceType>({
    queryKey: ["place", id],
    queryFn: () => fetchPlace(axios, id),
    staleTime: 60 * 1000 * 60,
    retry: 3,
    enabled,
  });
};

type UseCreatePlace = {
  axios: AxiosInstance;
};

export const useCreatePlace = ({ axios }: UseCreatePlace) => {
  return useMutation<void, Error, PlaceTypePayload>({
    mutationFn: (data: PlaceTypePayload) => createPlaces(axios, data),
  });
};

type UseUpdatePlace = {
  axios: AxiosInstance;
  id: string;
};

export const useUpdatePlace = ({ axios, id }: UseUpdatePlace) => {
  return useMutation<void, Error, PlaceTypePayload>({
    mutationFn: (data: PlaceTypePayload) => updatePlace(axios, id, data),
  });
};
