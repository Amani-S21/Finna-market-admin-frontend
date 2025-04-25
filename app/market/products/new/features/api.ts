import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { UploadFileResponse } from "@/app/lib/types";

const axios = useAxiosAuth();

export const uploadUrl = async (image: File) => {
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

export const fetchFeatureValueByFeature = async (featureId: string) => {
  try {
    const res = await axios.get(
      `/feature-values/by-feature/${featureId}?page=1&limit=20`
    );

    return res.data;
  } catch (error) {}
};

export const fetchSubCategories = async (selectedCategoryId: string) => {
  try {
    const res = await axios.get(
      `/sub-categories/by-category/${selectedCategoryId}?page=1&limit=20`
    );
    return res.data;
  } catch (error) {}
};
