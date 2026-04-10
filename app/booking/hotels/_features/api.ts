import { AxiosInstance } from "axios";
import toast from "react-hot-toast";
import { HotelPayload, SubmitHotelPictures } from "./types";

export const sendHotelLinks = async (
  axios: AxiosInstance,
  productLinks: SubmitHotelPictures
) => {
  try {
    const res = await axios.post(
      `/hotels/send-pictures-links`,
      productLinks
    );
    return res.data;
  } catch (error: any) {
    const message = "Une erreur inconue est survenue" + error;
    const customError = new Error(message);
    throw customError;
  }
};

export const fetchHotels = async (axios: AxiosInstance, page: string) => {
  try {
    const res = await axios.get(`/hotels?page=${page}&limit=10`);
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};
export const fetchHotelById = async (axios: AxiosInstance, id: string) => {
  try {
    const res = await axios.get(`/hotels/${id}`);
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};

export const createHotels = async (
  axios: AxiosInstance,
  data: HotelPayload
) => {
  try {
    const res = await axios.post(`/hotels`, data);
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

export const updateHotels = async (
  axios: AxiosInstance,
  data: HotelPayload,
  id : string,
) => {
  try {
    const res = await axios.put(`/hotels/${id}`, data);
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