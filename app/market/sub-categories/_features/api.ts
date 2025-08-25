import { AxiosInstance } from "axios";
import toast from "react-hot-toast";
import { SubmitSubCategory } from "./types";

export const fetchSubCategories = async (axios: AxiosInstance, page: string) => {
  try {
    const res = await axios.get(`/sub-categories?page=${page}&limit=10`);
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};

export const fetchSubCategoryById = async (
  axios: AxiosInstance,
  id: string
) => {
  try {
    const res = await axios.get(`/sub-categories/${id}`);
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};


export const searchSubCategories = async (axios: AxiosInstance, term: string) => {
  try {
    const res = await axios.get(`/sub-categories/search?term=${term}`);
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};

export const createSubCategories = async (
  axios: AxiosInstance,
  data: SubmitSubCategory
) => {
  try {
    const res = await axios.post(`/sub-categories`, data);
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

export const updateSubCategories = async (
  axios: AxiosInstance,
  data: SubmitSubCategory
) => {
  try {
    const res = await axios.patch(`/sub-categories`, data);
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

