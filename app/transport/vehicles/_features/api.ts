import { AxiosInstance } from "axios";

export const fetchVehicles = async (axios: AxiosInstance, page: number) => {
  try {
    const res = await axios.get(`/vehicles?page=${page}&limit=10`);
    return res.data;
  } catch (error: any) {}
};


export const fetchVehicle = async (axios: AxiosInstance, id: string) => {
  try {
    const res = await axios.get(`/vehicles/${id}`);
    return res.data;
  } catch (error: any) {}
};
