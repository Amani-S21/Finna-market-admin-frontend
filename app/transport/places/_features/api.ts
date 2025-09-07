import { AxiosInstance } from "axios";
import { PlaceTypePayload } from "./types";

export const searchPlaces = async (
  axios: AxiosInstance,
  term: string
) => {
  try {
    const res = await axios.get(`/places/search?term=${term}`);
    return res.data;
  } catch (error: any) {}
};


export const fetchPlaces = async (axios: AxiosInstance, page: string) => {
  try {
    const res = await axios.get(`/places?page=${page}&limit=10`);
    return res.data;
  } catch (error: any) {
    
  }
};

export const createPlaces = async (
  axios: AxiosInstance,
  data: PlaceTypePayload
) => {
  try {
    const res = await axios.post("/places", data);
    return res.data;
  } catch (error: any) {
    const statusCode = error?.response?.status;
    let message = "";

    switch (statusCode) {
      case 409:
        message = "Nom déjà utilisé, veuillez utiliser un autre nom";
        break;

      default:
        message = "Une erreur inconue est survenue";
    }

    const customError = new Error(message);
    throw customError;
  }
};

export const updatePlace = async (
  axios: AxiosInstance,
  id: string,
  data: PlaceTypePayload
) => {
  try {
    const res = await axios.put(`/places/${id}`, data);
    return res.data;
  } catch (error: any) {
    const statusCode = error?.response?.status;
    let message = "";

    switch (statusCode) {
      case 409:
        message = "Nom déjà utilisé, veuillez utiliser un autre nom";
        break;

      default:
        message = "Une erreur inconue est survenue";
    }

    const customError = new Error(message);
    throw customError;
  }
};

export const fetchPlace = async (axios: AxiosInstance, id: string) => {
  try {
    const res = await axios.get(`/places/${id}`);
    return res.data;
  } catch (error: any) {
    const statusCode = error?.response?.status;
    let message = "";

    switch (statusCode) {
      case 409:
        message =
          "Nom de la place déjà utilisées, veuillez utiliser un autre nom";
        break;

      default:
        message = "Une erreur inconue est survenue";
    }

    const customError = new Error(message);
    throw customError;
  }
};