import { AxiosInstance } from "axios";

export const fetchCategories = async (axios: AxiosInstance, page: string) => {
  try {
    const res = await axios.get(`/categories?page=${page}&limit=10`);
    return res.data;
  } catch (error) {}
};