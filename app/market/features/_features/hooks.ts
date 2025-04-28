import { FeaturesResponse } from "@/app/lib/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { fetchFeatures } from "./api";

type UseFetchFeatures = {
  axios: AxiosInstance;
  page: string;
};

export const useFetchFeatures = ({ axios, page }: UseFetchFeatures) => {
  return useQuery<FeaturesResponse>({
    queryKey: ["features", page],
    queryFn: () => fetchFeatures(axios, page),
    staleTime: 60 * 1000 * 60,
  });
};
