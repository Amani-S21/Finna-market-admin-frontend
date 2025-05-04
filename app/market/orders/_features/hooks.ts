import { Order, OrdersResponse } from "@/app/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { fetchOrderById, fetchOrders, updateOrder } from "./api";
import { useRouter } from "next/navigation";

type UseFetchOrders = {
  axios: AxiosInstance;
  page: string;
  status?: string;
  enabled: boolean;
};

export const useFetchOrders = ({
  axios,
  page,
  status,
  enabled,
}: UseFetchOrders) => {
  return useQuery<OrdersResponse>({
    queryKey: ["orders", page, status],
    queryFn: () => fetchOrders(axios, page, status),
    staleTime: 60 * 1000 * 5,
    retry: 3,
    enabled,
  });
};

type UseFetchOrderById = {
  axios: AxiosInstance;
  orderId: string;
  enabled: boolean;
};

export const useFetchOrderById = ({
  axios,
  orderId,
  enabled,
}: UseFetchOrderById) => {
  return useQuery<Order>({
    queryKey: ["order-by-id", orderId],
    queryFn: () => fetchOrderById(axios, orderId),
    staleTime: 60 * 1000 * 5,
    retry: 3,
    enabled,
  });
};

type UseUpdateOrder = {
  axios: AxiosInstance;
};

export const useUpdateOrder = ({ axios }: UseUpdateOrder) => {
  return useMutation({
    mutationFn: (data: Order) => updateOrder(axios, data),
    onSuccess: () => {},
  });
};
