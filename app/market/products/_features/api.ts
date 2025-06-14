import {
  SubmitProduct,
  SubmitProductLinks,
  UploadFileResponse,
} from "@/app/lib/types";
import { AxiosInstance } from "axios";
import toast from "react-hot-toast";

export const fetchProducts = async (axios: AxiosInstance, page: string) => {
  try {
    const res = await axios.get(`/products?page=${page}&limit=10`);
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};

export const fetchProductById = async (
  axios: AxiosInstance,
  productId: string
) => {
  try {
    const res = await axios.get(`/products/${productId}`);
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};

export const uploadUrl = async (axios: AxiosInstance, image: File) => {
  try {
    const formData = new FormData();
    formData.append("file", image);

    const res = await axios.post<UploadFileResponse>(`/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};

export const fetchSubCategories = async (
  axios: AxiosInstance,
  selectedCategoryId: string
) => {
  try {
    const res = await axios.get(
      `/sub-categories/by-category/${selectedCategoryId}?page=1&limit=20`
    );
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};

export const createProduct = async (
  axios: AxiosInstance,
  product: SubmitProduct
) => {
  try {
    const res = await axios.post(`/products`, product);
    return res.data;
  } catch (error: any) {
    const statusCode = error?.response?.status;
    let message = "";

    switch (statusCode) {
      case 409:
        message =
          "Nom du produit déjà utilisées, veuillez utiliser un autre nom";
        break;

      default:
        message = "Une erreur inconue est survenue";
    }

    const customError = new Error(message);
    throw customError;
  }
};

export const updateProduct = async (
  axios: AxiosInstance,
  product: SubmitProduct
) => {
  try {
    const res = await axios.patch(`/products`, product);
    return res.data;
  } catch (error: any) {
    const statusCode = error?.response?.status;
    let message = "";

    switch (statusCode) {
      case 409:
        message =
          "Nom du product déjà utilisées, veuillez utiliser un autre nom";
        break;

      default:
        message = "Une erreur inconue est survenue";
    }

    const customError = new Error(message);
    throw customError;
  }
};

export const sendProductLinks = async (
  axios: AxiosInstance,
  productLinks: SubmitProductLinks
) => {
  try {
    const res = await axios.patch(
      `/products/send-pictures-links`,
      productLinks
    );
    return res.data;
  } catch (error: any) {
    let message = "Une erreur inconue est survenue";
    const customError = new Error(message);
    throw customError;
  }
};
