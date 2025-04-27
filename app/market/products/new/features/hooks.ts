import { Product, ProductSchema } from "@/app/lib/types";
import { productSchema } from "@/app/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useProductForm = ({ product }: { product: Product | undefined}) => {
  return useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      category: product?.subCategory.category.name,
      feature: "",
    },
  });
};
