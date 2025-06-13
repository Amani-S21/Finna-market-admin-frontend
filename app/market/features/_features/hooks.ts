import {
  Feature,
  FeaturesResponse,
  FeatureValuesByFeatureResponse,
  SubmitFeatureWithValues,
} from "@/app/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import {
  createFeatures,
  fetchFeatureById,
  fetchFeatures,
  fetchFeatureValueByFeature,
  updateFeatures,
} from "./api";

type UseFetchFeatures = {
  axios: AxiosInstance;
  page: string;
  enabled: boolean;
};

export const useFetchFeatures = ({
  axios,
  page,
  enabled,
}: UseFetchFeatures) => {
  return useQuery<FeaturesResponse>({
    queryKey: ["features", page],
    queryFn: () => fetchFeatures(axios, page),
    staleTime: 60 * 1000 * 5,
    retry: 3,
    enabled,
  });
};

type UseFetchFeatureById = {
  axios: AxiosInstance;
  featureId: string;
  enabled: boolean;
};

export const useFetchFeatureById = ({
  axios,
  featureId,
  enabled,
}: UseFetchFeatureById) => {
  return useQuery<Feature>({
    queryKey: ["features-by-id", featureId],
    queryFn: () => fetchFeatureById(axios, featureId),
    staleTime: 60 * 1000 * 5,
    retry: 3,
    enabled,
  });
};

type UseCreateFeatures = {
  axios: AxiosInstance;
};

export const useCreateFeatures = ({ axios }: UseCreateFeatures) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, SubmitFeatureWithValues>({
    mutationFn: (data: SubmitFeatureWithValues) => createFeatures(axios, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["features"] });
      queryClient.invalidateQueries({ queryKey: ["features-by-id"] });
    },
  });
};

export const useUpdateFeatures = ({ axios }: UseCreateFeatures) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, SubmitFeatureWithValues>({
    mutationFn: (data: SubmitFeatureWithValues) => updateFeatures(axios, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["features"] });
      queryClient.invalidateQueries({ queryKey: ["features-by-id"] });
    },
  });
};

type UseFetchFeaturesByValue = {
  axios: AxiosInstance;
  selectedFeatureId: string | undefined;
};

export const useFetchFeaturesByValue = ({
  axios,
  selectedFeatureId,
}: UseFetchFeaturesByValue) => {
  return useQuery<FeatureValuesByFeatureResponse>({
    queryKey: ["features-values-by-feauture", selectedFeatureId],
    queryFn: () => fetchFeatureValueByFeature(axios, `${selectedFeatureId}`),
    enabled: !!selectedFeatureId,
    retry: 3,
    staleTime: 60 * 1000,
  });
};
