import { FeaturesResponse, SubmitFeatureWithValues } from "@/app/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { createFeatures, fetchFeatures } from "./api";
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
      router.back();
    },
  });
};
