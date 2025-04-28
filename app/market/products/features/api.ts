import { SubmitProduct, UploadFileResponse } from "@/app/lib/types";
import { AxiosInstance } from "axios";

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
  } catch (error) {}
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
  } catch (error) {}
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
  } catch (error) {}
};

export const createProduct = async (
  axios: AxiosInstance,
  product: SubmitProduct
) => {
  try {
    const res = await axios.post(`/products`, product);
    return res.data;
  } catch (error) {}
};

export const updateProduct = async (
  axios: AxiosInstance,
  product: SubmitProduct
) => {
  try {
    const res = await axios.patch(`/products`, product);
    return res.data;
  } catch (error) {}
};
