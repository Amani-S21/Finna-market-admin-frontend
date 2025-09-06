import { AxiosInstance } from "axios";
import toast from "react-hot-toast";
import { TransportAgencyPayload } from "./type";

export const fetchAgencies = async (axios: AxiosInstance, page: string) => {
  try {
    const res = await axios.get(`/transport-agencies?page=${page}&limit=10`);
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};

export const fetchAgency = async (axios: AxiosInstance, id: string) => {
  try {
    const res = await axios.get(`/transport-agencies/${id}`);
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};

export const createAgency = async (
  axios: AxiosInstance,
  data: TransportAgencyPayload
) => {
  try {
    const res = await axios.post("/transport-agencies", data);
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

export const updateAgency = async (
  axios: AxiosInstance,
  id: string,
  data: TransportAgencyPayload
) => {
  try {
    const res = await axios.patch(`/transport-agencies/${id}`, data);
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

export const fetchVehicles = async (
  axios: AxiosInstance,
  page: number,
) => {
  try {
    const res = await axios.get(`/vehicles?page=${page}&limit=10`);
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};
