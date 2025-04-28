import { Product, ProductSchema, ProductsListResponse } from "@/app/lib/types";
import { productSchema } from "@/app/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { useForm } from "react-hook-form";
import { fetchProducts } from "./api";

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

type Props = {
  axios: AxiosInstance;
  page: string;
};

export const useFetchProducts = ({ axios, page }: Props) => {
  return useQuery<ProductsListResponse>({
    queryKey: ["products", page],
    queryFn: () => fetchProducts(axios, page),
    staleTime: 60 * 1000,
  });
};
