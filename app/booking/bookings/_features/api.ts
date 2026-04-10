import { AxiosInstance } from "axios";
import toast from "react-hot-toast";

export const fetchRoomBookings = async (axios: AxiosInstance, page: string) => {
  try {
    const res = await axios.get(`/room-bookings?page=${page}&limit=10`);
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};
