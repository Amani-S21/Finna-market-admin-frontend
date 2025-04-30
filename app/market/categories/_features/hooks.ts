import { CategoriesResponse, Category } from "@/app/lib/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { fetchCategories, fetchCategoryById } from "./api";

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



type UseFetchCategoryById = {
  axios: AxiosInstance;
  categoryId: string;
  enabled: boolean;
};

export const useFetchCategoryById = ({
  axios,
  categoryId,
  enabled,
}: UseFetchCategoryById) => {
  return useQuery<Category>({
    queryKey: ["features-by-id", categoryId],
    queryFn: () => fetchCategoryById(axios, categoryId),
    staleTime: 60 * 1000 * 5,
    retry: 3,
    enabled,
  });
};