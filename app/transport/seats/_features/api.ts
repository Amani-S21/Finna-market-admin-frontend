import { AxiosInstance } from "axios";
import { SeatPayload } from "./types";
import { getErrorMessage } from "@/app/lib/axiosErrorHandler";

export const createSeats = async (axios: AxiosInstance, data: SeatPayload) => {
  try {
    const res = await axios.post("/seats", data);
    return res.data;
  } catch (error: any) {
    getErrorMessage(error);
  }
};

export const updateSeats = async (
  axios: AxiosInstance,
  data: SeatPayload,
  id: string
) => {
  try {
    const res = await axios.put(`/seats/${id}`, data);
    return res.data;
  } catch (error: any) {
    getErrorMessage(error);
  }
};

export const fetchSeats = async (
  axios: AxiosInstance,
  page: string,
  vehicleId: string
) => {
  try {
    const res = await axios.get(
      `seats?page=${page}&limit=20&vehicleId=${vehicleId}`
    );
    return res.data;
  } catch (error: any) {
    getErrorMessage(error);
  }
};

export const fetchSeat = async (axios: AxiosInstance, id: string) => {
  try {
    const res = await axios.get(`/seats/${id}`);
    return res.data;
  } catch (error: any) {
    getErrorMessage(error);
  }
};
