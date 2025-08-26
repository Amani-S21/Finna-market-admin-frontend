import { SubCategoriesResponse, SubCategory } from "@/app/lib/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import {
  createSubCategories,
  fetchSubCategories,
  fetchSubCategoryById,
  searchSubCategories,
  updateSubCategories,
  updateSubCategoryIcon,
} from "./api";
import { SubCategorySchema, SubmitSubCategory, UpdateSubCategoryIconType } from "./types";
import { categorySchema } from "@/app/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


export const useSubCategoryForm = () => {
  return useForm<SubCategorySchema>({
    resolver: zodResolver(categorySchema),
  });
};

type UseFetchCategories = {
  axios: AxiosInstance;
  page: string;
  enabled: boolean;
};

export const useFetchSubCategories = ({
  axios,
  page,
  enabled,
}: UseFetchCategories) => {
  return useQuery<SubCategoriesResponse>({
    queryKey: ["sub-categories", page],
    queryFn: () => fetchSubCategories(axios, page),
    staleTime: 60 * 1000 * 60,
    retry: 3,
    enabled,
  });
};

type UseFetchCategoryById = {
  axios: AxiosInstance;
  id: string;
  enabled: boolean;
};

export const useFetchSubCategoryById = ({
  axios,
  id,
  enabled,
}: UseFetchCategoryById) => {
  return useQuery<SubCategory>({
    queryKey: ["sub-category", id],
    queryFn: () => fetchSubCategoryById(axios, id),
    staleTime: 60 * 1000 * 60,
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

export const useUpdateSubCategoryIcon = ({ axios }: { axios: AxiosInstance }) => {
  return useMutation<SubCategory, Error, UpdateSubCategoryIconType>({
    mutationFn: (data: UpdateSubCategoryIconType) =>
      updateSubCategoryIcon(axios, data),
  });
};