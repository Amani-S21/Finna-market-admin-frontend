import { Order, Status } from "@/app/lib/types";
import { AxiosInstance } from "axios";
import toast from "react-hot-toast";
import { UpdateOrderSubmit } from "./types";

export const fetchOrders = async (
  axios: AxiosInstance,
  page: string,
  status?: Status
) => {
  try {
    const query = status
      ? `status=${status}&page=${page}&limit=10`
      : `page=${page}&limit=10`;
    const res = await axios.get(`/orders?${query}`);
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

export const updateOrder = async (axios: AxiosInstance, data: UpdateOrderSubmit) => {
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
