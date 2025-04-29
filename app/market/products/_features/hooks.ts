import {
  FeatureValuesByFeatureResponse,
  Product,
  ProductSchema,
  ProductsListResponse,
  SubCategoriesResponse,
  SubmitProduct,
} from "@/app/lib/types";
import { productSchema } from "@/app/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { useForm } from "react-hook-form";
import {
  createProduct,
  fetchProductById,
  fetchProducts,
  fetchSubCategories,
  updateProduct,
} from "./api";
import { useRouter } from "next/navigation";

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

type UseCreateProduct = {
  axios: AxiosInstance;
};

export const useCreateProduct = ({ axios }: UseCreateProduct) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<void, Error, SubmitProduct>({
    mutationFn: (data: SubmitProduct) => createProduct(axios, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["products-by-id"] });
      router.back();
    },
  });
};

export const useUpdateProduct = ({ axios }: UseCreateProduct) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<void, Error, SubmitProduct>({
    mutationFn: (data: SubmitProduct) => updateProduct(axios, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["products-by-id"] });
      router.back();
    },
  });
};

type UseFetchProduct = {
  axios: AxiosInstance;
  page: string;
  enabled: boolean;
};

export const useFetchProducts = ({ axios, page, enabled }: UseFetchProduct) => {
  return useQuery<ProductsListResponse>({
    queryKey: ["products", page],
    queryFn: () => fetchProducts(axios, page),
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
