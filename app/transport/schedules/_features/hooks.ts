import { AxiosInstance } from "axios";
import { TripPayload } from "./types";
import { createTripes, updateTripes } from "./api";
import { useMutation } from "@tanstack/react-query";

type UseCreatePlace = {
  axios: AxiosInstance;
};

export const useCreateTrip = ({ axios }: UseCreatePlace) => {
  return useMutation<void, Error, TripPayload>({
    mutationFn: (data: TripPayload) => createTripes(axios, data),
  });
};

type UseUpdatePlace = {
  axios: AxiosInstance;
};

export const useUpdateTrip = ({ axios }: UseUpdatePlace) => {
  return useMutation<void, Error, TripPayload>({
    mutationFn: (data: TripPayload) => updateTripes(axios, data),
  });
};