import { Roles } from "@/app/lib/types";
import { AxiosInstance } from "axios";

export const searchUser = async (
  axios: AxiosInstance,
  term: string,
  role: Roles
) => {
  try {
    const res = await axios.get(`/users/search?term=${term}&role=${role}`);
    return res.data;
  } catch (error) {}
};

export const fetchUsers = async (axios: AxiosInstance, page: string) => {
  try {
    const res = await axios.get(`/users?page=${page}&limit=10`);
    return res.data;
  } catch (error) {}
};
