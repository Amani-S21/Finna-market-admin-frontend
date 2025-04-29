import { AxiosInstance } from "axios";

export const fetchShops = async (axios: AxiosInstance, page: string) => {
  try {
    const res = await axios.get(`/shops?page=${page}&limit=10`);
    return res.data;
  } catch (error) {}
};

export const fetchShopById = async (axios: AxiosInstance, shopId: string) => {
  try {
    const res = await axios.get(`/shops/${shopId}`);
    return res.data;
  } catch (error) {}
};
