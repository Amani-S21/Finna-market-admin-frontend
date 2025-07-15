import { AxiosInstance } from "axios";
import toast from "react-hot-toast";
import { TaxePriceSubmit } from "./types";

export const fetchShopTaxes = async (
  axios: AxiosInstance,
  shopId: string,
  page: string
) => {
  try {
    const res = await axios.get(
      `/taxes/price/shop/${shopId}?page=${page}&limit=10`
    );
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};

export const fetchShopTaxe = async (
  axios: AxiosInstance,
  shopId: string,
  taxeId: string
) => {
  try {
    const res = await axios.get(`/taxes/price/shop/by/${shopId}/${taxeId}`);
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};

export const createTaxePrice = async (
  axios: AxiosInstance,
  data: TaxePriceSubmit
) => {
  try {
    const res = await axios.post(`/taxes/price/shop`, data);
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

export const updateTaxePrice = async (
  axios: AxiosInstance,
  data: TaxePriceSubmit
) => {
  try {
    const res = await axios.patch(`/taxes/price/shop`, data);
    return res.data;
  } catch (error: any) {
    const statusCode = error?.response?.status;
    let message = "";

    switch (statusCode) {
      case 409:
        message = "Prix taxe existant";
        break;

      default:
        message = "Une erreur inconue est survenue";
    }

    const customError = new Error(message);
    throw customError;
  }
};
