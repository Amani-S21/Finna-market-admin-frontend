import { AxiosInstance } from "axios";
import { TripPayload } from "./types";
import { getErrorMessage } from "@/app/lib/axiosErrorHandler";

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
    getErrorMessage(error);
  }
};

export const fetchSchedule = async (axios: AxiosInstance, id: string) => {
  try {
    const res = await axios.get(`/schedules/${id}`);
    return res.data;
  } catch (error: any) {
    getErrorMessage(error);
  }
};
export const fetchVehicleSchedules = async (
  axios: AxiosInstance,
  page: string,
  vehicleId?: string
) => {
  try {
    const res = vehicleId
      ? await axios.get(
          `/schedules?page=${page}&limit=10&vehicleId=${vehicleId}`
        )
      : await axios.get(`/schedules?page=${page}&limit=10`);
    return res.data;
  } catch (error: any) {
    getErrorMessage(error);
  }
};
