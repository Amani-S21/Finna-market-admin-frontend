import { SubmitCategory } from "@/app/lib/types";
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
