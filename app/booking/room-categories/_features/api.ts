import { AxiosInstance } from "axios";
import toast from "react-hot-toast";
import { RoomCategoryPayload } from "../../hotels/_features/types";

export const fetchRoomCategories = async (axios: AxiosInstance, page: string) => {
  try {
    const res = await axios.get(`/room-categories?page=${page}&limit=10`);
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};

export const fetchRoomCategoryTypes = async (axios: AxiosInstance, page: string) => {
  try {
    const res = await axios.get(`/room-category-types?page=${page}&limit=10`);
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};

export const createRoomCategpries = async (
  axios: AxiosInstance,
  data: RoomCategoryPayload
) => {
  try {
    const res = await axios.post(`/room-categories`, data);
    return res.data;
  } catch (error: any) {
    const statusCode = error?.response?.status;
    let message = "";

    switch (statusCode) {
      case 409:
        message = "Informations déjà utilisées, veuillez utiliser un autre nom";
        break;

      default:
        message = "An unexpected error occurred";
    }

    const customError = new Error(message);
    throw customError;
  }
};