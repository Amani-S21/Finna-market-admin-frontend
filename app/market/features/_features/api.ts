import { AxiosInstance } from "axios";

export const fetchFeatures = async (axios: AxiosInstance, page: string) => {
  try {
    const res = await axios.get(`/features?page=${page}&limit=10`);
    return res.data;
  } catch (error) {
    return { count: 0, data: [] };
  }
};
