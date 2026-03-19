import { AxiosInstance } from "axios";
import toast from "react-hot-toast";
import { RoomCategoryPayload } from "../../hotels/_features/types";
import { SubmitRoomCategoriesPictures } from "./types";

export const fetchBookingTypes = async (axios: AxiosInstance, page: string) => {
  try {
    const res = await axios.get(`/booking-types?page=${page}&limit=10`);
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};

export const fetchRoomCategories = async (
  axios: AxiosInstance,
  page: string,
) => {
  try {
    const res = await axios.get(`/room-categories?page=${page}&limit=10`);
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};

export const fetchRoomCategoryTypes = async (
  axios: AxiosInstance,
  page: string,
  bookingTypeId: string,
) => {
  try {
    const res = await axios.get(
      `/room-category-types?page=${page}&limit=10&bookingTypeId=${bookingTypeId}`,
    );
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};

export const fetchComodities = async (axios: AxiosInstance, page: string) => {
  try {
    const res = await axios.get(`/comodities?page=${page}&limit=10`);
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};

export const searchHotels = async (axios: AxiosInstance, term: string) => {
  try {
    const res = await axios.get(`/hotels/search?term=${term}`);
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};

export const createRoomCategpries = async (
  axios: AxiosInstance,
  data: RoomCategoryPayload,
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

export const sendRoomCategoriesLinks = async (
  axios: AxiosInstance,
  productLinks: SubmitRoomCategoriesPictures
) => {
  try {
    const res = await axios.post(
      `/room-categories/send-pictures-links`,
      productLinks
    );
    return res.data;
  } catch (error: any) {
    const message = "Une erreur inconue est survenue" + error;
    const customError = new Error(message);
    throw customError;
  }
};