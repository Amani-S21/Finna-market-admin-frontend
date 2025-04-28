import {
  FeatureValuesByFeatureResponse,
  Product,
  ProductSchema,
  ProductsListResponse,
  SubCategoriesResponse,
} from "@/app/lib/types";
import { productSchema } from "@/app/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { useForm } from "react-hook-form";
import {
  fetchFeatureValueByFeature,
  fetchProducts,
  fetchSubCategories,
} from "./api";

export const useProductForm = ({
  product,
}: {
  product: Product | undefined;
}) => {
  return useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      category: product?.subCategory.category.name,
      feature: "",
    },
  });
};

type UseFetchProduct = {
  axios: AxiosInstance;
  page: string;
};

export const useFetchProducts = ({ axios, page }: UseFetchProduct) => {
  return useQuery<ProductsListResponse>({
    queryKey: ["products", page],
    queryFn: () => fetchProducts(axios, page),
    staleTime: 60 * 1000,
  });
};

type UseFetchCategories = {
  axios: AxiosInstance;
  selectedCategoryId: string;
};

export const useFetchCategories = ({
  axios,
  selectedCategoryId,
}: UseFetchCategories) => {
  return useQuery<SubCategoriesResponse>({
    queryKey: ["sub-categories", selectedCategoryId],
    queryFn: () => fetchSubCategories(axios, selectedCategoryId),
    enabled: !!selectedCategoryId,
    retry: 3,
    staleTime: 60 * 1000,
  });
};

type UseFetchFeaturesByValue = {
  axios: AxiosInstance;
  selectedFeatureId: string;
};

export const useFetchFeaturesByValue = ({
  axios,
  selectedFeatureId,
}: UseFetchFeaturesByValue) => {
  return useQuery<FeatureValuesByFeatureResponse>({
    queryKey: ["features-values-by-feauture", selectedFeatureId],
    queryFn: () => fetchFeatureValueByFeature(axios, `${selectedFeatureId}`),
    enabled: !!selectedFeatureId,
    retry: 3,
    staleTime: 60 * 1000,
  });
};
