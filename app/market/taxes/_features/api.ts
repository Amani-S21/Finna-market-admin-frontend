import { TaxeSubmit } from "@/app/lib/types";
import { AxiosInstance } from "axios";
import toast from "react-hot-toast";

export const fetchTaxes = async (axios: AxiosInstance, page: string) => {
  try {
    const res = await axios.get(`/taxes?page=${page}&limit=10`);
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};

export const fetchTaxeById = async (axios: AxiosInstance, taxeId: string) => {
  try {
    const res = await axios.get(`/taxes/${taxeId}`);
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};


export const createTaxes = async (
  axios: AxiosInstance,
  data: TaxeSubmit
) => {
  try {
    const res = await axios.post(`/taxes`, data);
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

export const updateTaxes = async (
  axios: AxiosInstance,
  data: TaxeSubmit
) => {
  try {
    const res = await axios.put(`/taxes/${data.id}`, data);
    return res.data;
  } catch (error: any) {
    const statusCode = error?.response?.status;
    let message = "";

    switch (statusCode) {
      case 409:
        message = "Informations déjà utilisées, veuillez utiliser un autre nom";
        break;

      default:
        message = "Une erreur inconue est survenue";
    }

    const customError = new Error(message);
    throw customError;
  }
};