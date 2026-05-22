import {
  CategoriesResponse,
  Category,
  CategorySchema,
  SubCategoriesResponse,
  SubmitCategory
} from "@/app/lib/types";
import { categorySchema } from "@/app/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { useForm } from "react-hook-form";
import { searchSubCategories } from "../../sub-categories/_features/api";
import {
  createCategories,
  fetchCategories,
  fetchCategoryById,
  searchCategories,
  updateCategories,
  updateCategoryIcon,
} from "./api";
import { CreateCategoryResponse, UpdateCategoryIconType } from "./types";

export const useCategoryForm = () => {
  return useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
  });
};

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

export const useCreateCategories = ({ axios }: { axios: AxiosInstance }) => {
  return useMutation<CreateCategoryResponse, Error, SubmitCategory>({
    mutationFn: (data: SubmitCategory) => createCategories(axios, data),
  });
};

export const useUpdateCategories = ({ axios }: { axios: AxiosInstance }) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, SubmitCategory>({
    mutationFn: (data: SubmitCategory) => updateCategories(axios, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["category-by-id"] });
    },
  });
};

type UseSearchCategories = {
  axios: AxiosInstance;
  term: string;
  page: number;
  limit: number;
  enabled: boolean;
};

export const useSearchCategories = ({
  axios,
  term,
  page,
  limit,
  enabled,
}: UseSearchCategories) => {
  return useQuery<CategoriesResponse>({
    queryKey: ["searched-categories", term, page, limit],
    queryFn: () => searchCategories(axios, term, page, limit),
    staleTime: 60 * 1000 * 5,
    retry: 3,
    enabled,
  });
};

type UseSearchSubCategories = {
  axios: AxiosInstance;
  term: string;
  enabled: boolean;
};

export const useSearchSubCategories = ({
  axios,
  term,
  enabled,
}: UseSearchSubCategories) => {
  return useQuery<SubCategoriesResponse>({
    queryKey: ["searched-sub-categories", term],
    queryFn: () => searchSubCategories(axios, term),
    staleTime: 60 * 1000 * 5,
    retry: 3,
    enabled,
  });
};

export const useUpdateCategoryIcon = ({ axios }: { axios: AxiosInstance }) => {
  return useMutation<Category, Error, UpdateCategoryIconType>({
    mutationFn: (data: UpdateCategoryIconType) =>
      updateCategoryIcon(axios, data),
  });
};
