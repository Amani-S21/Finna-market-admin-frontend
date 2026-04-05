import { AxiosInstance } from "axios";
import toast from "react-hot-toast";

export const fetchRoomBookingsSummary = async (
  axios: AxiosInstance,
  // hotelId?: string,
) => {
  try {
    // const url = shopId ? `/orders/summary?shopId=${shopId}` : `/orders/summary`;
    const res = await axios.get("/room-bookings/summary");
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};

export const fetchRecentRoomBookings = async (
  axios: AxiosInstance,
  // hotelId?: string,
) => {
  try {
    // const url = shopId
    //   ? `/orders/recents?shopId=${shopId}&limit=10`
    //   : `/orders/recents?limit=10`;
    const res = await axios.get("/room-bookings/recent");
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};
