import { SubmitShop } from "@/app/lib/types";
import { AxiosInstance } from "axios";
import toast from "react-hot-toast";

export const fetchShops = async (axios: AxiosInstance, page: string) => {
  try {
    const res = await axios.get(`/shops?page=${page}&limit=10`);
    return res.data;
      } catch (error : any) {
      toast.error(JSON.stringify(error))
    }
};

export const fetchShopById = async (axios: AxiosInstance, shopId: string) => {
  try {
    const res = await axios.get(`/shops/${shopId}`);
    return res.data;
  } catch (error: any) {
    const statusCode = error?.response?.status;
    let message = "";

    switch (statusCode) {
      case 409:
        message =
          "Nom de la boutique déjà utilisées, veuillez utiliser un autre nom";
        break;

      default:
        message = "Une erreur inconue est survenue";
    }

    const customError = new Error(message);
    throw customError;
  }
};

export const createShop = async (axios: AxiosInstance, data: SubmitShop) => {
  try {
    const res = await axios.post("/shops", data);
    return res.data;
  } catch (error: any) {
    const statusCode = error?.response?.status;
    let message = "";

    switch (statusCode) {
      case 409:
        message =
          "Nom de la boutique déjà utilisées, veuillez utiliser un autre nom";
        break;

      default:
        message = "Une erreur inconue est survenue";
    }

    const customError = new Error(message);
    throw customError;
  }
};

export const updateShop = async (axios: AxiosInstance, data: SubmitShop) => {
  try {
    const res = await axios.patch("/shops", data);
    return res.data;
  } catch (error: any) {
    const statusCode = error?.response?.status;
    let message = "";

    switch (statusCode) {
      case 409:
        message =
          "Nom de la boutique déjà utilisées, veuillez utiliser un autre nom";
        break;

      default:
        message = "Une erreur inconue est survenue";
    }

    const customError = new Error(message);
    throw customError;
  }
};
