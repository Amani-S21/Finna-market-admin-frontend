import {
  Product,
  ProductSchema,
  ProductsListResponse,
  SubCategoriesResponse,
  SubmitProduct,
  SubmitProductLinks,
} from "@/app/lib/types";
import { productSchema } from "@/app/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { useForm } from "react-hook-form";
import {
  createProduct,
  fetchProductById,
  fetchProducts,
  fetchSubCategories,
  sendProductLinks,
  updateProduct,
} from "./api";

export const useProductForm = ({
  product,
}: {
  product: Product | undefined;
}) => {
  return useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      category: product?.subCategory?.category?.name,
      feature: "",
    },
  });
};

type UseCreateProduct = {
  axios: AxiosInstance;
};

export const useCreateProduct = ({ axios }: UseCreateProduct) => {
  return useMutation<Product, Error, SubmitProduct>({
    mutationFn: (data: SubmitProduct) => createProduct(axios, data),
  });
};

export const useUpdateProduct = ({ axios }: UseCreateProduct) => {
  return useMutation<Product, Error, SubmitProduct>({
    mutationFn: (data: SubmitProduct) => updateProduct(axios, data),
  });
};

export const useSendProductsLinks = ({ axios }: UseCreateProduct) => {
  return useMutation<Product, Error, SubmitProductLinks>({
    mutationFn: (data: SubmitProductLinks) => sendProductLinks(axios, data),
  });
};

type UseFetchProduct = {
  axios: AxiosInstance;
  page: string;
  enabled: boolean;
  shopId?: string;
};

export const useFetchProducts = ({
  axios,
  page,
  shopId,
  enabled,
}: UseFetchProduct) => {
  return useQuery<ProductsListResponse>({
    queryKey: ["products", page],
    queryFn: () => fetchProducts(axios, page, shopId),
    staleTime: 60 * 1000 * 60,
    retry: 3,
    enabled,
  });
};

type UseFetchProductById = {
  axios: AxiosInstance;
  productId: string;
  enabled: boolean;
};

export const useFetchProductById = ({
  axios,
  productId,
  enabled,
}: UseFetchProductById) => {
  return useQuery<Product>({
    queryKey: ["product-by-id", productId],
    queryFn: () => fetchProductById(axios, productId),
    staleTime: 60 * 1000 * 5,
    retry: 3,
    enabled,
  });
};

type UseFetchCategories = {
  axios: AxiosInstance;
  selectedCategoryId: string | undefined;
};

export const useFetchCategories = ({
  axios,
  selectedCategoryId,
}: UseFetchCategories) => {
  return useQuery<SubCategoriesResponse>({
    queryKey: ["sub-categories", selectedCategoryId],
    queryFn: () => fetchSubCategories(axios, `${selectedCategoryId}`),
    enabled: !!selectedCategoryId,
    retry: 3,
    staleTime: 60 * 1000,
  });
};
