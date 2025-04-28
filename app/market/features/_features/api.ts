import { AxiosInstance } from "axios";

export const fetchFeatureValueByFeature = async (
  axios: AxiosInstance,
  featureId: string
) => {
  try {
    const res = await axios.get(
      `/features?page=1&limit=20`
    );

    return res.data;
  } catch (error) {}
};