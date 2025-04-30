import { SubmitCategory } from "@/app/lib/types";
import { AxiosInstance } from "axios";

export const fetchCategories = async (axios: AxiosInstance, page: string) => {
  try {
    const res = await axios.get(`/categories?page=${page}&limit=10`);
    return res.data;
  } catch (error) {}
};

export const fetchCategoryById = async (axios: AxiosInstance, categoryId: string) => {
  try {
    const res = await axios.get(`/categories/${categoryId}`);
    return res.data;
  } catch (error) {}
};

export const createCategories = async (
  axios: AxiosInstance,
  data: SubmitCategory
) => {
  try {
    const res = await axios.post(`/categories`, data);
    return res.data;
  } catch (error) {
    return { count: 0, data: [] };
  }
};