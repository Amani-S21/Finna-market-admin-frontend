import { AxiosInstance } from "axios";

export const fetchFeatures = async (axios: AxiosInstance, page: string) => {
  try {
    const res = await axios.get(`/features?page=${page}&limit=20`);
    return res.data;
  } catch (error) {}
};
