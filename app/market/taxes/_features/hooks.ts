import { CategoriesResponse, TaxesResponse } from "@/app/lib/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { fetchTaxes } from "./api";

// export const useTaxeForm = () => {
//   return useForm<CategorySchema>({
//     resolver: zodResolver(categorySchema),
//   });
// };

type UseFetchTaxes = {
  axios: AxiosInstance;
  page: string;
  enabled: boolean;
};

export const useFetchTaxes = ({ axios, page, enabled }: UseFetchTaxes) => {
  return useQuery<TaxesResponse>({
    queryKey: ["taxes", page],
    queryFn: () => fetchTaxes(axios, page),
    staleTime: 60 * 1000 * 60,
    retry: 3,
    enabled,
  });
};
