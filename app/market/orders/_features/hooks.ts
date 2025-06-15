import { Order, OrdersResponse, OrderSymmary, Status } from "@/app/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import {
  fetchOrderById,
  fetchOrders,
  fetchOrdersSummary,
  fetchRecentOrders,
  updateOrder,
} from "./api";

type UseFetchOrders = {
  axios: AxiosInstance;
  page: string;
  status?: Status;
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Order) => updateOrder(axios, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order-by-id"] });
    },
  });
};

type FetchOrdersSummary = {
  axios: AxiosInstance;
  enabled: boolean;
  shopId? : string;
};

export const useFetchOrdersSummary = ({
  axios,
  enabled,
  shopId,
}: FetchOrdersSummary) => {
  return useQuery<OrderSymmary>({
    queryKey: ["order-summary"],
    queryFn: () => fetchOrdersSummary(axios, shopId),
    staleTime: 60 * 1000 * 5,
    retry: 3,
    enabled,
  });
};

export const useFetchRecentOrders = ({
  axios,
  enabled,
  shopId,
}: FetchOrdersSummary) => {
  return useQuery<Order[]>({
    queryKey: ["orders-recent"],
    queryFn: () => fetchRecentOrders(axios, shopId),
    staleTime: 60 * 1000 * 5,
    retry: 3,
    enabled,
  });
};
