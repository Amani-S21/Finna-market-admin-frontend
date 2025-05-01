import { AxiosInstance } from "axios";

export const fetchOrders = async (axios: AxiosInstance, page: string) => {
  try {
    const res = await axios.get(`/orders?page=${page}&limit=10`);
    return res.data;
  } catch (error) {}
};