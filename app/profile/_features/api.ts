import { SubmitUpdatePassword } from "@/app/lib/types";
import { AxiosInstance } from "axios";

export const updatePassword = async (axios: AxiosInstance, data: SubmitUpdatePassword) => {
  try {
    const res = await axios.patch(`/auth/update-password`, data);
    return res.data;
  } catch (error) {}
};