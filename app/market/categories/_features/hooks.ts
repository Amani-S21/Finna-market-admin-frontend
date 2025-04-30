import { CategoriesResponse } from "@/app/lib/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { fetchCategories } from "./api";

type UseFetchCategories = {
  axios: AxiosInstance;
  page: string;
  enabled: boolean;
};

export const useFetchCategories = ({
  axios,
  page,
  enabled,
}: UseFetchCategories) => {
  return useQuery<CategoriesResponse>({
    queryKey: ["categories", page],
    queryFn: () => fetchCategories(axios, page),
    staleTime: 60 * 1000 * 60,
    retry: 3,
    enabled,
  });
};
