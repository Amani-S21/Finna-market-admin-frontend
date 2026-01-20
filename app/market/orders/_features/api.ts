import { Status } from "@/app/lib/types";
import { AxiosInstance } from "axios";
import toast from "react-hot-toast";
import { ProductTakingPayload, UpdateOrderSubmit } from "./types";

export const fetchOrders = async (
  axios: AxiosInstance,
  page: string,
  shopId?: string,
  status?: Status
) => {
  try {
    const params = new URLSearchParams();

    params.set("page", page);
    params.set("limit", "10");

    if (status) {
      params.set("status", status);
    }

    if (shopId) {
      params.set("shopId", shopId);
    }

    const res = await axios.get(`/orders?${params.toString()}`);
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};

export const fetchOrderById = async (axios: AxiosInstance, orderId: string) => {
  try {
    const res = await axios.get(`/orders/${orderId}`);
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};

export const fetchShopOrderProducts = async (axios: AxiosInstance, shopId: string) => {
  try {
    const res = await axios.get(`/orders/shop-products?shopId=${shopId}`);
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};

export const productTakingConfirm = async (
  axios: AxiosInstance,
  data: ProductTakingPayload
) => {
  try {
    const res = await axios.put(`/orders/product-takings-confirm`, data);
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};

export const updateOrder = async (
  axios: AxiosInstance,
  data: UpdateOrderSubmit
) => {
  try {
    const res = await axios.put(`/orders`, data);
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};

export const fetchOrdersSummary = async (
  axios: AxiosInstance,
  shopId?: string
) => {
  try {
    const url = shopId ? `/orders/summary?shopId=${shopId}` : `/orders/summary`;
    const res = await axios.get(url);
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};

export const fetchRecentOrders = async (
  axios: AxiosInstance,
  shopId?: string
) => {
  try {
    const url = shopId
      ? `/orders/recents?shopId=${shopId}&limit=10`
      : `/orders/recents?limit=10`;
    const res = await axios.get(url);
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};
