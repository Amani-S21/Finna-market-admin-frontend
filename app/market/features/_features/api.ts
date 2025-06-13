import { SubmitFeatureWithValues } from "@/app/lib/types";
import { AxiosInstance } from "axios";
import toast from "react-hot-toast";

export const fetchFeatures = async (axios: AxiosInstance, page: string) => {
  try {
    const res = await axios.get(`/features?page=${page}&limit=10`);
    return res.data;
     } catch (error : any) {
      toast.error(JSON.stringify(error))
    }
};

export const fetchFeatureById = async (
  axios: AxiosInstance,
  featureId: string
) => {
  try {
    const res = await axios.get(`/features/${featureId}`);
    return res.data;
      } catch (error : any) {
      toast.error(JSON.stringify(error))
    }
};

export const createFeatures = async (
  axios: AxiosInstance,
  data: SubmitFeatureWithValues
) => {
  try {
    const res = await axios.post(`/features`, data);
    return res.data;
  } catch (error: any) {
    const statusCode = error?.response?.status;
    let message = "";

    switch (statusCode) {
      case 409:
        message = "Nom de la caractéristique déjà utilisées, veuillez utiliser un autre nom";
        break;

      default:
        message = "Une erreur inconue est survenue";
    }

    const customError = new Error(message);
    throw customError;
  }
};

export const updateFeatures = async (
  axios: AxiosInstance,
  data: SubmitFeatureWithValues
) => {
  try {
    const res = await axios.patch(`/features`, data);
    return res.data;
  } catch (error: any) {
    const statusCode = error?.response?.status;
    let message = "";

    switch (statusCode) {
      case 409:
        message = "Nom de la caractéristique déjà utilisées, veuillez utiliser un autre nom";
        break;

      default:
        message = "Une erreur inconue est survenue";
    }

    const customError = new Error(message);
    throw customError;
  }
};

export const fetchFeatureValueByFeature = async (
  axios: AxiosInstance,
  featureId: string
) => {
  try {
    const res = await axios.get(
      `/feature-values/by-feature/${featureId}?page=1&limit=20`
    );

    return res.data;
      } catch (error : any) {
      toast.error(JSON.stringify(error))
    }
};
