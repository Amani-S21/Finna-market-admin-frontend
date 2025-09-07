import { AxiosInstance } from "axios";
import { TripPayload } from "./types";

export const createTripes = async (axios: AxiosInstance, data: TripPayload) => {
  try {
    const res = await axios.post("/schedules", data);
    return res.data;
  } catch (error: any) {
    getErrorMessage(error);
  }
};

export const updateTripes = async (axios: AxiosInstance, data: TripPayload) => {
  try {
    const res = await axios.put("/schedules", data);
    return res.data;
  } catch (error: any) {
    const statusCode = error?.response?.status;
    let message = "";

    switch (statusCode) {
      case 409:
        message = "Element existant";
        break;

      default:
        message = "Une erreur inconue est survenue";
    }

    const customError = new Error(message);
    throw customError;
  }
};

export const getErrorMessage = (error: any): string => {
  const statusCode = error?.response?.status;
  const backendMessage =
    error?.response?.data?.message ?? "Une erreur est survenue";
  throw Error(backendMessage);
};
