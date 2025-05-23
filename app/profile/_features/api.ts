import { SubmitUpdatePassword } from "@/app/lib/types";
import { AxiosInstance } from "axios";

export const updatePassword = async (
  axios: AxiosInstance,
  data: SubmitUpdatePassword
) => {
  try {
    const res = await axios.put(`/auth/update-password`, data);
    return res.data;
  } catch (error: any) {
    const statusCode = error?.response?.status;
    let message = "An unexpected error occurred";

    if (statusCode === 404) {
      message = "L'ancien mot de passe n'est pas correct veuillez le verifier";
    }

    const customError = new Error(message);
    throw customError;
  }
};
