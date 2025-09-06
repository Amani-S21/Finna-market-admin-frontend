import { AxiosInstance } from "axios";
import { VehiclePayload } from "./types";

export const fetchVehicles = async (axios: AxiosInstance, page: number) => {
  try {
    const res = await axios.get(`/vehicles?page=${page}&limit=10`);
    return res.data;
  } catch (error: any) {}
};


export const fetchVehicle = async (axios: AxiosInstance, id: string) => {
  try {
    const res = await axios.get(`/vehicles/${id}`);
    return res.data;
  } catch (error: any) {}
};


export const createVehicle = async (
  axios: AxiosInstance,
  data: VehiclePayload
) => {
  try {
    const res = await axios.post("/vehicles", data);
    return res.data;
  } catch (error: any) {
    const statusCode = error?.response?.status;
    let message = "";

    switch (statusCode) {
      case 409:
        message =  error?.response?.data.message;
        break;

      default:
        message = "Une erreur inconue est survenue";
    }

    const customError = new Error(message);
    throw customError;
  }
};

export const updateVehicle = async (
  axios: AxiosInstance,
  id: string,
  data: VehiclePayload
) => {
  try {
    const res = await axios.put(`/vehicles/${id}`, data);
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