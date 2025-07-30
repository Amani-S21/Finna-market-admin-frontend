import { SubmitCategory } from "@/app/lib/types";
import { AxiosInstance } from "axios";
import toast from "react-hot-toast";
import { SubmitSubCategory } from "./types";

export const fetchCategories = async (axios: AxiosInstance, page: string) => {
  try {
    const res = await axios.get(`/categories?page=${page}&limit=10`);
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};

export const fetchCategoryById = async (
  axios: AxiosInstance,
  categoryId: string
) => {
  try {
    const res = await axios.get(`/categories/${categoryId}`);
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};


export const createCategories = async (
  axios: AxiosInstance,
  data: SubmitCategory
) => {
  try {
    const res = await axios.post(`/categories`, data);
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

export const updateCategories = async (
  axios: AxiosInstance,
  data: SubmitCategory
) => {
  try {
    const res = await axios.patch(`/categories`, data);
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

export const searchCategories = async (axios: AxiosInstance, term: string) => {
  try {
    const res = await axios.get(`/categories/search?term=${term}`);
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
