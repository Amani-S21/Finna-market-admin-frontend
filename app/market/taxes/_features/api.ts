import { AxiosInstance } from "axios";
import toast from "react-hot-toast";

export const fetchTaxes = async (axios: AxiosInstance, page: string) => {
  try {
    const res = await axios.get(`/taxes?page=${page}&limit=10`);
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};

export const fetchTaxeById = async (axios: AxiosInstance, taxeId: string) => {
  try {
    const res = await axios.get(`/taxes/${taxeId}`);
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};
