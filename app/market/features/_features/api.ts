import { SubmitFeatureWithValues } from "@/app/lib/types";
import { AxiosInstance } from "axios";

export const fetchFeatures = async (axios: AxiosInstance, page: string) => {
  try {
    const res = await axios.get(`/features?page=${page}&limit=10`);
    return res.data;
  } catch (error) {
    return { count: 0, data: [] };
  }
};

export const fetchFeatureById = async (
  axios: AxiosInstance,
  featureId: string
) => {
  try {
    const res = await axios.get(`/features/${featureId}`);
    return res.data;
  } catch (error) {
    return { count: 0, data: [] };
  }
};

export const createFeatures = async (
  axios: AxiosInstance,
  data: SubmitFeatureWithValues
) => {
  try {
    const res = await axios.post(`/features`, data);
    return res.data;
  } catch (error) {
    return { count: 0, data: [] };
  }
};
