import {
  Feature,
  FeaturesResponse,
  SubmitFeatureWithValues,
} from "@/app/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import {
  createFeatures,
  fetchFeatureById,
  fetchFeatures,
  updateFeatures,
} from "./api";
import { useRouter } from "next/navigation";

type UseFetchFeatures = {
  axios: AxiosInstance;
  page: string;
};

export const useFetchFeatures = ({ axios, page }: UseFetchFeatures) => {
  return useQuery<FeaturesResponse>({
    queryKey: ["features", page],
    queryFn: () => fetchFeatures(axios, page),
    // staleTime: 60 * 1000 * 60,
    retry: 3,
  });
};

type UseFetchFeatureById = {
  axios: AxiosInstance;
  featureId: string;
};

export const useFetchFeatureById = ({
  axios,
  featureId,
}: UseFetchFeatureById) => {
  return useQuery<Feature>({
    queryKey: ["features-by-id", featureId],
    queryFn: () => fetchFeatureById(axios, featureId),
    // staleTime: 60 * 1000 * 60,
    // retry: 3,
  });
};

type UseCreateFeatures = {
  axios: AxiosInstance;
};

export const useCreateFeatures = ({ axios }: UseCreateFeatures) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<void, Error, SubmitFeatureWithValues>({
    mutationFn: (data: SubmitFeatureWithValues) => createFeatures(axios, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["features"] });
      queryClient.invalidateQueries({ queryKey: ["features-by-id"] });
      router.back();
    },
  });
};

export const useUpdateFeatures = ({ axios }: UseCreateFeatures) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<void, Error, SubmitFeatureWithValues>({
    mutationFn: (data: SubmitFeatureWithValues) => updateFeatures(axios, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["features"] });
      queryClient.invalidateQueries({ queryKey: ["features-by-id"] });
      router.back();
    },
  });
};
