import { OrdersResponse } from "@/app/lib/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { fetchOrders } from "./api";

type UseFetchOrders = {
  axios: AxiosInstance;
  page: string;
  enabled: boolean;
};

export const useFetchOrders = ({ axios, page, enabled }: UseFetchOrders) => {
  return useQuery<OrdersResponse>({
    queryKey: ["orders", page],
    queryFn: () => fetchOrders(axios, page),
    staleTime: 60 * 1000 * 5,
    retry: 3,
    enabled,
  });
};
