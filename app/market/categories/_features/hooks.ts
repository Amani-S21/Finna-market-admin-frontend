import { CategoriesResponse, Category, CategorySchema, FeatureSchema, SubmitCategory } from "@/app/lib/types";
import { categorySchema, featureSchema } from "@/app/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { createCategories, fetchCategories, fetchCategoryById } from "./api";

export const useCategoryForm = ()=> {
  return useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
  });
}

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
    queryKey: ["category-by-id", categoryId],
    queryFn: () => fetchCategoryById(axios, categoryId),
    staleTime: 60 * 1000 * 5,
    retry: 3,
    enabled,
  });
};

type UseCreateCategory = {
  axios: AxiosInstance;
};

export const useCreateCategories = ({ axios }: UseCreateCategory) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<void, Error, SubmitCategory>({
    mutationFn: (data: SubmitCategory) => createCategories(axios, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["category-by-id"] });
      router.back();
    },
  });
};