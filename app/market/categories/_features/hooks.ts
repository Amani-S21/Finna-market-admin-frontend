import {
  CategoriesResponse,
  Category,
  CategorySchema,
  SubCategory,
  SubCategorySchema,
  SubmitCategory,
} from "@/app/lib/types";
import { categorySchema, subCategorySchema } from "@/app/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { useForm } from "react-hook-form";
import {
  createCategories,
  createSubCategories,
  fetchCategories,
  fetchCategoryById,
  searchCategories,
  updateCategories,
  updateSubCategories,
} from "./api";
import { SubmitSubCategory } from "./types";

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
  return useMutation<void, Error, SubmitCategory>({
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
  enabled: boolean;
};

export const useSearchCategories = ({
  axios,
  term,
  enabled,
}: UseSearchCategories) => {
  return useQuery<CategoriesResponse>({
    queryKey: ["searched-categories", term],
    queryFn: () => searchCategories(axios, term),
    staleTime: 60 * 1000 * 5,
    retry: 3,
    enabled,
  });
};

export const useCreateSubCategories = ({ axios }: { axios: AxiosInstance }) => {
  return useMutation<SubCategory, Error, SubmitSubCategory>({
    mutationFn: (data: SubmitSubCategory) => createSubCategories(axios, data),
  });
};

export const useUpdateSubCategories = ({ axios }: { axios: AxiosInstance }) => {
  return useMutation<SubCategory, Error, SubmitSubCategory>({
    mutationFn: (data: SubmitSubCategory) => updateSubCategories(axios, data),
  });
};

export const useSubCategoryForm = () => {
  return useForm<SubCategorySchema>({
    resolver: zodResolver(subCategorySchema),
  });
};