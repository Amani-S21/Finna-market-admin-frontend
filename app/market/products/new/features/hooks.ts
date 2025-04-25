import { ProductSchema } from "@/app/lib/types";
import { productSchema } from "@/app/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useProductForm = () => {
  return useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      category: "",
      feature: "",
    },
  });
};
