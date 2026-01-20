import { Order, OrderDetail, OrdersResponse, OrderSymmary, Status } from "@/app/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import {
  fetchOrderById,
  fetchOrders,
  fetchOrdersSummary,
  fetchRecentOrders,
  fetchShopOrderProducts,
  productTakingConfirm,
  updateOrder,
} from "./api";
import { OrderResponse, ProductTakingPayload, UpdateOrderSubmit } from "./types";

type UseFetchOrderProducts = {
  axios: AxiosInstance;
  shopId: string;
  enabled: boolean;
};

export const useFetchShopOrderProducts = ({
  axios,
  shopId,
  enabled,
}: UseFetchOrderProducts) => {
  return useQuery<OrderDetail[]>({
    queryKey: ["shop-order-products", shopId],
    queryFn: () => fetchShopOrderProducts(axios, shopId),
    staleTime: 60 * 1000 * 5,
    retry: 3,
    enabled,
  });
};

type UseFetchShopOrders = {
  axios: AxiosInstance;
  page: string;
  shopId: string;
  status?: Status;
  enabled: boolean;
};

export const useFetchShopOrders = ({
  axios,
  page,
  shopId,
  status,
  enabled,
}: UseFetchShopOrders) => {
  return useQuery<OrdersResponse>({
    queryKey: ["shop-orders", page, status],
    queryFn: () => fetchOrders(axios, page, shopId, status),
    staleTime: 60 * 1000 * 5,
    retry: 3,
    enabled,
  });
};

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
  return useQuery<OrderResponse>({
    queryKey: ["order-by-id", orderId],
    queryFn: () => fetchOrderById(axios, orderId),
    staleTime: 60 * 1000 * 5,
    retry: 3,
    enabled,
  });
};

type UseProductTaking = {
  axios: AxiosInstance;
};

export const useProductTaking = ({ axios }: UseProductTaking) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProductTakingPayload) => productTakingConfirm(axios, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order-by-id"] });
      queryClient.invalidateQueries({ queryKey: ["shop-order-products"] });
    },
  });
};

type UseUpdateOrder = {
  axios: AxiosInstance;
};

export const useUpdateOrder = ({ axios }: UseUpdateOrder) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateOrderSubmit) => updateOrder(axios, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order-by-id"] });
    },
  });
};

type FetchOrdersSummary = {
  axios: AxiosInstance;
  enabled: boolean;
  shopId?: string;
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
