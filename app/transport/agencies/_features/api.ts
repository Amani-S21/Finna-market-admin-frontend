import { AxiosInstance } from "axios";
import toast from "react-hot-toast";

export const fetchAgencies = async (axios: AxiosInstance, page: string) => {
  try {
    const res = await axios.get(`/transport-agencies?page=${page}&limit=10`);
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};
