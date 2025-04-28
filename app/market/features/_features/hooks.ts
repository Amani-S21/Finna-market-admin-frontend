import { useQuery } from "@tanstack/react-query";
import { fetchFeatures } from "./api";
import { AxiosInstance } from "axios";

type UseFetchFeatures = {
  axios: AxiosInstance;
  page: string;
};

export const useFetchFeatures = ({ axios, page }: UseFetchFeatures) => {
  return useQuery({
    queryKey: ["features", page],
    queryFn: () => fetchFeatures(axios, page),
    staleTime: 60 * 1000,
  });
};
