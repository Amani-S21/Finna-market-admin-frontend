import { Order, Status } from "@/app/lib/types";
import { AxiosInstance } from "axios";

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
  } catch (error) {}
};

export const fetchOrderById = async (axios: AxiosInstance, orderId: string) => {
  try {
    const res = await axios.get(`/orders/${orderId}`);
    return res.data;
  } catch (error) {}
};

export const updateOrder = async (axios: AxiosInstance, data: Order) => {
  try {
    const res = await axios.put(`/orders`, data);
    return res.data;
  } catch (error) {}
};
