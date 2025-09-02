import { AxiosInstance } from "axios";
import {  VehicleTypePayload } from "./types";

export const fetchVehicleTypes = async (axios: AxiosInstance, page: string) => {
  try {
    const res = await axios.get(`/vehicle-types?page=${page}&limit=10`);
    return res.data;
  } catch (error: any) {
    
  }
};

export const createVehicleType = async (
  axios: AxiosInstance,
  data: VehicleTypePayload
) => {
  try {
    const res = await axios.post("/vehicle-types", data);
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

export const updateVehicleType = async (
  axios: AxiosInstance,
  id: string,
  data: VehicleTypePayload
) => {
  try {
    const res = await axios.patch(`/vehicle-types/${id}`, data);
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