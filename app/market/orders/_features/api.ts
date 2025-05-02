import { Roles } from "@/app/lib/types";
import { AxiosInstance } from "axios";

export const fetchOrders = async (axios: AxiosInstance, page: string) => {
  try {
    const res = await axios.get(`/orders?page=${page}&limit=10`);
    return res.data;
  } catch (error) {}
};

export const fetchOrderById = async (axios: AxiosInstance, orderId: string) => {
  try {
    const res = await axios.get(`/orders/${orderId}`);
    return res.data;
  } catch (error) {}
};
